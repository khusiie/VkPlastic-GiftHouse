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
    const image = product.images?.[0] || "https://placehold.co/400x400?text=No+Image";

    // Check if added to cart
    const isAdded = items.some(i => i._id === product._id && i.mode === mode);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isAdded) {
            addItem(product, mode, 1);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                cursor: "pointer",
                backgroundColor: "#fff",
                fontFamily: "var(--font-geist-sans), sans-serif"
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div style={{ position: "relative", backgroundColor: "#f8fafc", overflow: "hidden", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>

                {/* SALE Badge */}
                <span style={{
                    position: "absolute", top: "12px", left: "12px", zIndex: 10,
                    backgroundColor: "#d32f2f", color: "#fff",
                    fontSize: "12px", fontWeight: 500, padding: "3px 8px",
                    borderRadius: "2px", letterSpacing: "0.2px"
                }}>
                    SALE!
                </span>

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

                {/* Product Image */}
                <Link href={`/products/${product._id}`} style={{ display: "block", width: "100%", height: "100%" }}>
                    <img
                        src={image}
                        alt={product.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
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
                                backgroundColor: "#d32f2f", color: "#fff", border: "none",
                                padding: "8px 24px", borderRadius: "24px", fontSize: "14px", fontWeight: 500,
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)", cursor: "pointer",
                            }}
                        >
                            View cart
                        </button>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            style={{
                                backgroundColor: "#fff", color: "#374151", border: "none",
                                padding: "8px 24px", borderRadius: "24px", fontSize: "14px", fontWeight: 500,
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)", cursor: "pointer",
                                transition: "background-color 0.2s, color 0.2s",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#d32f2f"; e.currentTarget.style.color = "#fff"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.color = "#374151"; }}
                        >
                            Add to cart
                        </button>
                    )}
                </div>
            </div>

            {/* Info */}
            <div style={{ padding: "0 4px", flex: 1, display: "flex", flexDirection: "column" }}>

                {/* Name */}
                <Link href={`/products/${product._id}`} style={{ textDecoration: "none" }}>
                    <h3 style={{ fontSize: "14px", fontWeight: 400, color: "#374151", lineHeight: 1.5, marginBottom: "8px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {product.name}
                    </h3>
                </Link>

                {/* Price Box */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{ fontSize: "16px", fontWeight: 600, color: "#d32f2f" }}>
                        ₹{price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span style={{ fontSize: "13px", color: "#9ca3af", textDecoration: "line-through" }}>
                        ₹{originalPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>

                {/* Mode indicator (only visible if wholesale to distinguish) */}
                {mode === "wholesale" && (
                    <div style={{ marginTop: "6px" }}>
                        <span style={{ fontSize: "10px", color: "#c31f6d", fontWeight: 600, background: "#fdf2f8", padding: "2px 6px", borderRadius: "12px" }}>
                            MOQ: {product.moq} pcs
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
