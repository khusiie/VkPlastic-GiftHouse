'use client';

import { useState } from 'react';
import { 
    Package, Search, Filter, ArrowUpDown, 
    MoreHorizontal, Edit3, AlertTriangle, Download, Plus
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

const inventoryData = [
    { id: 1, name: 'Wooden Eco-Train', sku: 'VK-TOY-001', category: 'Educational', stock: 12, minStock: 20, price: 45.00 },
    { id: 2, name: 'Smart Robo-Pup', sku: 'VK-TOY-002', category: 'Electronic', stock: 45, minStock: 10, price: 89.99 },
    { id: 3, name: 'MagniBlocks 500', sku: 'VK-TOY-003', category: 'Creative', stock: 0, minStock: 15, price: 32.50 },
    { id: 4, name: 'Soft Plush Bear', sku: 'VK-TOY-004', category: 'Stuffed Toys', stock: 8, minStock: 10, price: 24.99 },
    { id: 5, name: 'Racing Car Set', sku: 'VK-TOY-005', category: 'Vehicles', stock: 120, minStock: 50, price: 55.00 },
];

export default function InventoryPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const getStockStatus = (stock: number, minStock: number) => {
        if (stock === 0) return { label: 'Out of Stock', color: 'bg-rose-100 text-rose-600' };
        if (stock < minStock) return { label: 'Low Stock', color: 'bg-amber-100 text-amber-600' };
        return { label: 'In Stock', color: 'bg-emerald-100 text-emerald-600' };
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-800">Inventory Management</h1>
                    <p className="text-slate-500 mt-1 font-medium text-sm">Track and manage your product stock levels across all categories.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-11 px-5 rounded-xl border-slate-200 text-slate-600 font-bold hover:bg-white hover:shadow-sm transition-all gap-2">
                        <Download className="h-4 w-4" /> Export
                    </Button>
                    <Button className="h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-100 transition-all gap-2">
                        <Plus className="h-4 w-4" /> Add Stock
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm shadow-slate-200/50 rounded-3xl bg-white p-2">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <Package size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total SKU</p>
                            <h3 className="text-2xl font-black text-slate-800">124 Items</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-sm shadow-slate-200/50 rounded-3xl bg-white p-2">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Low Stock</p>
                            <h3 className="text-2xl font-black text-slate-800">12 Items</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-sm shadow-slate-200/50 rounded-3xl bg-white p-2">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                            <Package size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Out of Stock</p>
                            <h3 className="text-2xl font-black text-slate-800">5 Items</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Inventory Table */}
            <Card className="border-none shadow-sm shadow-slate-200/50 rounded-[2.5rem] bg-white overflow-hidden">
                <CardHeader className="p-8 pb-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="relative max-w-sm w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input 
                                placeholder="Search products or SKU..." 
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
                                <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Product & SKU</TableHead>
                                <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</TableHead>
                                <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock Level</TableHead>
                                <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</TableHead>
                                <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Price</TableHead>
                                <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inventoryData.map((item) => {
                                const status = getStockStatus(item.stock, item.minStock);
                                return (
                                    <TableRow key={item.id} className="border-slate-50 group hover:bg-slate-50/50 transition-colors h-20">
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                                                    <Package size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-800 leading-none mb-1">{item.name}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">{item.sku}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs font-bold text-slate-500">{item.category}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="w-32 space-y-2">
                                                <div className="flex justify-between text-[10px] font-black">
                                                    <span className="text-slate-800">{item.stock} Units</span>
                                                    <span className="text-slate-300">min. {item.minStock}</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div 
                                                        className={cn(
                                                            "h-full rounded-full",
                                                            item.stock === 0 ? "bg-rose-500" :
                                                            item.stock < item.minStock ? "bg-amber-500" : "bg-emerald-500"
                                                        )}
                                                        style={{ width: `${Math.min((item.stock / 100) * 100, 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={cn("rounded-lg px-3 py-1 text-[10px] font-black border-none", status.color)}>
                                                {status.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right font-black text-slate-800">
                                            ${item.price.toFixed(2)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl">
                                                <Edit3 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
