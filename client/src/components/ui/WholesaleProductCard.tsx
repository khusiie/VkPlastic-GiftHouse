"use client";

import Link from "next/link";

export default function WholesaleProductCard({ product }) {
    // We assume mode is always wholesale for this card.
    const price = product.wholesalePrice || product.retailPrice || 0;
    
    // Mock original price if not provided, just for visual effect matching the reference
    const originalPrice = product.originalPrice || Math.round(price * 1.3);
    
    const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);
    const image = product.images?.[0] || "https://placehold.co/400x400?text=No+Image";
    
    // Mock color swatches for the visual effect shown in reference image
    const colors = product.colors?.length > 0 ? product.colors : ["#fde047", "#4b5563"]; // Default yellow and gray

    return (
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "var(--font-geist-sans), sans-serif", width: "100%" }}>
            {/* Image Container */}
            <div style={{ 
                position: "relative", 
                backgroundColor: "#f8fafc", 
                aspectRatio: "1/1.1", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                marginBottom: "16px",
                padding: "24px"
            }}>
                {/* Circular Discount Badge */}
                {discountPercent > 0 && (
                    <div style={{
                        position: "absolute", 
                        top: "16px", 
                        left: "16px", 
                        backgroundColor: "#e11d48", // matches the bright red from reference
                        color: "#fff",
                        fontSize: "13px", 
                        fontWeight: 600, 
                        padding: "6px 10px",
                        borderRadius: "20px",
                        boxShadow: "0 2px 4px rgba(225, 29, 72, 0.3)"
                    }}>
                        -{discountPercent}%
                    </div>
                )}

                {/* Product Image */}
                <Link href={`/products/${product._id}`} style={{ display: "block", width: "100%", height: "100%" }}>
                    <img
                        src={image}
                        alt={product.name}
                        style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }}
                    />
                </Link>
            </div>

            {/* Info Container */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                {/* Left side: Text & Prices */}
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <Link href={`/products/${product._id}`} style={{ textDecoration: "none" }}>
                        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1f2937", margin: 0 }}>
                            {product.name}
                        </h3>
                    </Link>
                    <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 6px 0" }}>
                        {product.category || "Product"}
                    </p>
                    
                    <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                        <span style={{ fontSize: "14px", fontWeight: 700, color: "#e11d48" }}>
                            €{price.toLocaleString()}
                        </span>
                        {originalPrice > price && (
                            <span style={{ fontSize: "13px", color: "#9ca3af", textDecoration: "line-through" }}>
                                €{originalPrice.toLocaleString()}
                            </span>
                        )}
                    </div>
                </div>

                {/* Right side: Color Swatches */}
                <div style={{ display: "flex", gap: "4px" }}>
                    {colors.map((color, idx) => (
                        <div 
                            key={idx}
                            style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                backgroundColor: color,
                                border: color.toLowerCase() === "#ffffff" ? "1px solid #e5e7eb" : "none"
                            }}
                        />
                    ))}
                </div>
            </div>
            
            {/* MOQ Indicator */}
            {product.moq && (
                 <div style={{ marginTop: "12px" }}>
                     <span style={{ fontSize: "11px", color: "#4b5563", fontWeight: 500, background: "#f1f5f9", padding: "4px 8px", borderRadius: "4px" }}>
                         Min Order: {product.moq} units
                     </span>
                 </div>
            )}
        </div>
    );
}
