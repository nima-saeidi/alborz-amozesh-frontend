import {cookies} from "next/headers";
import {
    loginRequestSchema,
    loginRequestSchemaType,
    loginResponseSchema,
    loginResponseSchemaType,
    registerRequestSchema,
    registerRequestSchemaType,
    registerResponseSchema,
    registerResponseSchemaType,
} from "./schemas/auth.schema"
const API_URL = process.env.Next_API_BASE_URL || 'http://localhost:5000';

interface AuthTokens {
    access: string;
    refresh: string;
}



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
