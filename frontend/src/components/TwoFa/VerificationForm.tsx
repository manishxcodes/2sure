import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { Button } from '../ui/button';
import { reset2FA, verify2FA } from '@/service/auth-api';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import { otpSchema } from '@/schema';
import axios from 'axios';
import type { reset2FAResponseType, verify2FAResponseType } from '@/types';

interface VerificationFormProps {
    onVerifySuccess: (data: verify2FAResponseType) => void;
    onResetSuccess: (data: reset2FAResponseType) => void;
}

export const VerificationForm: React.FC<VerificationFormProps> = ( {onVerifySuccess, onResetSuccess} ) => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const handleOtpVerification = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(otp);
        try {
            setLoading(true);

            // validate otp
            const result = otpSchema.safeParse({otp});
            if(!result.success) {
                toast.error(result.error.issues[0].message);
            }
            const { data } = await verify2FA(otp);
            console.log('data: vefify:', data);
            onVerifySuccess(data);
        } catch(err: any) {
            setOtp("");
            if(axios.isAxiosError(err)) {
                toast(err.response?.data.message);
                console.log("axios error", {details: err});
            } else {
                toast.error("Something went wrong. Please try again");
                console.log(" error", {details: err});
            }
        } finally {
            setLoading(false);
        }
    };

    const hanldeReset = async () => {
        try {
            setLoading(true);
            const { data } = await reset2FA();
            if(data) onResetSuccess(data);
        } catch(err: any) {
            if(axios.isAxiosError(err)) {
                toast(err.response?.data.message);
                console.log("axios error", {details: err});
            } else {
                toast.error("Something went wrong. Please try again");
                console.log(" error", {details: err});
            }
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <Card className='max-w-sm w-full'>
            <CardHeader>
                <CardTitle>Verify OTP</CardTitle>
                <CardDescription>Please enter the one-time password. </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col justify-center items-center'>
                <InputOTP maxLength={6} value={otp} onChange={(val) => setOtp(val)}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
            </CardContent>
            <CardFooter className='flex w-full gap-2'>
                <Button className='flex-1' variant={'outline'} onClick={hanldeReset}>
                    {loading ? <Loader className="animate-spin" /> : "Reset"}
                </Button>
                <Button className='flex-1' onClick={handleOtpVerification}>
                    {loading ? <Loader className='animate-spin' /> : "Verify"}
                </Button>
            </CardFooter>
        </Card>
    )
}
