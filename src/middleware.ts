import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 < Date.now();
    } catch {
        return true;
    }
}

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('access_token')?.value;
    const refreshToken = request.cookies.get('refresh_token')?.value;

    const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
    const isProtectedPage = request.nextUrl.pathname.startsWith('/dashboard');

    if (isProtectedPage) {
        if (!accessToken && !refreshToken) {
            return NextResponse.redirect(new URL('/auth', request.url));
        }

        if (accessToken && isTokenExpired(accessToken) && !refreshToken) {
            return NextResponse.redirect(new URL('/auth', request.url));
        }
    }

    if (isAuthPage && accessToken && !isTokenExpired(accessToken)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/auth'],
};
