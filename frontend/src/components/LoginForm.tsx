import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/schema";
import { type loginResponseType } from "@/types";
import { loginUser } from "@/service/auth-api";
import axios from "axios";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export function LoginForm({onLoginSuccess} : {onLoginSuccess: (userData: loginResponseType) => void | {}}) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            
            // zod validation 
            const result = loginSchema.safeParse({username, password});
            if(!result.success) {
                const errorMessage = result.error.issues[0].message;
                console.log("Error: ", errorMessage);
                toast(errorMessage);
                return;
            }

            // make api call 
            const { data } = await loginUser(username, password);
            if(data) {
                toast.success(data.message);
                console.log(data);
                onLoginSuccess(data);
            }

        } catch (err) {
            console.log("error while logging in: ", err);
            if(axios.isAxiosError(err)) {
                toast(err.response?.data.message);
                console.log("axios error", err);
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
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
            Enter your email below to login to your account
            </CardDescription>
            <CardAction>
                <Link to={"/register"}>
                    <Button variant="link">Register</Button>
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
                    onChange={(e) => {setUsername(e.target.value)}}
                />
                </div>
                <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required
                    onChange={(e) => {setPassword(e.target.value)}}
                />
                </div>
            </div>
            </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full"
                onClick={handleSubmit}
            >
                {loading ? <Loader className="animate-spin" /> : "Login"}
            </Button>
        </CardFooter>
    </Card>
  )
}
