"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

export default function TrendingProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            // Mock data instead of calling backend
            const mockProducts = [
                {
                    _id: "mock1",
                    name: "Premium Storage Container Set",
                    category: "Storage",
                    retailPrice: 45,
                    originalPrice: 60,
                    moq: 1,
                    images: ["https://placehold.co/400x400?text=Container+Set"],
                    colors: ["#3b82f6", "#ef4444"]
                },
                {
                    _id: "mock2",
                    name: "Microwave Safe Lunch Box",
                    category: "Kitchenware",
                    retailPrice: 15,
                    originalPrice: 25,
                    moq: 1,
                    images: ["https://placehold.co/400x400?text=Lunch+Box"],
                    colors: ["#10b981", "#f59e0b"]
                },
                {
                    _id: "mock3",
                    name: "Plastic Drinking Tumblers",
                    category: "Drinkware",
                    retailPrice: 8,
                    originalPrice: 12,
                    moq: 1,
                    images: ["https://placehold.co/400x400?text=Tumblers"],
                    colors: ["#8b5cf6", "#ec4899"]
                },
                {
                    _id: "mock4",
                    name: "Multipurpose Storage Bins",
                    category: "Storage",
                    retailPrice: 30,
                    originalPrice: 45,
                    moq: 1,
                    images: ["https://placehold.co/400x400?text=Storage+Bins"],
                    colors: ["#64748b", "#334155"]
                },
                {
                    _id: "mock5",
                    name: "Insulated Water Bottle",
                    category: "Drinkware",
                    retailPrice: 20,
                    originalPrice: 30,
                    moq: 1,
                    images: ["https://placehold.co/400x400?text=Water+Bottle"],
                    colors: ["#000000", "#ffffff"]
                },
                {
                    _id: "mock6",
                    name: "Glass Food Storage Jars",
                    category: "Storage",
                    retailPrice: 35,
                    originalPrice: 50,
                    moq: 1,
                    images: ["https://placehold.co/400x400?text=Storage+Jars"],
                    colors: ["#cbd5e1"]
                },
                {
                    _id: "mock7",
                    name: "BPA-Free Salad Bowl",
                    category: "Kitchenware",
                    retailPrice: 12,
                    originalPrice: 18,
                    moq: 1,
                    images: ["https://placehold.co/400x400?text=Salad+Bowl"],
                    colors: ["#22c55e", "#fbbf24"]
                },
                {
                    _id: "mock8",
                    name: "Stackable Plastic Drawers",
                    category: "Storage",
                    retailPrice: 55,
                    originalPrice: 75,
                    moq: 1,
                    images: ["https://placehold.co/400x400?text=Drawers"],
                    colors: ["#f8fafc", "#e2e8f0"]
                }
            ];
            
            // Simulating a tiny network delay
            await new Promise(resolve => setTimeout(resolve, 300));
            setProducts(mockProducts);
            setLoading(false);
        };

        fetchTrending();
    }, []);

    if (loading) return null; // or a skeleton loader
    if (products.length === 0) return <div style={{ textAlign: "center", padding: "48px" }}>No products available.</div>;

    return (
        <section style={{ maxWidth: "1440px", margin: "0 auto", padding: "64px 24px" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#111827", marginBottom: "8px" }}>
                    New Trending Products
                </h2>
                <div style={{ width: "60px", height: "3px", backgroundColor: "#c31f6d", margin: "0 auto" }}></div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
                {products.map(product => (
                    <ProductCard key={product._id} product={product} mode="retail" />
                ))}
            </div>
        </section>
    );
}
