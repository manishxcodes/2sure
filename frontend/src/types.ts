import { z } from "zod";

export const userDetailsSchema = z.object({
    username: z.email("Use a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(24, "Password cannot exceed 24 characters")
})

export type UserDetails = z.infer<typeof userDetailsSchema>;