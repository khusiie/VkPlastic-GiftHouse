import { apiFetch } from './api';

export interface AdminUser {
    id: number;
    name: string;
    email: string;
    role: 'ADMIN' | 'USER';
    phone?: string;
    address?: string;
}

export interface LoginResponse {
    user: AdminUser;
    token: string;
}

export const authService = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        return apiFetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    },

    me: async (): Promise<AdminUser> => {
        return apiFetch('/api/auth/me');
    },

    saveToken: (token: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('admin_token', token);
        }
    },

    getToken: (): string | null => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('admin_token');
        }
        return null;
    },

    removeToken: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('admin_token');
        }
    },
};
