import * as z from "zod";

export const ThreadValidation = z.object({
    thread: z.string().nonempty().min(3, "Minimum 3 Characters"),
    accountId: z.string(),
    image: z.string().optional(),
})

export const CommentValidation = z.object({
    thread: z.string().nonempty().min(3, "Minimum 3 Characters"),
})