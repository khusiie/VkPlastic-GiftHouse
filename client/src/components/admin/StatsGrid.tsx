'use client';

import { TrendingUp, Users, Package, ShoppingCart, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/admin/ui/card';
import { Badge } from "@/components/admin/ui/badge";
import { cn } from '@/lib/utils';

const statsCards = [
    { title: 'Total Revenue', value: '$45.2k', change: '+12%', icon: ShoppingCart, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { title: 'Active customer', value: '850', change: '+8%', icon: Users, color: 'text-rose-400', bgColor: 'bg-rose-50' },
    { title: 'Total Orders', value: '1,284', change: '+12%', icon: Package, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { title: 'Pending Processing', value: '43', change: '', icon: Clock, color: 'text-amber-500', bgColor: 'bg-amber-50' },
    { title: 'In Transit', value: '156', change: '', icon: TrendingUp, color: 'text-rose-500', bgColor: 'bg-rose-50' },
    { title: 'Delivered Today', value: '82', change: '', icon: Package, color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
];

export default function StatsGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {statsCards.map((card, index) => (
                <Card key={index} className="border-none shadow-sm shadow-slate-200/50 rounded-3xl overflow-hidden bg-white hover:shadow-md transition-all duration-300">
                    <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-6">
                            <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center", card.bgColor, card.color)}>
                                <card.icon className="h-5 w-5" />
                            </div>
                            {card.change && (
                                <Badge className="bg-cyan-400/10 text-cyan-500 border-none rounded-full px-2 py-0.5 text-[10px] font-bold">
                                    {card.change}
                                </Badge>
                            )}
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{card.title}</p>
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">{card.value}</h3>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
