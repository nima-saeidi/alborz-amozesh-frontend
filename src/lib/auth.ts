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
})
type loginResponseSchemaType = z.infer<typeof loginResponseSchema>;

export class AuthService {
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

        const tokens: AuthTokens = await response.json();

        // Set httpOnly cookies on server
        const cookieStore = await cookies();
        cookieStore.set('access_token', tokens.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 12, // 12 hours
            path: '/',
        });

        cookieStore.set('refresh_token', tokens.refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return {success: true};
    }

    catch(error: any) {
        return {success: false, error: 'Login failed'};
    }


// Server-side logout
    static async logoutServer() {
        const cookieStore = await cookies();
        cookieStore.delete('access_token');
        cookieStore.delete('refresh_token');
    }

// Server-side token refresh
    static async refreshTokenServer(): Promise<string | null> {
        const cookieStore = await cookies();
        const refresh = cookieStore.get('refresh_token')?.value;

        if (!refresh) return null;

        try {
            const response = await fetch(`${API_URL}/api/token/refresh/`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({refresh}),
            });

            if (!response.ok) {
                await this.logoutServer();
                return null;
            }

            const {access} = await response.json();

            cookieStore.set('access_token', access, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 12,
                path: '/',
            });

            return access;
        } catch {
            await this.logoutServer();
            return null;
        }
    }

// Get access token (server-side)
    static async getAccessTokenServer(): Promise<string | null> {
        const cookieStore = await cookies();
        return cookieStore.get('access_token')?.value || null;
    }
}
