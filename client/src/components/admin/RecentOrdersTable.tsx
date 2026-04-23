'use client';

import { ExternalLink, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/admin/ui/card';
import { Button } from '@/components/admin/ui/button';
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

export default function RecentOrdersTable() {
    return (
        <Card className="border-none shadow-sm shadow-slate-200/50 rounded-[2.5rem] bg-white overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-8">
                <CardTitle className="text-xl font-black text-slate-800">Recent Orders</CardTitle>
                <div className="flex gap-2">
                    <Button className="h-10 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-2">
                        <Download className="h-4 w-4" /> Export
                    </Button>
                    <Button variant="secondary" className="h-10 px-6 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200">
                        View All
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-8 pt-0">
                <Table>
                    <TableHeader>
                        <TableRow className="border-slate-50 hover:bg-transparent">
                            <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</TableHead>
                            <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</TableHead>
                            <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Amount</TableHead>
                            <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Payment</TableHead>
                            <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Delivery</TableHead>
                            <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Date</TableHead>
                            <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[
                            { id: '9402', customer: 'Emily Parker', amount: '$124.00', payment: 'PAID', delivery: 'SHIPPED', date: 'Oct 24, 2025' },
                            { id: '9401', customer: 'James Smith', amount: '$56.20', payment: 'PAID', delivery: 'PROCESSING', date: 'Oct 20, 2025' },
                            { id: '9400', customer: 'Maria Rodriguez', amount: '$210.50', payment: 'FAILED', delivery: 'CANCELED', date: 'Oct 15, 2025' },
                            { id: '9399', customer: 'Leo King', amount: '$45.00', payment: 'PAID', delivery: 'SHIPPED', date: 'Oct 10, 2025' },
                        ].map((order, i) => (
                            <TableRow key={i} className="border-slate-50 group hover:bg-slate-50/50 transition-colors h-16">
                                <TableCell className="font-bold text-slate-400 text-xs">#HT-{order.id}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-[10px] font-black text-rose-600 border-2 border-white shadow-sm">
                                            {order.customer.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="text-sm font-bold text-slate-700">{order.customer}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center text-sm font-black text-slate-800">{order.amount}</TableCell>
                                <TableCell className="text-center">
                                    <Badge className={cn(
                                        "rounded-lg px-3 py-1 text-[10px] font-black border-none",
                                        order.payment === 'PAID' ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                                    )}>
                                        {order.payment}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge className={cn(
                                        "rounded-lg px-3 py-1 text-[10px] font-black border-none",
                                        order.delivery === 'SHIPPED' ? "bg-cyan-100 text-cyan-600" :
                                        order.delivery === 'PROCESSING' ? "bg-slate-100 text-slate-400" : "bg-rose-100 text-rose-600"
                                    )}>
                                        {order.delivery}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center text-xs font-bold text-slate-400">{order.date}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-indigo-600 rounded-lg">
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
