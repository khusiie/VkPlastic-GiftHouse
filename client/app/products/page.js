"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../../components/ProductCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const CATEGORIES = [
    { label: "All", value: "" },
    { label: "Kitchen", value: "kitchen" },
    { label: "Storage", value: "storage" },
    { label: "Garden", value: "garden" },
    { label: "Gifting", value: "gifting" },
    { label: "Wholesale", value: "wholesale" },
    { label: "Home Appliances", value: "home-appliances" },
];

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mode, setMode] = useState("retail"); // 'retail' | 'wholesale'
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const LIMIT = 8;

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams({
                type: mode,
                page,
                limit: LIMIT,
                ...(category && { category }),
                ...(search && { search }),
            });
            const res = await fetch(`${API_URL}/api/products?${params}`);
            if (!res.ok) throw new Error("Failed to fetch products");
            const data = await res.json();
            setProducts(data.products);
            setTotalPages(data.pages);
            setTotal(data.total);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [mode, category, search, page]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setPage(1);
    }, [mode, category, search]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(searchInput);
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>

            {/* Page Header */}
            <div style={{ background: "linear-gradient(135deg, #a0114f 0%, #d4197a 100%)", padding: "48px 24px 32px" }}>
                <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
                    <h1 style={{ color: "#fff", fontSize: "36px", fontWeight: 800, marginBottom: "8px" }}>
                        Product Catalog
                    </h1>
                    <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "15px" }}>
                        {total > 0 ? `${total} products found` : "Browse our full collection"}
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "32px 24px" }}>

                {/* Controls */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", marginBottom: "32px" }}>

                    {/* Search */}
                    <form onSubmit={handleSearch} style={{ display: "flex", flex: 1, minWidth: "240px", maxWidth: "400px" }}>
                        <div style={{ position: "relative", width: "100%" }}>
                            <Search size={16} color="#9ca3af" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                style={{ width: "100%", padding: "10px 14px 10px 40px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                            />
                        </div>
                        <button type="submit" style={{ marginLeft: "8px", padding: "10px 18px", backgroundColor: "#c31f6d", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>
                            Search
                        </button>
                    </form>

                    {/* B2B / B2C Toggle */}
                    <div style={{ display: "flex", backgroundColor: "#f1f5f9", borderRadius: "8px", padding: "4px", gap: "4px" }}>
                        {["retail", "wholesale"].map((m) => (
                            <button
                                key={m}
                                onClick={() => setMode(m)}
                                style={{
                                    padding: "8px 20px", borderRadius: "6px", border: "none", cursor: "pointer",
                                    fontSize: "12px", fontWeight: 700, transition: "all 0.2s",
                                    backgroundColor: mode === m ? "#c31f6d" : "transparent",
                                    color: mode === m ? "#fff" : "#6b7280",
                                    textTransform: "capitalize",
                                }}
                            >
                                {m === "retail" ? "🛍 Retail" : "🏭 Wholesale"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category Tabs */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => setCategory(cat.value)}
                            style={{
                                padding: "7px 16px", borderRadius: "999px", border: "1.5px solid",
                                fontSize: "12px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                                borderColor: category === cat.value ? "#c31f6d" : "#e5e7eb",
                                backgroundColor: category === cat.value ? "#c31f6d" : "#fff",
                                color: category === cat.value ? "#fff" : "#374151",
                            }}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
                        {[...Array(8)].map((_, i) => (
                            <div key={i} style={{ backgroundColor: "#fff", borderRadius: "12px", height: "360px", animation: "pulse 1.5s infinite" }}>
                                <div style={{ backgroundColor: "#f1f5f9", height: "220px", borderRadius: "12px 12px 0 0" }} />
                                <div style={{ padding: "14px 16px" }}>
                                    <div style={{ height: "12px", backgroundColor: "#f1f5f9", borderRadius: "4px", marginBottom: "8px" }} />
                                    <div style={{ height: "16px", backgroundColor: "#f1f5f9", borderRadius: "4px", marginBottom: "8px", width: "70%" }} />
                                    <div style={{ height: "24px", backgroundColor: "#f1f5f9", borderRadius: "4px", width: "40%" }} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div style={{ textAlign: "center", padding: "80px 24px" }}>
                        <p style={{ color: "#ef4444", fontSize: "16px", marginBottom: "8px" }}>⚠️ {error}</p>
                        <p style={{ color: "#9ca3af", fontSize: "13px" }}>Make sure the server is running on port 5000</p>
                        <button onClick={fetchProducts} style={{ marginTop: "16px", padding: "10px 24px", backgroundColor: "#c31f6d", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}>
                            Retry
                        </button>
                    </div>
                ) : products.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "80px 24px" }}>
                        <p style={{ fontSize: "48px", marginBottom: "16px" }}>📦</p>
                        <p style={{ color: "#6b7280", fontSize: "16px" }}>No products found. Try a different category or search.</p>
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} mode={mode} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "48px" }}>
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            style={{
                                padding: "8px 16px", borderRadius: "8px", border: "1px solid #e5e7eb",
                                backgroundColor: page === 1 ? "#f9fafb" : "#fff", cursor: page === 1 ? "not-allowed" : "pointer",
                                display: "flex", alignItems: "center", gap: "4px", fontWeight: 600, fontSize: "13px",
                                color: page === 1 ? "#9ca3af" : "#374151",
                            }}
                        >
                            <ChevronLeft size={16} /> Prev
                        </button>

                        {[...Array(totalPages)].map((_, i) => {
                            const p = i + 1;
                            const show = p === 1 || p === totalPages || Math.abs(p - page) <= 1;
                            if (!show) {
                                if (p === 2 || p === totalPages - 1) {
                                    return <span key={p} style={{ color: "#9ca3af" }}>…</span>;
                                }
                                return null;
                            }
                            return (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    style={{
                                        width: "36px", height: "36px", borderRadius: "8px", border: "1px solid",
                                        borderColor: page === p ? "#c31f6d" : "#e5e7eb",
                                        backgroundColor: page === p ? "#c31f6d" : "#fff",
                                        color: page === p ? "#fff" : "#374151",
                                        fontWeight: 700, fontSize: "13px", cursor: "pointer",
                                    }}
                                >
                                    {p}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            style={{
                                padding: "8px 16px", borderRadius: "8px", border: "1px solid #e5e7eb",
                                backgroundColor: page === totalPages ? "#f9fafb" : "#fff",
                                cursor: page === totalPages ? "not-allowed" : "pointer",
                                display: "flex", alignItems: "center", gap: "4px", fontWeight: 600, fontSize: "13px",
                                color: page === totalPages ? "#9ca3af" : "#374151",
                            }}
                        >
                            Next <ChevronRight size={16} />
                        </button>
                    </div>
                )}

                {/* Page Info */}
                {!loading && total > 0 && (
                    <p style={{ textAlign: "center", color: "#9ca3af", fontSize: "12px", marginTop: "16px" }}>
                        Page {page} of {totalPages} — {total} total products
                    </p>
                )}
            </div>
        </div>
    );
}
