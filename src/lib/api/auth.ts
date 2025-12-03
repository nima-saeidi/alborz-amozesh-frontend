import z from "zod";
import {cookies} from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface AuthTokens {
    access: string;
    refresh: string;
}

const loginRequestSchema = z.object({
    email: z.email(),
    password: z.string()
});
type loginRequestSchemaType = z.infer<typeof loginRequestSchema>;

const loginResponseSchema = z.object({
    user_id: z.number(),
    first_name: z.string().max(150),
    last_name: z.string().max(150),
    email: z.email(),
    is_teacher: z.boolean(),
    refresh: z.string(),
    access: z.string(),
});
type loginResponseSchemaType = z.infer<typeof loginResponseSchema>;

const registerRequestSchema = z.object({
    first_name: z.string().max(150),
    last_name: z.string().max(150),
    email: z.email(),
    password: z.string(),
    password2: z.string()
});
type registerRequestSchemaType = z.infer<typeof registerRequestSchema>;
const registerResponseSchema = z.object({
    user_id: z.number(),
    first_name: z.string().max(150),
    last_name: z.string().max(150),
    email: z.email(),
    is_teacher: z.boolean(),
    refresh: z.string(),
    access: z.string(),
})
type registerResponseSchemaType = z.infer<typeof registerResponseSchema>;

export class AuthService {
    static async setCookies<T extends  AuthTokens>(serverResponse: T){
        const {access, refresh} = serverResponse;

        // Set httpOnly cookies on server
        const cookieStore = await cookies();
        cookieStore.set('access', access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 12, // 12 hours
            path: '/',
        });

        cookieStore.set('refresh', refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });
    }
    static async login(input: loginRequestSchemaType): Promise<{ success: boolean; error?: string }> {
        const parsed = loginRequestSchema.parse(input);
        const response = await fetch(`${API_URL}/auth/login/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parsed),
        });

        if (!response.ok) {
            return {success: false, error: 'Invalid credentials'};
        }

        await this.setCookies(await response.json())

        return {success: true};
    }

    catch(error: any) {
        return {success: false, error: 'Login failed'};
    }

    // Server-side register
    static async register(input: registerRequestSchemaType): Promise<{ success: boolean; error?: string }> {
        const parsed = registerRequestSchema.parse(input);
        const response = await fetch(`${API_URL}/auth/register/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parsed),
        })

        if (!response.ok) {
            return {success: false, error: 'Register failed'};
        }

        await this.setCookies(await response.json())

        return {success: true};
    }

// Server-side logout
    static async logoutServer() {
        const cookieStore = await cookies();
        cookieStore.delete('access');
        cookieStore.delete('refresh');
    }


// Get access token (server-side)
    static async getAccessTokenServer(): Promise<string | null> {
        const cookieStore = await cookies();
        return cookieStore.get('access')?.value || null;
    }
}
