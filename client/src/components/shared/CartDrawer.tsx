"use client";

import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import Link from "next/link";

export default function CartDrawer({ isOpen, onClose }) {
    const { items, removeItem, updateQty, clearCart, totalItems, totalPrice } = useCart();

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={onClose}
                    style={{
                        position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)",
                        zIndex: 100, backdropFilter: "blur(2px)"
                    }}
                />
            )}

            {/* Drawer */}
            <div style={{
                position: "fixed", top: 0, right: 0, bottom: 0, width: "420px", maxWidth: "100vw",
                backgroundColor: "#fff", zIndex: 101, boxShadow: "-4px 0 30px rgba(0,0,0,0.15)",
                transform: isOpen ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
                display: "flex", flexDirection: "column",
            }}>

                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <ShoppingBag size={22} color="#c31f6d" />
                        <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#111827", margin: 0 }}>
                            My Cart <span style={{ color: "#c31f6d" }}>({totalItems})</span>
                        </h2>
                    </div>
                    <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", borderRadius: "6px" }}>
                        <X size={22} color="#6b7280" />
                    </button>
                </div>

                {/* Items */}
                <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
                    {items.length === 0 ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "16px" }}>
                            <ShoppingBag size={64} color="#e5e7eb" strokeWidth={1} />
                            <p style={{ color: "#9ca3af", fontSize: "15px", textAlign: "center" }}>Your cart is empty.<br />Start adding items!</p>
                            <button onClick={onClose} style={{ padding: "10px 24px", backgroundColor: "#c31f6d", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: "13px" }}>
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            {items.map((item) => (
                                <div key={`${item._id}-${item.mode}`} style={{ display: "flex", gap: "12px", backgroundColor: "#f8fafc", borderRadius: "10px", padding: "12px" }}>
                                    {/* Image */}
                                    <div style={{ width: "72px", height: "72px", backgroundColor: "#fff", borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
                                        <img src={item.image || "https://placehold.co/72x72?text=📦"} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </div>

                                    {/* Info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontSize: "13px", fontWeight: 700, color: "#111827", marginBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                            {item.name}
                                        </p>
                                        <span style={{ fontSize: "10px", color: item.mode === "wholesale" ? "#7c3aed" : "#c31f6d", fontWeight: 700, textTransform: "uppercase", backgroundColor: item.mode === "wholesale" ? "#f5f3ff" : "#fff0f6", padding: "2px 6px", borderRadius: "4px" }}>
                                            {item.mode}
                                        </span>
                                        <p style={{ fontSize: "15px", fontWeight: 800, color: "#111827", marginTop: "6px" }}>
                                            ₹{(item.price * item.qty).toLocaleString("en-IN")}
                                        </p>
                                        <p style={{ fontSize: "11px", color: "#9ca3af" }}>₹{item.price.toLocaleString("en-IN")} each</p>
                                    </div>

                                    {/* Qty Controls */}
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between" }}>
                                        <button onClick={() => removeItem(item._id, item.mode)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
                                            <Trash2 size={14} color="#ef4444" />
                                        </button>
                                        <div style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "4px 8px" }}>
                                            <button
                                                onClick={() => updateQty(item._id, item.mode, item.qty - 1)}
                                                style={{ background: "none", border: "none", cursor: "pointer", padding: "0", display: "flex", alignItems: "center" }}
                                            >
                                                <Minus size={12} color="#374151" />
                                            </button>
                                            <span style={{ fontSize: "13px", fontWeight: 700, minWidth: "20px", textAlign: "center" }}>{item.qty}</span>
                                            <button
                                                onClick={() => updateQty(item._id, item.mode, item.qty + 1)}
                                                style={{ background: "none", border: "none", cursor: "pointer", padding: "0", display: "flex", alignItems: "center" }}
                                            >
                                                <Plus size={12} color="#374151" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div style={{ borderTop: "1px solid #f1f5f9", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "14px", color: "#6b7280", fontWeight: 600 }}>Subtotal ({totalItems} items)</span>
                            <span style={{ fontSize: "20px", fontWeight: 800, color: "#111827" }}>₹{totalPrice.toLocaleString("en-IN")}</span>
                        </div>
                        <p style={{ fontSize: "11px", color: "#9ca3af", textAlign: "center" }}>Shipping calculated at checkout</p>
                        <Link href="/checkout" onClick={onClose} style={{
                            display: "block", textAlign: "center", backgroundColor: "#c31f6d", color: "#fff",
                            padding: "14px", borderRadius: "10px", fontWeight: 800, fontSize: "14px",
                            textDecoration: "none", letterSpacing: "0.5px"
                        }}>
                            Proceed to Checkout →
                        </Link>
                        <button onClick={clearCart} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: "12px", fontWeight: 600, textDecoration: "underline" }}>
                            Clear Cart
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
