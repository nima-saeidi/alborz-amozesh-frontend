import z from "zod";

export const loginRequestSchema = z.object({
    email: z.email(),
    password: z.string()
});
export type loginRequestSchemaType = z.infer<typeof loginRequestSchema>;

export const loginResponseSchema = z.object({
    user_id: z.number(),
    first_name: z.string().max(150),
    last_name: z.string().max(150),
    email: z.email(),
    is_teacher: z.boolean(),
    refresh: z.string(),
    access: z.string(),
});
export type loginResponseSchemaType = z.infer<typeof loginResponseSchema>;

export const registerRequestSchema = z.object({
    first_name: z.string().max(150),
    last_name: z.string().max(150),
    email: z.email(),
    password: z.string(),
    password2: z.string()
});
export type registerRequestSchemaType = z.infer<typeof registerRequestSchema>;
export const registerResponseSchema = z.object({
    user_id: z.number(),
    first_name: z.string().max(150),
    last_name: z.string().max(150),
    email: z.email(),
    is_teacher: z.boolean(),
    refresh: z.string(),
    access: z.string(),
})
export type registerResponseSchemaType = z.infer<typeof registerResponseSchema>;