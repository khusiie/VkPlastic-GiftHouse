'use client';

import { useState } from 'react';
import { 
    Users, Search, Filter, Mail, 
    MoreHorizontal, Shield, User, Download, Plus, Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/admin/ui/card';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
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

const usersData = [
    { id: 1, name: 'Alex Miller', email: 'alex.m@honeytoys.com', role: 'Senior Admin', spent: '$0.00', orders: 0, joined: 'Jan 12, 2024' },
    { id: 2, name: 'Emily Parker', email: 'emily.p@gmail.com', role: 'Customer', spent: '$2,450.00', orders: 12, joined: 'Feb 05, 2024' },
    { id: 3, name: 'James Smith', email: 'james.smith@outlook.com', role: 'Customer', spent: '$1,200.50', orders: 8, joined: 'Mar 15, 2024' },
    { id: 4, name: 'Maria Rodriguez', email: 'maria.r@yahoo.com', role: 'Customer', spent: '$890.00', orders: 5, joined: 'Apr 20, 2024' },
    { id: 5, name: 'Leo King', email: 'leo.king@gmail.com', role: 'Customer', spent: '$4,120.00', orders: 24, joined: 'May 02, 2024' },
];

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-800">User Management</h1>
                    <p className="text-slate-500 mt-1 font-medium text-sm">Oversee your customer base and administrative permissions.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-11 px-5 rounded-xl border-slate-200 text-slate-600 font-bold hover:bg-white hover:shadow-sm transition-all gap-2">
                        <Download className="h-4 w-4" /> Export Users
                    </Button>
                    <Button className="h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-100 transition-all gap-2">
                        <Plus className="h-4 w-4" /> Invite Admin
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Users', val: '850', icon: Users, color: 'bg-indigo-50 text-indigo-600' },
                    { label: 'Active Today', val: '124', icon: Clock, color: 'bg-emerald-50 text-emerald-600' },
                    { label: 'New This Week', val: '45', icon: User, color: 'bg-blue-50 text-blue-600' },
                    { label: 'Staff Members', val: '8', icon: Shield, color: 'bg-purple-50 text-purple-600' },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm shadow-slate-200/50 rounded-3xl bg-white p-2">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.color)}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                <h3 className="text-2xl font-black text-slate-800">{stat.val}</h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Users Table */}
            <Card className="border-none shadow-sm shadow-slate-200/50 rounded-[2.5rem] bg-white overflow-hidden">
                <CardHeader className="p-8 pb-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="relative max-w-sm w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input 
                                placeholder="Search by name, email or role..." 
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
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-50 hover:bg-transparent">
                                <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">User Information</TableHead>
                                <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</TableHead>
                                <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Total Orders</TableHead>
                                <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Total Spent</TableHead>
                                <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Joined Date</TableHead>
                                <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {usersData.map((user) => (
                                <TableRow key={user.id} className="border-slate-50 group hover:bg-slate-50/50 transition-colors h-20">
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-black border-2 border-white shadow-sm overflow-hidden">
                                                <div className="w-full h-full bg-gradient-to-tr from-slate-200 to-slate-100 flex items-center justify-center">
                                                    {user.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-800 leading-none mb-1">{user.name}</p>
                                                <p className="text-[10px] font-bold text-slate-400 tracking-wider flex items-center gap-1">
                                                    <Mail size={10} /> {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={cn(
                                            "rounded-lg px-3 py-1 text-[10px] font-black border-none",
                                            user.role.includes('Admin') ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"
                                        )}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center font-bold text-slate-600">
                                        {user.orders}
                                    </TableCell>
                                    <TableCell className="text-right font-black text-slate-800">
                                        {user.spent}
                                    </TableCell>
                                    <TableCell className="text-center text-xs font-bold text-slate-400">
                                        {user.joined}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
