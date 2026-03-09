"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Truck, RefreshCcw, HeadphonesIcon, Tag } from "lucide-react";
import Link from "next/link";


/* ─── Slider Data ─────────────────────────────────────────────────── */
const slides = [
  {
    tag: "A cooker that wears many hats",
    heading1: "Versatil cooker an",
    heading2: "absolute beauty",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&auto=format",
    imageAlt: "Pressure Cooker",
  },
  {
    tag: "Healthiest way to Fry, Bake & Grill",
    heading1: "Healthy recipes",
    heading2: "with 80% less oil",
    image: "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=600&q=80&auto=format",
    imageAlt: "Air Fryer",
  },
  {
    tag: "Premium plastic storage solutions",
    heading1: "Keep your home",
    heading2: "neat & organized",
    image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600&q=80&auto=format",
    imageAlt: "Storage Containers",
  },
];

/* ─── Catalog Data ────────────────────────────────────────────────── */
const categories = [
  {
    title: "Home\nAppliances",
    href: "/kitchen",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80&auto=format",
    bg: "#f1f5f9",
  },
  {
    title: "Kitchen &\nCook Ware",
    href: "/kitchen",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&q=80&auto=format",
    bg: "#f1f5f9",
  },
  {
    title: "Garden",
    href: "/garden",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500&q=80&auto=format",
    bg: "#f8fafc",
  },
  {
    title: "Gifts and\nAccessories",
    href: "/gifting",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&q=80&auto=format",
    bg: "#f8fafc",
  },
];

/* ─── Feature Strip Data ──────────────────────────────────────────── */
const features = [
  { icon: Truck, title: "Free Shipping", desc: "Free shipping on all order" },
  { icon: RefreshCcw, title: "Money Return", desc: "30 days for free return" },
  { icon: HeadphonesIcon, title: "Online Support", desc: "Support 24 hours a day" },
  { icon: Tag, title: "Deals & Promotions", desc: "Price savings, discounts, coupons" },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
  const slide = slides[current];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff" }}>

      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <section style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        minHeight: "480px",
        background: "radial-gradient(ellipse at 60% 50%, #d4197a 0%, #a0114f 100%)",
      }}>

        {/* Polka dot texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(100,0,50,0.5) 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px", pointerEvents: "none",
        }} />

        {/* Top dot grid */}
        <div style={{ position: "absolute", top: "24px", left: "50%", transform: "translateX(-50%)", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", opacity: 0.6, pointerEvents: "none" }}>
          {[...Array(15)].map((_, i) => <div key={i} style={{ width: "8px", height: "8px", backgroundColor: "rgba(255,255,255,0.6)", borderRadius: "50%" }} />)}
        </div>

        {/* Bottom-right dot grid */}
        <div style={{ position: "absolute", bottom: "32px", right: "12%", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", opacity: 0.6, pointerEvents: "none" }}>
          {[...Array(15)].map((_, i) => <div key={i} style={{ width: "8px", height: "8px", backgroundColor: "rgba(255,255,255,0.6)", borderRadius: "50%" }} />)}
        </div>

        {/* Cursive "Get Home Delivered" */}
        <div style={{ position: "absolute", top: "40px", right: "18%", display: "flex", flexDirection: "column", alignItems: "center", pointerEvents: "none", zIndex: 10 }}>
          <svg width="80" height="40" viewBox="0 0 100 50" fill="none" style={{ marginBottom: "4px", marginLeft: "-40px" }}>
            <path d="M10,40 Q40,5 80,15" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M73,10 L80,15 L74,22" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p style={{ color: "#fff", textAlign: "center", fontSize: "28px", lineHeight: 1.3, fontFamily: "cursive" }}>
            Get<br />Home<br />Delivered
          </p>
        </div>

        {/* Content Row */}
        <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1440px", margin: "0 auto", padding: "48px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          <button onClick={prev} style={{ background: "#fff", border: "none", cursor: "pointer", borderRadius: "50%", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
            <ChevronLeft size={22} color="#333" strokeWidth={2} />
          </button>

          <div style={{ flex: 1, paddingLeft: "24px", paddingRight: "32px", maxWidth: "440px" }}>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "18px", marginBottom: "12px" }}>{slide.tag}</p>
            <h1 style={{ color: "#ffffff", fontSize: "52px", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "32px" }}>
              {slide.heading1}<br />{slide.heading2}
            </h1>
            <Link href="/shop" style={{ display: "inline-block", backgroundColor: "#111", color: "#fff", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", padding: "14px 32px", borderRadius: "999px", textDecoration: "none", boxShadow: "0 4px 14px rgba(0,0,0,0.3)" }}>
              SHOPPING NOW
            </Link>
          </div>

          <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginRight: "16px" }}>
            <div style={{ width: "400px", height: "400px", backgroundColor: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", overflow: "hidden" }}>
              <img src={slide.image} alt={slide.imageAlt} style={{ width: "80%", height: "80%", objectFit: "contain" }} />
            </div>
          </div>

          <button onClick={next} style={{ background: "#fff", border: "none", cursor: "pointer", borderRadius: "50%", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
            <ChevronRight size={22} color="#333" strokeWidth={2} />
          </button>
        </div>

        {/* Slide dots */}
        <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px", zIndex: 20 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? "20px" : "8px", height: "8px", borderRadius: "999px", backgroundColor: i === current ? "#fff" : "rgba(255,255,255,0.5)", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }} />
          ))}
        </div>
      </section>



      {/* ── Product Catalog ─────────────────────────────────────────── */}
      <section style={{ maxWidth: "1440px", margin: "0 auto", padding: "48px 24px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {categories.map((cat, i) => (
            <div key={i} style={{ backgroundColor: cat.bg, borderRadius: "12px", overflow: "hidden", position: "relative", minHeight: "260px", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px", cursor: "pointer", transition: "box-shadow 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              {/* Text */}
              <div style={{ zIndex: 2, position: "relative" }}>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#111827", whiteSpace: "pre-line", lineHeight: 1.25, marginBottom: "12px" }}>{cat.title}</h3>
                <Link href={cat.href} style={{ fontSize: "12px", fontWeight: 700, color: "#c31f6d", textDecoration: "none", borderBottom: "1.5px solid #c31f6d", paddingBottom: "1px" }}>
                  Shop Now
                </Link>
              </div>
              {/* Image */}
              <div style={{ position: "absolute", right: 0, bottom: 0, width: "55%", height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden" }}>
                <img src={cat.image} alt={cat.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature Strip ────────────────────────────────────────────── */}
      <section style={{ maxWidth: "1440px", margin: "0 auto", padding: "8px 24px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", backgroundColor: "#e5e7eb", borderRadius: "10px", overflow: "hidden" }}>
          {features.map((f, i) => (
            <div key={i} style={{ backgroundColor: "#fff", padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{ marginBottom: "12px", color: "#c31f6d" }}>
                <f.icon size={28} strokeWidth={1.5} />
              </div>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>{f.title}</p>
              <p style={{ fontSize: "12px", color: "#9ca3af" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WhatsApp Float ───────────────────────────────────────────── */}
      <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 50, textDecoration: "none" }}>
        <div style={{ backgroundColor: "#25D366", padding: "14px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
          <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.063-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
        </div>
      </a>

    </div>
  );
}
