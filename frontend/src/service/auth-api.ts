import type { loginResponseType } from "@/types"
import api from "./api"
import type { reset2FAResponseType, verify2FAResponseType } from "@/types"

export const registerUser = async (username: string, password: string) => {
    return await api.post("/auth/register", {
        username, 
        password
    })
}

export const loginUser = async (username: string, password: string) => {
    return await api.post<loginResponseType>("/auth/login", {
        username, 
        password
    }, {
        withCredentials: true
    })
}

export const authStatus = async () => {
    return await api.get("/auth/status", {
        withCredentials: true
    })
}

export const logoutUser = async () => {
    return await api.post("/auth/logout", {}, {
        withCredentials: true
    })
}

export const setup2FA = async () => {
    return await api.post("/auth/2fa/setup", {}, {
        withCredentials: true
    })
}

export const verify2FA = async (token: string) => {
    return await api.post<verify2FAResponseType>("/auth/2fa/verify", {
        token: token
    }, {
        withCredentials: true
    })
}

export const reset2FA = async () => {
    return await api.post<reset2FAResponseType>("/auth/2fa/reset", {}, {
        withCredentials: true
    })
}



