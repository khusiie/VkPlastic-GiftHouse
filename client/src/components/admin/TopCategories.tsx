'use client';

import { Card, CardTitle } from '@/components/admin/ui/card';

export default function TopCategories() {
    return (
        <Card className="border-none shadow-sm shadow-slate-200/50 rounded-[2.5rem] bg-white p-8">
            <CardTitle className="text-xl font-black text-slate-800 mb-8">Top Categories</CardTitle>
            <div className="flex flex-col items-center justify-center relative py-4">
                <div className="w-40 h-40 rounded-full border-[16px] border-slate-50 relative flex items-center justify-center">
                    <div className="absolute inset-[-16px] rounded-full border-[16px] border-indigo-500" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 70%)' }} />
                    <div className="absolute inset-[-16px] rounded-full border-[16px] border-amber-400" style={{ clipPath: 'polygon(50% 50%, 0 70%, 0 0, 50% 0)' }} />
                    <div className="text-center">
                        <p className="text-2xl font-black text-slate-800">1,284</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Sales</p>
                    </div>
                </div>
                <div className="mt-10 space-y-3 w-full">
                    {[
                        { label: 'Educational', val: '45%', color: 'bg-indigo-500' },
                        { label: 'Electronic', val: '30%', color: 'bg-amber-400' },
                        { label: 'Creative', val: '25%', color: 'bg-slate-200' },
                    ].map((cat, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${cat.color}`} />
                                <span className="text-xs font-bold text-slate-500">{cat.label}</span>
                            </div>
                            <span className="text-xs font-black text-slate-800">{cat.val}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}
