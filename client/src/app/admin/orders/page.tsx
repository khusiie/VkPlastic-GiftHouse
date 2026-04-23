'use client';

import { useState, useEffect } from 'react';
import { 
    Search, Filter, Eye, MoreVertical, 
    ChevronLeft, ChevronRight, ShoppingBag,
    Clock, CheckCircle, XCircle, AlertCircle,
    User, Calendar, CreditCard
} from 'lucide-react';
import { adminService } from '../../../services/adminService';
import { toast } from 'react-hot-toast';

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
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
                <p className="text-slate-500 text-sm">Monitor and manage customer orders</p>
            </div>

            {/* Stats Summary (Mini) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Pending', value: orders.filter(o => o.status === 'PENDING').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Delivered', value: orders.filter(o => o.status === 'DELIVERED').length, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Revenue', value: `₹${orders.reduce((acc, curr) => acc + curr.total, 0).toLocaleString()}`, icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className={`${stat.bg} ${stat.color} p-2.5 rounded-lg`}>
                            <stat.icon size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                            <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text"
                        placeholder="Search by order ID or customer..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
                    <Filter size={16} />
                    Filter Status
                </button>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={6} className="px-6 py-4"><div className="h-12 bg-slate-100 rounded w-full" /></td>
                                    </tr>
                                ))
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                        <ShoppingBag className="mx-auto mb-3 opacity-20" size={48} />
                                        <p>No orders found</p>
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-indigo-600 font-mono">#{order.id.toString().padStart(5, '0')}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                                    <User size={14} />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-slate-900 truncate">{order.user?.name || 'Guest User'}</p>
                                                    <p className="text-xs text-slate-500 truncate">{order.user?.email || '-'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Calendar size={14} />
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-slate-900">₹{order.total.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="relative inline-block text-left">
                                                <select 
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                    className={`appearance-none pl-3 pr-8 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 ${STATUS_COLORS[order.status] || 'bg-slate-50 text-slate-700 border-slate-200'}`}
                                                >
                                                    <option value="PENDING">Pending</option>
                                                    <option value="PROCESSING">Processing</option>
                                                    <option value="SHIPPED">Shipped</option>
                                                    <option value="DELIVERED">Delivered</option>
                                                    <option value="CANCELLED">Cancelled</option>
                                                </select>
                                                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                                                    <ChevronDown size={14} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                        Showing <span className="font-medium">{(page * 10) + 1}</span> to <span className="font-medium">{(page * 10) + orders.length}</span> results
                    </p>
                    <div className="flex items-center gap-2">
                        <button 
                            disabled={page === 0}
                            onClick={() => setPage(p => Math.max(0, p - 1))}
                            className="p-2 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button 
                            onClick={() => setPage(p => p + 1)}
                            className="p-2 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
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
