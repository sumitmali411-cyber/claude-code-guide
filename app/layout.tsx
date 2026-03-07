import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/nav/Sidebar";
import { MobileNav } from "@/components/nav/MobileNav";
import { LenisProvider } from "@/components/LenisProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Claude Code Guide — Interactive Learning",
  description:
    "Learn Claude Code interactively. Master the agentic coding tool with examples, animations, and hands-on tools.",
  keywords: ["Claude Code", "Anthropic", "AI coding", "tutorial", "guide"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <LenisProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <MobileNav />
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
