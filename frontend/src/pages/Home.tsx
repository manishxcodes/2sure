import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "@/context/session-context";
import { logoutUser } from "@/service/auth-api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
    const navigate = useNavigate();
    const { user, logout } = useSession();

    const handleLogout = async () => {
        try {
            const { data } = await logoutUser();
            logout(data);
            toast("Successfully logout");
            navigate("/login");
        } catch(err) {
            if(axios.isAxiosError(err)) {
                toast(err.response?.data.message);
                console.log("axios error", {details: err});
            } else {
                toast.error("Something went wrong. Please try again");
                console.log(" error", {details: err});
            }
        }
    }

    return (
        <div className="h-screen w-full flex items-center justify-center">
        <Card className="max-w-sm w-full">
            <CardHeader>
            <CardTitle>Welcome <span className="text-green-400">{user.username}</span></CardTitle>
            <CardDescription>You have successfully logged in and verified your 2FA</CardDescription>
            </CardHeader>
            <CardFooter>
            <Button onClick={handleLogout}>Logout</Button>
            </CardFooter>
        </Card>
        </div>
    )
}

export default Home;