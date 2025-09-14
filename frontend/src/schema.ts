import { z } from "zod";

export const loginSchema = z.object({
    username: z.email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(24, "Password cannot exceed 24 characters")
})

export const registerSchema = loginSchema.extend({
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password dont match",
    path: ["confirmPassword"]
})

export type loginResponseType = {
    message: string,
    username: string, 
    isMfaActive: boolean
}