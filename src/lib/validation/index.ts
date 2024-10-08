import * as z from "zod"

export const SignupFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    username: z.string().min(2, { message: "Username must be at least 2 characters" }).max(50),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string().min(8, { message: "Password must be at least 6 characters" }).max(50),

})

export const SigninValidation = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string().min(8, { message: "Password must be at least 6 characters" }).max(50),

})