"use client";

import { useState } from "react";
import { Heart, RefreshCcw, Search } from "lucide-react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, mode = "retail" }) {
    const [isHovered, setIsHovered] = useState(false);
    const { addItem, items } = useCart();

    const price = mode === "wholesale" ? product.wholesalePrice : product.retailPrice;
    // Calculate a mock "original" price if not provided, just for the visual effect
    const originalPrice = Math.round(price * 1.3);
    const image = product.images?.[0];

    // Calculate discount percentage
    const discountPercentage = Math.round(((originalPrice - price) / originalPrice) * 100) || 25;

    // Check if added to cart
    const isAdded = items.some(i => i._id === product._id && i.mode === mode);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isAdded) {
            addItem(product, mode, 1);
        }
    };

    // Mock colors if not provided
    const colors = product.colors && product.colors.length > 0 ? product.colors : ['#3b82f6', '#ef4444'];

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                cursor: "pointer",
                backgroundColor: "#fff",
                fontFamily: "var(--font-geist-sans), sans-serif",
                paddingBottom: "16px",
                margin: "12px", // Added margin so the badge bleeding out doesn't get clipped by nearby components
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div style={{ 
                position: "relative", 
                backgroundColor: "#e5e7eb", 
                aspectRatio: "1/1", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                marginBottom: "16px",
            }}>
                {/* SALE Badge - overlapping the top left corner */}
                <div style={{
                    position: "absolute", 
                    top: "-10px", 
                    left: "-10px", 
                    zIndex: 20,
                    backgroundColor: "#e11d48", 
                    color: "#fff",
                    fontSize: "13px", 
                    fontWeight: 700, 
                    padding: "4px 10px",
                    borderRadius: "16px", 
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}>
                    -{discountPercentage}%
                </div>

                {/* Action Icons (Right Side) */}
                <div style={{
                    position: "absolute", top: "12px", right: "12px", zIndex: 10,
                    display: "flex", flexDirection: "column", gap: "8px",
                    opacity: isHovered ? 1 : 0, transform: isHovered ? "translateX(0)" : "translateX(10px)",
                    transition: "all 0.3s ease",
                }}>
                    <button style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#fff", border: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", cursor: "pointer", transition: "background-color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}>
                        <Heart size={16} color="#4b5563" />
                    </button>
                    <button style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#fff", border: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", cursor: "pointer", transition: "background-color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}>
                        <RefreshCcw size={16} color="#4b5563" />
                    </button>
                    <button style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#fff", border: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", cursor: "pointer", transition: "background-color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}>
                        <Search size={16} color="#4b5563" />
                    </button>
                </div>

                {/* Product Image Placeholder Text / Actual Image */}
                <Link href={`/products/${product._id}`} style={{ display: "flex", width: "100%", height: "100%", position: "relative", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {image ? (
                        <img
                            src={image}
                            alt={product.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "multiply", transition: "transform 0.3s ease", transform: isHovered ? "scale(1.05)" : "scale(1)" }}
                        />
                    ) : (
                        <span style={{ fontSize: "24px", fontWeight: 600, color: "#9ca3af", textAlign: "center", padding: "16px", lineHeight: 1.2, display: "block", textDecoration: "none" }}>
                            {product.name}
                        </span>
                    )}
                </Link>

                {/* Add to Cart Button (Hover overlay) */}
                <div style={{
                    position: "absolute", bottom: "20px", left: "0", right: "0",
                    display: "flex", justifyContent: "center",
                    opacity: isHovered ? 1 : 0, transform: isHovered ? "translateY(0)" : "translateY(10px)",
                    transition: "all 0.3s ease", zIndex: 10,
                }}>
                    {isAdded ? (
                        <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            style={{
                                backgroundColor: "#e11d48", color: "#fff", border: "none",
                                padding: "8px 24px", borderRadius: "24px", fontSize: "14px", fontWeight: 600,
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)", cursor: "pointer",
                            }}
                        >
                            View cart
                        </button>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            style={{
                                backgroundColor: "#fff", color: "#1f2937", border: "none",
                                padding: "8px 24px", borderRadius: "24px", fontSize: "14px", fontWeight: 600,
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)", cursor: "pointer",
                                transition: "background-color 0.2s, color 0.2s",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#e11d48"; e.currentTarget.style.color = "#fff"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.color = "#1f2937"; }}
                        >
                            Add to cart
                        </button>
                    )}
                </div>
            </div>

            {/* Info */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Name */}
                <Link href={`/products/${product._id}`} style={{ textDecoration: "none" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1f2937", lineHeight: 1.3, marginBottom: "4px", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {product.name}
                    </h3>
                </Link>

                {/* Category */}
                <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 10px 0" }}>
                    {product.category?.name || product.category || "Storage"}
                </p>

                {/* Bottom Row: Price and Colors */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    {/* Price Box */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontSize: "16px", fontWeight: 700, color: "#e11d48" }}>
                            ₹{typeof price === 'number' ? price.toLocaleString("en-IN") : price}
                        </span>
                        <span style={{ fontSize: "14px", fontWeight: 500, color: "#9ca3af", textDecoration: "line-through" }}>
                            ₹{typeof originalPrice === 'number' ? originalPrice.toLocaleString("en-IN") : originalPrice}
                        </span>
                    </div>

                    {/* Colors */}
                    <div style={{ display: "flex", gap: "4px" }}>
                        {colors.map((color, idx) => (
                            <div key={idx} style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: color }} />
                        ))}
                    </div>
                </div>

                {/* Mode indicator badge */}
                <div>
                    <span style={{ fontSize: "10px", color: "#4b5563", fontWeight: 600, background: "#f3f4f6", padding: "4px 8px", borderRadius: "4px" }}>
                        Min Order: {mode === "wholesale" ? `${product.moq || 50} units` : `1 unit`}
                    </span>
                </div>
            </div>
        </div>
    );
}

