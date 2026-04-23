'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import {
    LayoutDashboard, Package, ShoppingCart,
    Warehouse, Users, LogOut, ShoppingBag
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/admin/ui/button';

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { href: '/admin/inventory', label: 'Inventory', icon: Warehouse },
    { href: '/admin/users', label: 'Users', icon: Users },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const isActive = (href: string) =>
        href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

    return (
        <aside className="w-72 h-screen bg-white flex flex-col border-r border-slate-100 shadow-sm sticky top-0 flex-shrink-0 z-50">
            {/* Logo */}
            <div className="flex items-center justify-between px-8 py-8">
                <Link href="/admin" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                        <Package size={22} className="text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-black text-slate-800 tracking-tight leading-none">VK</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Plastic</span>
                    </div>
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                {navItems.map(({ href, label, icon: Icon }) => (
                    <Link
                        key={href}
                        href={href}
                        className={cn(
                            "flex items-center gap-3 px-6 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 group",
                            isActive(href)
                                ? "bg-indigo-50 text-indigo-600 shadow-sm"
                                : "text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50"
                        )}
                    >
                        <Icon size={20} className={cn(
                            "transition-transform duration-300 group-hover:scale-110",
                            isActive(href) ? "text-indigo-600" : "text-slate-400 group-hover:text-indigo-500"
                        )} />
                        <span className="flex-1">{label}</span>
                    </Link>
                ))}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 mt-auto space-y-2">
                <Link href="/" className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-slate-200">
                    <ShoppingBag size={20} className="text-amber-400" />
                    <span className="font-bold text-sm">View Storefront</span>
                </Link>

                <Button
                    variant="ghost"
                    onClick={logout}
                    className="w-full flex items-center justify-start gap-3 px-6 py-4 rounded-2xl text-slate-500 hover:text-rose-500 hover:bg-rose-50 transition-all duration-300"
                >
                    <LogOut size={20} />
                    <span className="font-bold">Sign Out</span>
                </Button>
            </div>
        </aside>
    );
}
