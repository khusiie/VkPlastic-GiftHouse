"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function TrendingProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const res = await fetch(`${API_URL}/api/products?limit=4`);
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data.products || []);
                }
            } catch (err) {
                console.error("Failed to fetch trending products", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrending();
    }, []);

    if (loading) return null; // or a skeleton loader
    if (products.length === 0) return null;

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
