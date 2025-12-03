'use server';

import { AuthService } from '@/lib/api/auth';
import { redirect } from 'next/navigation';

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
    const result = await AuthService.register({first_name: firstName, last_name: lastName, email: email, password: password2, password2});

    if (result.success) {
        const loginResult = await AuthService.login({ email, password });

        if (loginResult.success) {
            redirect('/dashboard');
        }
    }
    return result;
}


export async function logoutAction() {
    await AuthService.logoutServer();
    redirect('/');
}
