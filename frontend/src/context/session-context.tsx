import type { loginResponse } from "@/schema";
import { createContext, useContext, useState } from "react";

export type SessionContextType = {
    user: loginResponse | null;
    login: (userData: loginResponse) => void;
    logout: (data: any) => void;
    isLoggedIn: boolean;
} 

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<loginResponse | null>(null);

    const login = (userData: loginResponse) => {
        setIsLoggedIn(true);
        setUser(userData);
    }

    const logout = (data: any) => {
        if(data) {
            setIsLoggedIn(false);
            setUser(null);
        }
    }

    return (
        <SessionContext.Provider value={{isLoggedIn, user, login, logout}}>
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
