'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard, Package, ShoppingCart,
    Warehouse, Users, LogOut, X, ChevronRight
} from 'lucide-react';

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { href: '/admin/inventory', label: 'Inventory', icon: Warehouse },
    { href: '/admin/users', label: 'Users', icon: Users },
];

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const isActive = (href: string) =>
        href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

    return (
        <>
            {/* Mobile overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 h-screen w-64 bg-slate-900 text-white
                flex flex-col z-30 transition-transform duration-300
                ${open ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 lg:static lg:z-auto
            `}>
                {/* Logo */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700">
                    <div>
                        <h1 className="text-lg font-bold text-white tracking-tight">VK Admin</h1>
                        <p className="text-xs text-slate-400 mt-0.5">Management Panel</p>
                    </div>
                    <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                {/* User info */}
                <div className="px-6 py-4 border-b border-slate-700/50">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">
                            {user?.name?.[0]?.toUpperCase() ?? 'A'}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {navItems.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={onClose}
                            className={`
                                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                                transition-all duration-150 group
                                ${isActive(href)
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }
                            `}
                        >
                            <Icon size={18} />
                            <span className="flex-1">{label}</span>
                            {isActive(href) && <ChevronRight size={14} className="opacity-60" />}
                        </Link>
                    ))}
                </nav>

                {/* Logout */}
                <div className="px-3 py-4 border-t border-slate-700">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-red-600/20 hover:text-red-400 transition-all duration-150"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
