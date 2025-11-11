import type { Metadata } from "next";
import type React from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export const metadata: Metadata = {
  title: "Dashboard - Retail Dashboard",
  description: "AI-powered retail dashboard for managing sales, inventory, pricing, and insights. Made by Lotfi Jebali.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
