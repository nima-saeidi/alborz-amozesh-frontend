import { AuthService } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function apiClient(endpoint: string, options: RequestInit = {}) {
    let accessToken = await AuthService.getAccessTokenServer();

    const makeRequest = async (token: string | null) => {
        const headers = new Headers(options.headers);

        headers.set('Content-Type', 'application/json');

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });
    };

    let response = await makeRequest(accessToken);

    return response;
}
