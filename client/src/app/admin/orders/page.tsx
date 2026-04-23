'use client';

import { useState, useEffect } from 'react';
import { 
    Search, Filter, Eye, MoreVertical, 
    ChevronLeft, ChevronRight, ShoppingBag,
    Clock, CheckCircle, XCircle, AlertCircle,
    User, Calendar, CreditCard, Download
} from 'lucide-react';
import { adminService } from '../../../services/adminService';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/admin/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/admin/ui/table";
import { Badge } from "@/components/admin/ui/badge";
import { cn } from '@/lib/utils';

const STATUS_COLORS: any = {
    'PENDING': 'bg-amber-50 text-amber-700 border-amber-100',
    'PROCESSING': 'bg-blue-50 text-blue-700 border-blue-100',
    'SHIPPED': 'bg-indigo-50 text-indigo-700 border-indigo-100',
    'DELIVERED': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'CANCELLED': 'bg-red-50 text-red-700 border-red-100',
};

const STATUS_ICONS: any = {
    'PENDING': Clock,
    'PROCESSING': Loader,
    'SHIPPED': ShoppingBag,
    'DELIVERED': CheckCircle,
    'CANCELLED': XCircle,
};

function Loader({ size }: { size: number }) {
    return <div className={`w-${size/4} h-${size/4} border-2 border-blue-600 border-t-transparent rounded-full animate-spin`} />;
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);

    useEffect(() => {
        // Mocking orders fetch
        const mockOrders = [
            { id: 1024, user: { name: 'Rahul Sharma', email: 'rahul@example.com' }, createdAt: new Date().toISOString(), total: 3500, status: 'PENDING' },
            { id: 1025, user: { name: 'Priya Singh', email: 'priya@example.com' }, createdAt: new Date().toISOString(), total: 1200, status: 'DELIVERED' },
            { id: 1026, user: { name: 'Amit Kumar', email: 'amit@example.com' }, createdAt: new Date().toISOString(), total: 850, status: 'PROCESSING' },
            { id: 1027, user: { name: 'Sneha Gupta', email: 'sneha@example.com' }, createdAt: new Date().toISOString(), total: 2400, status: 'SHIPPED' },
            { id: 1028, user: { name: 'Guest User', email: '' }, createdAt: new Date().toISOString(), total: 500, status: 'CANCELLED' },
        ];

        setIsLoading(true);
        setTimeout(() => {
            setOrders(mockOrders);
            setIsLoading(false);
        }, 800);
    }, [page]);

    const fetchOrders = async () => {
        // Function kept for reference
    };

    const handleStatusChange = async (id: number, status: string) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
        toast.success(`Order status updated to ${status} (Mock)`);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-800">Order Management</h1>
                    <p className="text-slate-500 mt-1 font-medium text-sm">Monitor, fulfill and track customer orders across your storefront.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-11 px-5 rounded-xl border-slate-200 text-slate-600 font-bold hover:bg-white hover:shadow-sm transition-all gap-2">
                        <Download className="h-4 w-4" /> Export
                    </Button>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Pending', value: orders.filter(o => o.status === 'PENDING').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Delivered', value: orders.filter(o => o.status === 'DELIVERED').length, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Revenue', value: `$${orders.reduce((acc, curr) => acc + curr.total, 0).toLocaleString()}`, icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm shadow-slate-200/50 rounded-3xl bg-white p-2">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Orders Table */}
            <Card className="border-none shadow-sm shadow-slate-200/50 rounded-[2.5rem] bg-white overflow-hidden">
                <CardHeader className="p-8 pb-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="relative max-w-sm w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input 
                                placeholder="Search by order ID or customer..." 
                                className="pl-11 bg-slate-50 border-none rounded-xl h-11 focus-visible:ring-indigo-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" className="h-11 rounded-xl gap-2 font-bold text-slate-600 border-slate-200 hover:bg-slate-50">
                                <Filter size={18} /> Filters
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-8 pt-4">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-slate-50 hover:bg-transparent">
                                    <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</TableHead>
                                    <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</TableHead>
                                    <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</TableHead>
                                    <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</TableHead>
                                    <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</TableHead>
                                    <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    [...Array(5)].map((_, i) => (
                                        <TableRow key={i}>
                                            <TableCell colSpan={6}><div className="h-12 bg-slate-50 rounded-xl animate-pulse" /></TableCell>
                                        </TableRow>
                                    ))
                                ) : orders.length === 0 ? (
                                    <TableRow>
                                        <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                                            <ShoppingBag className="mx-auto mb-3 opacity-20" size={48} />
                                            <p className="font-bold">No orders found</p>
                                        </td>
                                    </TableRow>
                                ) : (
                                    orders.map((order) => (
                                        <TableRow key={order.id} className="border-slate-50 group hover:bg-slate-50/50 transition-colors h-20">
                                            <TableCell>
                                                <span className="text-sm font-black text-indigo-600">#VK-{order.id}</span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 border-2 border-white shadow-sm">
                                                        {order.user?.name ? order.user.name[0] : 'G'}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-bold text-slate-800 truncate">{order.user?.name || 'Guest User'}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold truncate">{order.user?.email || '-'}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                                    <Calendar size={14} className="text-slate-300" />
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm font-black text-slate-800">${order.total.toLocaleString()}</span>
                                            </TableCell>
                                            <TableCell>
                                                <select 
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                    className={cn(
                                                        "appearance-none px-4 py-1.5 rounded-xl text-[10px] font-black transition-all cursor-pointer border-none focus:ring-2 focus:ring-offset-2",
                                                        STATUS_COLORS[order.status] || "bg-slate-100 text-slate-600"
                                                    )}
                                                >
                                                    <option value="PENDING">Pending</option>
                                                    <option value="PROCESSING">Processing</option>
                                                    <option value="SHIPPED">Shipped</option>
                                                    <option value="DELIVERED">Delivered</option>
                                                    <option value="CANCELLED">Cancelled</option>
                                                </select>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                                                    <Eye size={18} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Showing <span className="text-slate-800">{(page * 10) + 1}</span> to <span className="text-slate-800">{(page * 10) + orders.length}</span> results
                        </p>
                        <div className="flex items-center gap-2">
                            <Button 
                                variant="outline" 
                                size="sm"
                                disabled={page === 0}
                                onClick={() => setPage(p => Math.max(0, p - 1))}
                                className="h-9 px-4 font-bold rounded-xl bg-white border-slate-200"
                            >
                                <ChevronLeft size={16} /> Prev
                            </Button>
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setPage(p => p + 1)}
                                className="h-9 px-4 font-bold rounded-xl bg-white border-slate-200"
                            >
                                Next <ChevronRight size={16} />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function ChevronDown({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}
