import React from "react";
import { LoginForm } from "../components/LoginForm";

const Login: React.FC = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
        <LoginForm />
    </div>
  )
}

export default Login;