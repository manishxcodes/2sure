import type { loginResponseType } from "@/schema";
import { createContext, useContext, useEffect, useState } from "react";

export type SessionContextType = {
    user: loginResponseType | null;
    login: (userData: loginResponseType) => void;
    logout: (data: any) => void;
    isLoggedIn: boolean;
    loading: boolean
} 

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<loginResponseType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        const storedUser = sessionStorage.getItem("user");
        if(storedUser) {
            const parsedUser: loginResponseType = JSON.parse(storedUser);
            console.log("Useeffect runs: ", parsedUser);
            setUser(parsedUser);
            setIsLoggedIn(true);
        }
        setLoading(false);
    }, [])

    const login = (userData: loginResponseType) => {
        setIsLoggedIn(true);
        setUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData));
    }

    const logout = (data: any) => {
        if(data) {
            setIsLoggedIn(false);
            setUser(null);
            sessionStorage.removeItem("user");
        }
    }

    return (
        <SessionContext.Provider value={{isLoggedIn, user, login, logout, loading}}>
            {children}
        </SessionContext.Provider>
    )
};

export const useSession = () => {
    const context = useContext(SessionContext);
    if(!context) {
        throw new Error("useSession must be used within Session Provider");
    }

    return context;
}
