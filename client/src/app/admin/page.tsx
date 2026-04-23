'use client';

import { useEffect, useState } from 'react';
import {
    TrendingUp,
    Users,
    Package,
    ShoppingCart,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal,
    ExternalLink,
    Clock,
    AlertCircle
} from 'lucide-react';
import { adminService, DashboardStats } from '../../services/adminService';
import { formatPrice } from '../../lib/utils';

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Using mock data as requested to avoid backend connection for now
        const mockStats: DashboardStats = {
            totalProducts: 124,
            totalOrders: 452,
            totalUsers: 89,
            totalRevenue: 154200,
            pendingOrders: 12,
            lowStockCount: 5,
            recentOrders: [
                { id: 1, customer: 'John Doe', amount: 1200, status: 'Completed', date: '2024-03-20' },
                { id: 2, customer: 'Jane Smith', amount: 850, status: 'Pending', date: '2024-03-21' },
                { id: 3, customer: 'Robert Johnson', amount: 2300, status: 'Processing', date: '2024-03-21' },
                { id: 4, customer: 'Emily Davis', amount: 450, status: 'Completed', date: '2024-03-22' },
            ]
        };

        const timer = setTimeout(() => {
            setStats(mockStats);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-32 bg-white rounded-2xl border border-slate-100" />
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 h-96 bg-white rounded-2xl border border-slate-100" />
                    <div className="h-96 bg-white rounded-2xl border border-slate-100" />
                </div>
            </div>
        );
    }

    const statCards = [
        {
            title: 'Total Revenue',
            value: formatPrice(stats?.totalRevenue || 0),
            change: '+12.5%',
            isPositive: true,
            icon: TrendingUp,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
        },
        {
            title: 'Total Orders',
            value: stats?.totalOrders || 0,
            change: '+8.2%',
            isPositive: true,
            icon: ShoppingCart,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
        },
        {
            title: 'Total Products',
            value: stats?.totalProducts || 0,
            change: '-3.1%',
            isPositive: false,
            icon: Package,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
        },
        {
            title: 'Total Users',
            value: stats?.totalUsers || 0,
            change: '+14.6%',
            isPositive: true,
            icon: Users,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500">Welcome back, Admin. Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                        Download Report
                    </button>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                        Create Product
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                                <card.icon size={24} />
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-medium ${card.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {card.change}
                                {card.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">{card.title}</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-1">{card.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="font-bold text-slate-900">Recent Orders</h3>
                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {stats?.recentOrders?.map((order, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                                                    {order.customer[0]}
                                                </div>
                                                <span className="text-sm font-medium text-slate-700">{order.customer}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                                                    order.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-blue-100 text-blue-700'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {formatPrice(order.amount)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {order.date}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-1 hover:bg-slate-100 rounded">
                                                <MoreHorizontal size={16} className="text-slate-400" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Notifications & Quick Stats */}
                <div className="space-y-6">
                    {/* Activity Feed */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-6">Critical Alerts</h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="p-2 h-fit bg-amber-50 text-amber-600 rounded-lg">
                                    <AlertCircle size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-800">Low Stock Alert</p>
                                    <p className="text-xs text-slate-500 mt-1">5 products are reaching their minimum stock levels.</p>
                                    <button className="text-xs font-semibold text-indigo-600 mt-2 hover:underline">Restock Now</button>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="p-2 h-fit bg-indigo-50 text-indigo-600 rounded-lg">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-800">Pending Orders</p>
                                    <p className="text-xs text-slate-500 mt-1">You have {stats?.pendingOrders} orders waiting for fulfillment.</p>
                                    <button className="text-xs font-semibold text-indigo-600 mt-2 hover:underline">Process Orders</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Link */}
                    <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-lg shadow-indigo-200">
                        <h4 className="font-bold mb-2">Need help?</h4>
                        <p className="text-indigo-100 text-sm mb-4">Check our documentation for advanced management features.</p>
                        <button className="flex items-center gap-2 text-sm font-semibold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
                            Documentation <ExternalLink size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
