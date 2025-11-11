"use client"

import { Card } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { getChartColors } from "@/lib/chart-colors"

const data = [
  { date: "Dec 1", stock: 85, reorderPoint: 50 },
  { date: "Dec 5", stock: 72, reorderPoint: 50 },
  { date: "Dec 10", stock: 58, reorderPoint: 50 },
  { date: "Dec 15", stock: 45, reorderPoint: 50 },
  { date: "Dec 20", stock: 32, reorderPoint: 50 },
  { date: "Dec 25", stock: 18, reorderPoint: 50 },
  { date: "Dec 31", stock: 12, reorderPoint: 50 },
]

export function ProductInventoryChart() {
  const colors = getChartColors()
  
  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Inventory Level</h3>
        <p className="text-sm text-muted-foreground">Stock movement over the last 30 days</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--popover-foreground))",
            }}
          />
          <Area
            type="monotone"
            dataKey="stock"
            stroke={colors.chart1}
            fill={colors.chart1}
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="reorderPoint"
            stroke="#ef4444"
            strokeDasharray="5 5"
            fill="none"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
