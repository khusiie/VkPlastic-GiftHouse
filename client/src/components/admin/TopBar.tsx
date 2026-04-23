'use client';

import { Menu, Bell } from 'lucide-react';
import { usePathname } from 'next/navigation';

const pageTitles: Record<string, string> = {
    '/admin': 'Dashboard',
    '/admin/products': 'Products',
    '/admin/orders': 'Orders',
    '/admin/inventory': 'Inventory',
    '/admin/users': 'Users',
};

function getPageTitle(pathname: string) {
    if (pageTitles[pathname]) return pageTitles[pathname];
    if (pathname.includes('/products') && pathname.includes('/edit')) return 'Edit Product';
    if (pathname.includes('/products/new')) return 'New Product';
    if (pathname.includes('/orders/')) return 'Order Detail';
    return 'Admin';
}

interface TopBarProps {
    onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
    const pathname = usePathname();
    const title = getPageTitle(pathname);

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                >
                    <Menu size={20} />
                </button>
                <div>
                    <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
                    <p className="text-xs text-slate-400 hidden sm:block">
                        VivekPlastic & Gift House
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                    A
                </div>
            </div>
        </header>
    );
}
