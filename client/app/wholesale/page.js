"use client";

import { useState, useEffect, useCallback } from "react";
import ProductCard from "../../components/ProductCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function WholesalePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            // Mocking wholesale data instead of calling backend
            const mockProducts = [
                {
                    _id: "mock1",
                    name: "Premium Storage Container Set",
                    category: "Storage",
                    wholesalePrice: 45,
                    originalPrice: 60,
                    moq: 50,
                    images: ["https://placehold.co/400x400?text=Container+Set"],
                    colors: ["#3b82f6", "#ef4444"]
                },
                {
                    _id: "mock2",
                    name: "Microwave Safe Lunch Box",
                    category: "Kitchenware",
                    wholesalePrice: 15,
                    originalPrice: 25,
                    moq: 100,
                    images: ["https://placehold.co/400x400?text=Lunch+Box"],
                    colors: ["#10b981", "#f59e0b"]
                },
                {
                    _id: "mock3",
                    name: "Plastic Drinking Tumblers",
                    category: "Drinkware",
                    wholesalePrice: 8,
                    originalPrice: 12,
                    moq: 200,
                    images: ["https://placehold.co/400x400?text=Tumblers"],
                    colors: ["#8b5cf6", "#ec4899"]
                },
                {
                    _id: "mock4",
                    name: "Multipurpose Storage Bins",
                    category: "Storage",
                    wholesalePrice: 30,
                    originalPrice: 45,
                    moq: 40,
                    images: ["https://placehold.co/400x400?text=Storage+Bins"],
                    colors: ["#64748b", "#334155"]
                },
                {
                    _id: "mock5",
                    name: "Insulated Water Bottle",
                    category: "Drinkware",
                    wholesalePrice: 20,
                    originalPrice: 30,
                    moq: 100,
                    images: ["https://placehold.co/400x400?text=Water+Bottle"],
                    colors: ["#000000", "#ffffff"]
                },
                {
                    _id: "mock6",
                    name: "Glass Food Storage Jars",
                    category: "Storage",
                    wholesalePrice: 35,
                    originalPrice: 50,
                    moq: 30,
                    images: ["https://placehold.co/400x400?text=Storage+Jars"],
                    colors: ["#cbd5e1"]
                },
                {
                    _id: "mock7",
                    name: "BPA-Free Salad Bowl",
                    category: "Kitchenware",
                    wholesalePrice: 12,
                    originalPrice: 18,
                    moq: 150,
                    images: ["https://placehold.co/400x400?text=Salad+Bowl"],
                    colors: ["#22c55e", "#fbbf24"]
                },
                {
                    _id: "mock8",
                    name: "Stackable Plastic Drawers",
                    category: "Storage",
                    wholesalePrice: 55,
                    originalPrice: 75,
                    moq: 20,
                    images: ["https://placehold.co/400x400?text=Drawers"],
                    colors: ["#f8fafc", "#e2e8f0"]
                }
            ];
            
            // Simulating network delay
            await new Promise(resolve => setTimeout(resolve, 500));
            setProducts(mockProducts);
        } catch (err) {
            console.error(err);
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
