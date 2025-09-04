import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { setup2FA } from '@/service/auth-api'
import { toast } from 'sonner'

interface SetupProps {
    onSetupComplete: () => void
}

interface TwoFAResponseProps {
    qrCode: string,
    secret: string
}

export const SetupForm: React.FC<SetupProps> = ({onSetupComplete}) => {
    const [response, setResponse] = useState<TwoFAResponseProps>({qrCode: "", secret: ""});
    const [isCopied, setIsCopied] = useState<Boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const fetchQrCode = async () => {
        const { data } = await setup2FA();
        setResponse(data);
    } 

    useEffect(() => {
        fetchQrCode();
    }, []);
    
    const copyToClipboard = async () => {
        if(!inputRef.current) return;
        try {
            await navigator.clipboard.writeText(inputRef.current.value);
            setIsCopied(true);
            toast("Copied");

            setTimeout(() => {setIsCopied(false)}, 2000);
        } catch(err) {
            console.log("failed to copy: ", {details: err});
            toast.error("Failed to copy secret. Try again");
        }
    }

    return (
        <Card className='w-full max-w-sm'>
            <CardHeader>
                <CardTitle>2FA Verification</CardTitle>
                <CardDescription>Scan the QR below with authenticator app</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex justify-center'>
                    {response.qrCode && <img src={response.qrCode}alt='2fa-qr' className='border rounded-md' />}
                </div>
            </CardContent>
            <Separator label='OR' />
            <CardContent>
                <CardDescription>Enter the code manually</CardDescription>
                <div className='pt-2 flex gap-2'>
                    <Input readOnly value={response.secret} type='text'
                        ref={inputRef}
                        className='w-full text-xs text-gray-600'
                    />
                    <Button variant={"outline"} onClick={copyToClipboard} className='text-gray-500 text-sm'>
                        {isCopied ? "Copied" : "Copy"}
                    </Button>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={onSetupComplete} className='w-full'>
                    Continue to Verification
                </Button>
            </CardFooter>
        </Card>
    )
}
