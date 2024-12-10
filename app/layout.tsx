import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";

export const metadata: Metadata = {
  title: "Second Round",
  description: "Made with love by Skynet Cloud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <CartProvider>
        <html lang="en">
          <body>
            <Header />
            {children}
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
}
