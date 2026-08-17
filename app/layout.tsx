import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "CasitaCrew | Vetted trades, no surprises",
  description: "Hire vetted cleaners, handypeople, electricians, and plumbers in Toronto. Every pro is checked before they knock on your door.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex flex-col min-h-screen bg-cream">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
