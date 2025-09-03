import type { loginResponse } from "@/schema"
import api from "./api"

export const registerUser = async (username: string, password: string) => {
    return await api.post("/auth/register", {
        username, 
        password
    })
}

export const loginUser = async (username: string, password: string) => {
    return await api.post<loginResponse>("/auth/login", {
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
    return await api.post("/auth/2fa/verify", {
        token: token
    }, {
        withCredentials: true
    })
}

export const reset2FA = async () => {
    return await api.post("/auth/2fa/reset", {}, {
        withCredentials: true
    })
}



