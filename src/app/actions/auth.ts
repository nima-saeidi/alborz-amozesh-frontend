'use server';

import { AuthService } from '@/lib/auth';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function loginAction(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { success: false, error: 'Email and password are required' };
    }

    const result = await AuthService.login({ email, password });

    if (result.success) {
        redirect('/dashboard');
    }

    return result;
}

export async function registerAction(prevState: any, formData: FormData) {
    const firstName = formData.get('first_name') as string;
    const lastName = formData.get('last_name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const password2 = formData.get('password2') as string;

    if (!firstName || !lastName || !email || !password || !password2) {
        return {
            success: false,
            error: 'Please enter all required fields',
        };
    }

    try {
        const response = await fetch(`${API_URL}/auth/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                password2: password2,
            }),
        });
        console.log(response);

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                error: errorData.message || 'Registration failed'
            };
        }

        // Auto-login after successful registration
        const loginResult = await AuthService.login({ email, password });

        if (loginResult.success) {
            redirect('/dashboard');
        }

        return { success: true };
    } catch (error) {
        return { success: false, error: 'Registration failed' };
    }
}


export async function logoutAction() {
    await AuthService.logoutServer();
    redirect('/');
}
