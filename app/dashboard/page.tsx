import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { KPICard } from "@/components/dashboard/kpi-card";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { ChannelBreakdown } from "@/components/dashboard/channel-breakdown";
import { TopProducts } from "@/components/dashboard/top-products";
import { InventoryHeatmap } from "@/components/dashboard/inventory-heatmap";
import { RecentInsights } from "@/components/dashboard/recent-insights";
import { StockoutAlerts } from "@/components/dashboard/stockout-alerts";
import {
  DollarSign,
  ShoppingCart,
  Package,
  AlertTriangle,
  TrendingUp,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Overview - Retail Dashboard",
  description:
    "Real-time overview of your retail operations with KPIs, sales charts, and inventory insights.",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Executive Dashboard
        </h1>
        <p className="text-muted-foreground">
          Real-time overview of your retail operations
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Revenue"
          value="$2,847,392"
          change="+12.5%"
          trend="up"
          icon={<DollarSign className="w-5 h-5" />}
          sparklineData={[45, 52, 48, 61, 58, 65, 72, 68, 75, 82, 78, 85]}
        />
        <KPICard
          title="Orders (7d)"
          value="8,429"
          change="+8.2%"
          trend="up"
          icon={<ShoppingCart className="w-5 h-5" />}
          sparklineData={[
            120, 132, 125, 145, 138, 152, 165, 158, 172, 185, 178, 192,
          ]}
        />
        <KPICard
          title="Active SKUs"
          value="3,842"
          change="-2.1%"
          trend="down"
          icon={<Package className="w-5 h-5" />}
          sparklineData={[
            400, 398, 395, 392, 390, 388, 385, 384, 383, 382, 382, 382,
          ]}
        />
        <KPICard
          title="Stockouts"
          value="23"
          change="+5 from yesterday"
          trend="down"
          icon={<AlertTriangle className="w-5 h-5" />}
          sparklineData={[15, 18, 16, 20, 19, 22, 25, 23, 26, 24, 22, 23]}
        />
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Avg Order Value
            </span>
            <TrendingUp className="w-4 h-4 text-chart-2" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">$337.82</span>
            <span className="text-sm text-chart-2">+5.3%</span>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Customer Count
            </span>
            <Users className="w-4 h-4 text-chart-1" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">24,891</span>
            <span className="text-sm text-chart-2">+12.8%</span>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Days of Inventory
            </span>
            <Package className="w-4 h-4 text-chart-3" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">42.3</span>
            <span className="text-sm text-muted-foreground">days</span>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <ChannelBreakdown />
      </div>

      {/* Data Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProducts />
        <StockoutAlerts />
      </div>

      {/* Full Width Sections */}
      <InventoryHeatmap />
      <RecentInsights />
    </div>
  );
}
