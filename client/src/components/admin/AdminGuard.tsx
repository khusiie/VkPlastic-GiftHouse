'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const { user, isAdmin, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.replace('/admin/login');
            } else if (!isAdmin) {
                router.replace('/admin/login');
            }
        }
    }, [user, isAdmin, isLoading, router]);

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-500 text-sm">Loading admin panel...</p>
                </div>
            </div>
        );
    }

    if (!user || !isAdmin) return null;

    return <>{children}</>;
}
