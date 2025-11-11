import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Retail Dashboard - Made by Lotfi Jebali",
  description:
    "AI-powered retail dashboard for managing sales, inventory, pricing, and insights. Made by Lotfi Jebali. Visit https://lotfijebali.dev for more information.",
  generator: "Retail Dashboard",
  authors: [
    {
      name: "Lotfi Jebali",
      url: "https://lotfijebali.dev?utm_source=free-retail-dashboard",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
