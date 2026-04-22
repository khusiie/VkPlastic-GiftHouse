"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../../components/ui/ProductCard";
import { productService, Product } from "../../services/productService";

export default function WholesalePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await productService.getProducts({
                type: "wholesale",
                limit: 12 // Show more for wholesale
            });
            setProducts(data.products);
        } catch (err: any) {
            setError(err.message || "Failed to fetch wholesale products");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
            {/* Gradient Header */}
            <div style={{ background: "linear-gradient(135deg, #a0114f 0%, #d4197a 100%)", padding: "48px 24px 48px" }}>
                <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
                    <h1 style={{ color: "#fff", fontSize: "48px", fontWeight: 800, marginBottom: "16px" }}>
                        Wholesale Inquiries
                    </h1>
                    <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "18px", maxWidth: "800px", lineHeight: 1.6 }}>
                        Partner with VivekPlastic for premium plastic storage, kitchenware, and gifting solutions at wholesale prices. We offer competitive rates and dedicated support for bulk orders.
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "48px 24px" }}>

                {/* Product Grid */}
                <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#111827", marginBottom: "32px", borderBottom: "2px solid #f1f5f9", paddingBottom: "16px" }}>Featured Wholesale Products</h2>

                {loading ? (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "32px", marginBottom: "64px" }}>
                        {[...Array(4)].map((_, i) => (
                            <div key={i} style={{ backgroundColor: "#f8fafc", aspectRatio: "1/1.1", borderRadius: "0px", animation: "pulse 1.5s infinite" }} />
                        ))}
                    </div>
                ) : error ? (
                    <div style={{ textAlign: "center", padding: "80px 24px" }}>
                        <p style={{ color: "#ef4444", fontSize: "16px", marginBottom: "8px" }}>⚠️ {error}</p>
                        <button onClick={fetchProducts} style={{ marginTop: "16px", padding: "10px 24px", backgroundColor: "#c31f6d", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}>
                            Retry
                        </button>
                    </div>
                ) : products.length > 0 ? (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "64px" }}>
                        {products.map(product => (
                            <ProductCard key={product._id} product={product} mode="wholesale" />
                        ))}
                    </div>
                ) : (
                    <p style={{ color: "#6b7280", marginBottom: "64px", fontSize: "16px" }}>No wholesale products found at the moment. Please check back later.</p>
                )}

                {/* Inquiry Form */}
                <div style={{ backgroundColor: "#f9fafb", padding: "40px", borderRadius: "16px", border: "1px solid #e5e7eb", maxWidth: "800px", margin: "0 auto" }}>
                    <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "24px" }}>Request a Custom Quote</h2>
                    <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                            <input type="text" placeholder="First Name" style={{ width: "100%", padding: "14px 16px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "16px" }} />
                            <input type="text" placeholder="Last Name" style={{ width: "100%", padding: "14px 16px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "16px" }} />
                        </div>
                        <input type="email" placeholder="Email Address" style={{ width: "100%", padding: "14px 16px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "16px" }} />
                        <input type="text" placeholder="Company Name" style={{ width: "100%", padding: "14px 16px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "16px" }} />
                        <textarea placeholder="Tell us about your requirements (products, quantities, etc.)" rows={5} style={{ width: "100%", padding: "14px 16px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "16px", resize: "vertical" }} />
                        <button type="button" style={{ backgroundColor: "#c31f6d", color: "#fff", padding: "16px", borderRadius: "8px", fontSize: "16px", fontWeight: 700, border: "none", cursor: "pointer", marginTop: "8px" }}>
                            Submit Inquiry
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
