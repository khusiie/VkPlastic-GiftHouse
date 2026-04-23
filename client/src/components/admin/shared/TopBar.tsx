'use client';

import { Menu, Bell, Search, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/admin/ui/dropdown-menu";

const pageTitles: Record<string, string> = {
    '/admin': 'Dashboard',
    '/admin/products': 'Product Management',
    '/admin/orders': 'Order Management',
    '/admin/inventory': 'Inventory Control',
    '/admin/users': 'User Management',
};

function getPageTitle(pathname: string) {
    if (pageTitles[pathname]) return pageTitles[pathname];
    if (pathname.includes('/products') && pathname.includes('/edit')) return 'Edit Product';
    if (pathname.includes('/products/new')) return 'New Product';
    if (pathname.includes('/orders/')) return 'Order Detail';
    return 'Admin Control';
}

export default function TopBar() {
    const pathname = usePathname();
    const title = getPageTitle(pathname);

    return (
        <header className="h-28 bg-[#f8f9ff]/80 backdrop-blur-md flex items-center justify-between px-6 lg:px-12 sticky top-0 z-40 transition-all">
            <div className="flex items-center gap-6 flex-1">
                <div className="hidden md:flex items-center relative max-w-xl w-full">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                    <Input
                        placeholder="Search orders, customers..."
                        className="pl-14 bg-white border-none shadow-sm shadow-slate-200/40 focus-visible:ring-indigo-400 rounded-2xl h-14 transition-all focus:shadow-md text-sm font-medium"
                    />
                </div>
            </div>

            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="relative h-12 w-12 text-slate-400 hover:text-rose-500 rounded-2xl transition-all">
                        <Bell size={24} />
                        <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#f8f9ff]" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-12 w-12 text-slate-400 hover:text-indigo-500 rounded-2xl transition-all">
                        <Search className="md:hidden h-6 w-6" />
                        <div className="hidden md:flex p-2 bg-slate-100 rounded-xl">
                            <Bell size={18} className="text-slate-400" />
                        </div>
                    </Button>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden lg:flex flex-col items-end">
                        <h2 className="text-sm font-black text-slate-800 leading-tight">Alex Miller</h2>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            Senior Admin
                        </p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="p-0 h-14 w-14 rounded-2xl border-none shadow-sm hover:shadow-md transition-all overflow-hidden bg-white">
                                <div className="h-full w-full bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center text-white text-sm font-black">
                                    <User size={26} />
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 mt-4 rounded-2xl p-2 shadow-xl border-slate-100 bg-white">
                            <DropdownMenuLabel className="px-3 py-2 text-xs font-bold text-slate-400 uppercase">My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator className="my-1 bg-slate-50" />
                            <DropdownMenuItem className="rounded-xl px-3 py-2.5 font-semibold text-slate-600 focus:bg-indigo-50 focus:text-indigo-600">Profile Settings</DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl px-3 py-2.5 font-semibold text-slate-600 focus:bg-indigo-50 focus:text-indigo-600">Notifications</DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1 bg-slate-50" />
                            <DropdownMenuItem className="rounded-xl px-3 py-2.5 font-semibold text-rose-600 focus:bg-rose-50 focus:text-rose-600">Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
