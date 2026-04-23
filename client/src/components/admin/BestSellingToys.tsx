'use client';

import { Package } from 'lucide-react';
import { Card, CardTitle } from '@/components/admin/ui/card';
import { Button } from '@/components/admin/ui/button';
import { cn } from '@/lib/utils';

export default function BestSellingToys() {
    return (
        <Card className="border-none shadow-sm shadow-slate-200/50 rounded-[2.5rem] bg-white p-8">
            <CardTitle className="text-xl font-black text-slate-800 mb-8">Best Selling Toys</CardTitle>
            <div className="space-y-6">
                {[
                    { name: 'Wooden Eco-Train', sales: '1,240 Sold', price: '$45.00', trend: '+15%', color: 'bg-amber-100' },
                    { name: 'Smart Robo-Pup', sales: '960 Sold', price: '$89.99', trend: '+8%', color: 'bg-blue-100' },
                    { name: 'MagniBlocks 500', sales: '854 Sold', price: '$32.50', trend: '-3%', color: 'bg-emerald-100' },
                ].map((toy, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden", toy.color)}>
                            <Package className="text-slate-600" size={20} />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-black text-slate-800 leading-none mb-1">{toy.name}</h4>
                            <p className="text-[10px] font-bold text-slate-400">{toy.sales}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-black text-indigo-600">{toy.price}</p>
                            <p className={cn("text-[10px] font-bold", toy.trend.startsWith('+') ? "text-emerald-500" : "text-rose-500")}>
                                {toy.trend}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <Button className="w-full mt-8 h-12 bg-amber-400 hover:bg-amber-500 text-slate-900 font-black rounded-2xl border-none shadow-lg shadow-amber-100">
                View Full Report
            </Button>
        </Card>
    );
}
