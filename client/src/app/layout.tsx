import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "VivekPlastic & Gift House | B2B & Retail",
  description: "India's Premier Wholesale & Retail Destination for Plastics & Gifts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased selection:bg-indigo-300 selection:text-indigo-900 bg-slate-50 relative min-h-screen font-sans`}>
        <Toaster position="top-center" />
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main>
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
