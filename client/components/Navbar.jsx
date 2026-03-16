"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Search, User, Heart, ChevronDown, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { totalItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const pathname = usePathname();

  return (
    <>
      <header style={{ backgroundColor: "#fff", borderBottom: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: "72px" }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", marginRight: "48px", flexShrink: 0 }}>
            <span style={{ fontSize: "26px", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.5px" }}>
              <span style={{ color: "#115e59" }}>VIVEK</span>
              <span style={{ color: "#c31f6d" }}>PLASTIC</span>
            </span>
            <span style={{ fontSize: "9px", color: "#6b7280", letterSpacing: "3px", fontWeight: 600, marginTop: "2px", textTransform: "uppercase" }}>
              Home • Kitchen • Garden
            </span>
          </Link>

          {/* Nav Links */}
          <nav style={{ display: "flex", flex: 1, alignItems: "center", gap: "32px" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "2px", fontSize: "13px", fontWeight: 700, color: pathname === "/" ? "#c31f6d" : "#1f2937", textDecoration: "none" }}>
              HOME <ChevronDown size={12} color="#9ca3af" />
            </Link>
            <Link href="/kitchen" style={{ display: "flex", alignItems: "center", gap: "2px", fontSize: "13px", fontWeight: 700, color: pathname === "/kitchen" ? "#c31f6d" : "#1f2937", textDecoration: "none" }}>
              KITCHEN <ChevronDown size={12} color="#9ca3af" />
            </Link>
            <Link href="/garden" style={{ fontSize: "13px", fontWeight: 700, color: pathname === "/garden" ? "#c31f6d" : "#1f2937", textDecoration: "none" }}>GARDEN</Link>
            <Link href="/gifting" style={{ fontSize: "13px", fontWeight: 700, color: pathname === "/gifting" ? "#c31f6d" : "#1f2937", textDecoration: "none" }}>GIFTING</Link>
            <Link
              href={pathname === "/wholesale" ? "/" : "/wholesale"}
              style={{ fontSize: "13px", fontWeight: 700, color: "#9ca3af", textDecoration: "none" }}
            >
              {pathname === "/wholesale" ? "RETAIL" : "WHOLESALE"}
            </Link>
            <Link href="/about" style={{ fontSize: "13px", fontWeight: 700, color: pathname === "/about" ? "#c31f6d" : "#1f2937", textDecoration: "none" }}>ABOUT US</Link>
            <Link href="/contact" style={{ fontSize: "13px", fontWeight: 700, color: pathname === "/contact" ? "#c31f6d" : "#1f2937", textDecoration: "none" }}>CONTACT US</Link>
          </nav>

          {/* Icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginLeft: "auto" }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#374151", padding: 0 }}>
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#374151", padding: 0 }}>
              <User size={20} strokeWidth={1.5} />
            </button>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#374151", padding: 0 }}>
              <Heart size={20} strokeWidth={1.5} />
            </button>

            {/* Cart Icon with Badge */}
            <button
              onClick={() => setCartOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#374151", padding: 0, position: "relative" }}
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span style={{
                  position: "absolute", top: "-8px", right: "-8px",
                  backgroundColor: "#c31f6d", color: "#fff",
                  fontSize: "10px", fontWeight: 800,
                  width: "18px", height: "18px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "2px solid #fff"
                }}>
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
