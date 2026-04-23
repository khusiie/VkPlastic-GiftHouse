'use client';

import { Card, CardTitle } from '@/components/admin/ui/card';
import { cn } from '@/lib/utils';

export default function RevenueChart() {
    return (
        <Card className="border-none shadow-sm shadow-slate-200/50 rounded-[2.5rem] bg-white p-8 h-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <CardTitle className="text-xl font-black text-slate-800">Revenue Growth</CardTitle>
                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Yearly overview of toy sales and seasonal trends</p>
                </div>
                <div className="flex bg-slate-50 p-1 rounded-xl">
                    {['Daily', 'Monthly', 'Yearly'].map((tab) => (
                        <button key={tab} className={cn(
                            "px-4 py-1.5 text-[10px] font-black rounded-lg transition-all",
                            tab === 'Yearly' ? "bg-white text-purple-600 shadow-sm" : "text-slate-400"
                        )}>
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="h-64 w-full relative mt-12">
                <div className="absolute inset-0 flex items-end justify-between px-4">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-4 w-full">
                            <div className="w-full h-full relative">
                                <div className="absolute bottom-0 left-1/2 w-px bg-slate-50 h-full opacity-50" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-300">{2020 + i}</span>
                        </div>
                    ))}
                </div>
                
                <svg className="absolute inset-0 w-full h-full px-4 overflow-visible" preserveAspectRatio="none">
                    <path d="M 0 180 Q 100 120 200 190 T 400 140 T 600 160 T 800 110" fill="none" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />
                    <path d="M 0 200 Q 150 160 300 220 T 600 180 T 800 200" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />
                </svg>
            </div>
        </Card>
    );
}
