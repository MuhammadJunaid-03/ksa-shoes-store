import { Inter, Tajawal, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { InventoryProvider } from "@/context/InventoryContext";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const tajawal = Tajawal({
  weight: ['300', '400', '500', '700'],
  variable: "--font-tajawal",
  subsets: ["arabic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
});

export const metadata = {
  title: "Al-Zaytoun | Premium Arabic Footwear",
  description: "Shop the finest collection of Men's Arabic Sandals and premium footwear in Saudi Arabia. Handcrafted luxury since 1987. Fast delivery and exclusive designs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.variable} ${inter.className} ${tajawal.variable} ${playfair.variable}`}>
        <LanguageProvider>
          <AuthProvider>
            <InventoryProvider>
              <CartProvider>
                <Navbar />
                <CartDrawer />
                <AuthModal />
                <main>{children}</main>
                <Footer />
              </CartProvider>
            </InventoryProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
