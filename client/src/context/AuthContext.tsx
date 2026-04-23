'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService, AdminUser } from '../services/authService';

interface AuthContextType {
    user: AdminUser | null;
    token: string | null;
    isAdmin: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AdminUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = authService.getToken();
        if (storedToken) {
            setToken(storedToken);
            authService.me()
                .then((u) => setUser(u))
                .catch(() => {
                    authService.removeToken();
                    setToken(null);
                })
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        const data = await authService.login(email, password);
        authService.saveToken(data.token);
        setToken(data.token);
        setUser(data.user);
    };

    const logout = () => {
        authService.removeToken();
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isAdmin: user?.role === 'ADMIN',
            isLoading,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}
