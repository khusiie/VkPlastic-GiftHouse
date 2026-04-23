"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin, Send, ShieldCheck, Award, RefreshCw, Lock, Star } from "lucide-react";

export default function Footer() {
    const pathname = usePathname();
    const currentYear = new Date().getFullYear();

    // Hide footer on admin pages
    if (pathname?.startsWith('/admin')) return null;

    return (
        <footer className="footer-root">
            <style jsx>{`
        .footer-root {
          background-color: #fdfcf7;
          color: #333;
          border-top: 1px solid #e5e7eb;
          padding-top: 40px;
          padding-bottom: 20px;
          font-family: var(--font-geist-sans), sans-serif;
        }
        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .top-section {
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 24px;
          marginBottom: 40px;
        }
        .top-section h2 {
          font-size: 16px;
          font-weight: 800;
          color: #111;
          letter-spacing: 1px;
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        .top-section p {
          font-size: 12px;
          line-height: 1.8;
          color: #666;
          max-width: 1100px;
          margin-bottom: 8px;
        }
        .trust-badges {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 60px;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 40px;
        }
        .badge-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          flex: 1;
          min-width: 150px;
        }
        .badge-icon {
          color: #999;
          margin-bottom: 12px;
        }
        .badge-text {
          font-size: 11px;
          font-weight: 700;
          color: #222;
          line-height: 1.3;
          max-width: 120px;
        }
        .links-grid {
          display: grid;
          grid-template-columns: 1fr 2.5fr 1.5fr;
          gap: 40px;
          border-top: 1px solid #e5e7eb;
          padding-top: 40px;
          margin-bottom: 40px;
        }
        .help-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .newsletter-section {
          text-align: center;
        }
        .address-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 40px;
          border-top: 1px solid #e5e7eb;
          padding-top: 40px;
          margin-bottom: 40px;
        }
        .payment-methods {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        .payment-card {
          border: 1px solid #eee;
          padding: 6px;
          text-align: center;
          font-size: 10px;
          font-weight: 700;
          color: #999;
          background-color: #fff;
        }
        .category-tags {
          border-top: 1px solid #e5e7eb;
          padding-top: 30px;
          margin-bottom: 40px;
        }
        .tag-row {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
          flex-wrap: wrap;
          align-items: center;
        }
        .tag-label {
          font-size: 12px;
          font-weight: 800;
          color: #000;
        }
        .tag-list {
          font-size: 11px;
          color: #555;
        }

        @media (max-width: 1024px) {
          .links-grid {
            grid-template-columns: 1fr 1fr;
          }
          .newsletter-section {
            grid-column: span 2;
            margin-top: 20px;
          }
        }
        @media (max-width: 768px) {
          .links-grid {
            grid-template-columns: 1fr;
          }
          .help-columns {
            grid-template-columns: 1fr;
          }
          .newsletter-section {
            grid-column: span 1;
          }
          .address-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .trust-badges {
            justify-content: center;
          }
        }
      `}</style>

            <div className="footer-container">

                {/* Top Header Section */}
                <div className="top-section">
                    <h2>
                        Pioneering Excellence in Modern-Ethnic Houseware
                    </h2>
                    <p>
                        Welcome to the House of Vivek Plastic, a world where utility and aesthetics are fused with an ultra-modern spirit to cater to the homes of today. We are an authentic lifestyle brand quintessentially dedicated to premium plastic solutions and unique gifting. We like to call ourselves a pioneer in modern-ethnic houseware, trying to make quality home essentials approachable and affordable to all by eliminating the meticulous middle-man costs and ensuring direct-to-consumer value. Discover a range that spans from sophisticated kitchen organizers to designer garden essentials, all crafted with durability and style in mind.
                    </p>
                    <Link href="/about" style={{ fontSize: "12px", fontWeight: 700, color: "#000", textDecoration: "underline", textAlign: "right", display: "block" }}>
                        Read more
                    </Link>
                </div>

                {/* Trust Badges */}
                <div className="trust-badges">
                    {[
                        { icon: <Star size={32} strokeWidth={1} />, text: "PREMIUM QUALITY" },
                        { icon: <Award size={32} strokeWidth={1} />, text: "ISO 9001:2015 CERTIFIED BRAND" },
                        { icon: <ShieldCheck size={32} strokeWidth={1} />, text: "QUALITY TESTED PRODUCTS" },
                        { icon: <RefreshCw size={32} strokeWidth={1} />, text: "SEAMLESS RETURNS" },
                        { icon: <Lock size={32} strokeWidth={1} />, text: "SECURE PAYMENTS" },
                    ].map((item, i) => (
                        <div key={i} className="badge-item">
                            <div className="badge-icon">{item.icon}</div>
                            <span className="badge-text">{item.text}</span>
                        </div>
                    ))}
                </div>

                {/* Links Grid */}
                <div className="links-grid">

                    {/* Company Column */}
                    <div>
                        <h4 style={{ fontSize: "13px", fontWeight: 800, marginBottom: "20px", color: "#000" }}>COMPANY</h4>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                            {["About Us", "News and Press", "Careers", "Contact Us"].map(link => (
                                <li key={link}><Link href="#" style={{ fontSize: "12px", color: "#444", textDecoration: "none" }}>{link}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Help Column */}
                    <div>
                        <h4 style={{ fontSize: "13px", fontWeight: 800, marginBottom: "20px", color: "#000" }}>HELP</h4>
                        <div className="help-columns">
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                                {["International FAQs", "Order Status", "Returns & Exchange", "Terms And Conditions", "Privacy Policy", "Investor Relations", "Responsible Disclosure"].map(link => (
                                    <li key={link}><Link href="#" style={{ fontSize: "12px", color: "#444", textDecoration: "none" }}>{link}</Link></li>
                                ))}
                            </ul>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                                {["FAQs", "Cancellation policy", "Shipping Policy", "Ordering & Payment", "B2B Solutions", "Wholesale Enquiry"].map(link => (
                                    <li key={link}><Link href="#" style={{ fontSize: "12px", color: "#444", textDecoration: "none" }}>{link}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter Column */}
                    <div className="newsletter-section">
                        <h4 style={{ fontSize: "13px", fontWeight: 800, marginBottom: "20px", color: "#000" }}>NEWSLETTER SIGNUP</h4>
                        <div style={{ display: "flex", marginBottom: "24px" }}>
                            <input
                                type="email"
                                placeholder="Enter Email Address"
                                style={{ flex: 1, padding: "10px 15px", border: "1px solid #ddd", borderRadius: "0", fontSize: "12px", outline: "none" }}
                            />
                            <button style={{ backgroundColor: "#000", color: "#fff", border: "none", padding: "0 20px", fontSize: "11px", fontWeight: 800, cursor: "pointer", textTransform: "uppercase" }}>
                                Subscribe
                            </button>
                        </div>

                        <h4 style={{ fontSize: "13px", fontWeight: 800, marginBottom: "20px", color: "#000" }}>CONNECT WITH US</h4>
                        <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
                            {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                                <Link key={i} href="#" style={{
                                    width: "36px", height: "36px", borderRadius: "50%", border: "1px solid #333",
                                    display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#333"
                                }}>
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Address and Payment Section */}
                <div className="address-grid">
                    <div>
                        <h4 style={{ fontSize: "13px", fontWeight: 800, marginBottom: "20px", color: "#000", textTransform: "uppercase" }}>In case of any concern, contact us</h4>
                        <h5 style={{ fontSize: "12px", fontWeight: 800, marginBottom: "12px", color: "#000" }}>HEAD OFFICE ADDRESS:</h5>
                        <p style={{ fontSize: "12px", color: "#555", lineHeight: "1.6" }}>
                            Vivek Plastic & Gift House Pvt Ltd<br />
                            233, Kanak Mandi, Thandi Gali,<br />
                            Jammu - 180001, India<br />
                            <strong>Customer Care:</strong> <span style={{ color: "#25D366" }}>📞 +91-9999999999</span>
                        </p>
                        <p style={{ fontSize: "11px", color: "#777", marginTop: "12px", fontStyle: "italic" }}>
                            Due to high call volumes, we're currently unavailable on calls. For a quicker resolution, please reach out to us directly on WhatsApp!
                        </p>
                    </div>

                    <div>
                        <h5 style={{ fontSize: "12px", fontWeight: 800, marginBottom: "12px", color: "#000", marginTop: "35px" }}>WAREHOUSE ADDRESS:</h5>
                        <p style={{ fontSize: "12px", color: "#555", lineHeight: "1.6" }}>
                            Vivek Plastic & Gift House Pvt Ltd<br />
                            Plot No-88, Industrial Area,<br />
                            Bari Brahmana, Jammu - 181133, India
                        </p>
                    </div>

                    <div>
                        <h4 style={{ fontSize: "13px", fontWeight: 800, marginBottom: "20px", color: "#000" }}>PAYMENT METHODS</h4>
                        <div className="payment-methods">
                            {["Visa", "Mastercard", "UPI", "Amex", "COD", "Paytm", "NetBanking", "PayPal", "Easy Pay"].map(p => (
                                <div key={p} className="payment-card">
                                    {p}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Category Tags Section */}
                <div className="category-tags">
                    <div className="tag-row">
                        <span className="tag-label">PLASTIC HOUSEWARE:</span>
                        <div className="tag-list">
                            {["Storage Jars", "Dinner Sets", "Bottles", "Lunch Boxes", "Tiffin Sets", "Trays", "Buckets", "Mugs", "Stools", "Baskets"].map((item, i, arr) => (
                                <span key={item}>{item}{i < arr.length - 1 && " | "}</span>
                            ))}
                        </div>
                    </div>
                    <div className="tag-row" style={{ alignItems: "flex-start" }}>
                        <span className="tag-label" style={{ flexShrink: 0 }}>TOP CATEGORIES:</span>
                        <div className="tag-list">
                            {["Kitchen & Cookware", "Garden Essentials", "Premium Gifting", "Wholesale Plastic", "Home Decor", "Cleaning Supplies", "Office Organizers", "Bath Accessories", "Outdoor Furniture", "Kids School Sets", "Insulated Flasks"].map((item, i, arr) => (
                                <span key={item}>{item}{i < arr.length - 1 && " | "}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div style={{ textAlign: "center", borderTop: "1px solid #eee", paddingTop: "20px" }}>
                    <p style={{ fontSize: "11px", color: "#999" }}>
                        © {currentYear} VivekPlastic.com. All Rights Reserved
                    </p>
                </div>

            </div>
        </footer>
    );
}
