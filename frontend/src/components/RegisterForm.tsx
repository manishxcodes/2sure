import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerSchema } from "@/schema"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { Loader } from "lucide-react"
import { registerUser } from "@/service/auth-api"
import axios from "axios"

export function RegisterForm() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            // zod validation 
            const result = registerSchema.safeParse({username, password, confirmPassword});
            if(!result.success) {
                const errorMessage = result.error.issues[0].message
                console.log("Error: ", errorMessage);
                toast(errorMessage);
                return;
            }  
            
            console.log("details: ", {username, password});
            // make api call to register
            const { data }= await registerUser(username, password);
            if(data) {
                console.log(data);
                toast.success(data.message);
            }

        } catch (err) {
            console.log("error: ", err);
            if(axios.isAxiosError(err)) {
                if(err.response?.status === 409) {
                    toast(err.response.data.message);
                }
            } else {
                toast.error("Something went wrong. Please try again");                
            }
        } finally {
            setLoading(false);
        }
    }

  return (
    <Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle>New Account</CardTitle>
            <CardDescription>
            Enter details to register 
            </CardDescription>
            <CardAction>
                <Link to={"/login"}>
                    <Button variant="link">Login</Button>
                </Link>
            </CardAction>
        </CardHeader>
        <CardContent>
            <form>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={username}
                    onChange={(e) => {setUsername(e.target.value)}}
                />
                </div>
                <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                </div>
                    <Input id="password" type="password" required 
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                </div>
                <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                </div>
                    <Input id="confirm-password" type="password" required 
                        value={confirmPassword}
                        onChange={(e) => {setConfirmPassword(e.target.value)}}
                    />
                </div>
            </div>
            </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
            <Button onClick={handleSubmit} type="submit" className="w-full">
                {loading ? <Loader className="animate-spin" /> : "Register"}
            </Button>
        </CardFooter>
    </Card>
  )
}
