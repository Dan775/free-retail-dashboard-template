"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { ChannelBreakdown } from "@/components/dashboard/channel-breakdown";
import { KPICard } from "@/components/dashboard/kpi-card";
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
  Calendar,
} from "lucide-react";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your retail performance
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px] bg-background">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="custom">Custom range</SelectItem>
          </SelectContent>
        </Select>
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
          title="Total Orders"
          value="8,429"
          change="+8.2%"
          trend="up"
          icon={<ShoppingCart className="w-5 h-5" />}
          sparklineData={[
            120, 132, 125, 145, 138, 152, 165, 158, 172, 185, 178, 192,
          ]}
        />
        <KPICard
          title="Avg Order Value"
          value="$337.82"
          change="+5.3%"
          trend="up"
          icon={<TrendingUp className="w-5 h-5" />}
          sparklineData={[
            320, 335, 328, 345, 342, 355, 365, 358, 372, 385, 378, 392,
          ]}
        />
        <KPICard
          title="Customer Count"
          value="24,891"
          change="+12.8%"
          trend="up"
          icon={<Users className="w-5 h-5" />}
          sparklineData={[
            200, 220, 215, 240, 235, 250, 265, 260, 275, 290, 285, 300,
          ]}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <ChannelBreakdown />
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Conversion Rate</span>
            <TrendingUp className="w-4 h-4 text-chart-2" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">3.42%</span>
            <span className="text-sm text-chart-2">+0.8%</span>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Return Rate</span>
            <TrendingUp className="w-4 h-4 text-chart-2" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">2.1%</span>
            <span className="text-sm text-chart-2">-0.3%</span>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Customer Lifetime Value</span>
            <TrendingUp className="w-4 h-4 text-chart-2" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">$1,247</span>
            <span className="text-sm text-chart-2">+8.5%</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

