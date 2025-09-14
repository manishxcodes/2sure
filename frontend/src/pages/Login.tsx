import React from "react";
import { LoginForm } from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/context/session-context";
import type { loginResponseType } from "@/schema";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useSession();

    const handleLoginSuccess = (userData: loginResponseType) => {
    	console.log("userData: ", userData);
      login(userData);

      // check if mfa active
      if(!userData.isMfaActive) {
        navigate("/setup-2fa")
      } else {
        navigate("/verify");
      }
    }

    return (
      <div className="h-screen w-full flex items-center justify-center">
          <LoginForm onLoginSuccess = {handleLoginSuccess} />
      </div>
    )
}

export default Login;