'use client';

import { useState, useEffect } from 'react';
import {
    Plus, Search, Edit2, Trash2,
    Filter, Download, ChevronLeft, ChevronRight,
    Package, SlidersHorizontal, AlertTriangle
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Badge } from '@/components/admin/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/admin/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/admin/ui/card';
import { Skeleton } from '@/components/admin/ui/skeleton';
import { formatPrice, cn } from '@/lib/utils';

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);

    useEffect(() => {
        // Mocking product fetch
        const mockProducts = [
            { id: 1, name: 'Premium Pressure Cooker', price: 2499, stock: 45, tags: 'Kitchen, Cookware' },
            { id: 2, name: 'Air Tight Container Set', price: 899, stock: 120, tags: 'Storage, Plastic' },
            { id: 3, name: 'Magic Mop with Bucket', price: 1299, stock: 8, tags: 'Cleaning, Home' },
            { id: 4, name: 'Digital Kitchen Scale', price: 599, stock: 0, tags: 'Kitchen, Gadgets' },
            { id: 5, name: 'Non-Stick Tawa', price: 750, stock: 32, tags: 'Kitchen, Cookware' },
            { id: 6, name: 'Garden Water Pipe 10m', price: 450, stock: 60, tags: 'Garden, Outdoor' },
        ];

        setIsLoading(true);
        setTimeout(() => {
            setProducts(mockProducts);
            setIsLoading(false);
        }, 800);
    }, [page]);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        setProducts(prev => prev.filter(p => p.id !== id));
        toast.success('Product deleted (Mock)');
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-800">Product Catalog</h1>
                    <p className="text-slate-500 mt-1 font-medium text-sm">Manage your toy inventory, details, and pricing in one place.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-11 px-5 rounded-xl border-slate-200 text-slate-600 font-bold hover:bg-white hover:shadow-sm transition-all gap-2">
                        <Download className="h-4 w-4" /> Export CSV
                    </Button>
                    <Button className="h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-100 transition-all gap-2">
                        <Plus className="h-4 w-4" /> Add Product
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Products', val: '124', icon: Package, color: 'bg-indigo-50 text-indigo-600' },
                    { label: 'Low Stock', val: '12', icon: AlertTriangle, color: 'bg-amber-50 text-amber-600' },
                    { label: 'Drafts', val: '5', icon: Edit2, color: 'bg-slate-50 text-slate-400' },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm shadow-slate-200/50 rounded-3xl bg-white p-2">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.color)}>
                                {stat.icon && <stat.icon size={24} />}
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                <h3 className="text-2xl font-black text-slate-800">{stat.val}</h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Product Table */}
            <Card className="border-none shadow-sm shadow-slate-200/50 rounded-[2.5rem] bg-white overflow-hidden">
                <CardHeader className="p-8 pb-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="relative max-w-sm w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search by name, category or tag..."
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
                                    <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Information</TableHead>
                                    <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</TableHead>
                                    <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inventory</TableHead>
                                    <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</TableHead>
                                    <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    [...Array(5)].map((_, i) => (
                                        <TableRow key={i}>
                                            <TableCell colSpan={5}><div className="h-16 bg-slate-50 rounded-xl animate-pulse" /></TableCell>
                                        </TableRow>
                                    ))
                                ) : filteredProducts.length === 0 ? (
                                    <TableRow>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                            <Package className="mx-auto mb-3 opacity-20" size={48} />
                                            <p className="font-bold">No products found</p>
                                        </td>
                                    </TableRow>
                                ) : (
                                    filteredProducts.map((product) => (
                                        <TableRow key={product.id} className="border-slate-50 group hover:bg-slate-50/50 transition-colors h-20">
                                            <TableCell>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 group-hover:bg-white group-hover:shadow-sm transition-all overflow-hidden">
                                                        <Package size={22} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-black text-slate-800 truncate group-hover:text-indigo-600 transition-colors">{product.name}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{product.tags || 'General'}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={cn(
                                                        "rounded-lg font-black px-3 py-1 text-[10px] border-none",
                                                        product.stock > 10
                                                            ? 'bg-emerald-100 text-emerald-600'
                                                            : product.stock > 0
                                                                ? 'bg-amber-100 text-amber-600'
                                                                : 'bg-rose-100 text-rose-600'
                                                    )}
                                                >
                                                    {product.stock > 10 ? 'IN STOCK' : product.stock > 0 ? 'LOW STOCK' : 'OUT OF STOCK'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-1.5 w-32">
                                                    <div className="flex items-center justify-between text-[10px] font-black">
                                                        <span className="text-slate-800">{product.stock} Units</span>
                                                        <span className="text-slate-300">/ 100</span>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                        <div
                                                            className={cn(
                                                                "h-full rounded-full transition-all duration-500",
                                                                product.stock > 20 ? 'bg-indigo-500' : 'bg-rose-500'
                                                            )}
                                                            style={{ width: `${Math.min(100, product.stock)}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-black text-slate-800">
                                                {formatPrice(product.price)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                                                        <Edit2 size={16} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(product.id)}
                                                        className="h-9 w-9 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </div>
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
                            Showing <span className="text-slate-800">{(page * 10) + 1}</span> to <span className="text-slate-800">{(page * 10) + filteredProducts.length}</span> results
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
