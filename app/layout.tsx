import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FetchStock from "./components/FetchStock";



export const metadata: Metadata = {
  title: "Second Round",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <HeroSection />
        <FetchStock />
        {children}
      </body>
    </html>
  );
}
