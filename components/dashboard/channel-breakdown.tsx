"use client"

import { Card } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { getChartColors } from "@/lib/chart-colors"

export function ChannelBreakdown() {
  const colors = getChartColors()
  
  const data = [
    { name: "POS", value: 412000, color: colors.chart1 },
    { name: "Web Orders", value: 282000, color: colors.chart2 },
    { name: "Marketplace", value: 143000, color: colors.chart3 },
    { name: "B2B", value: 95000, color: colors.chart4 },
  ]

  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Revenue by Channel</h3>
        <p className="text-sm text-muted-foreground">Distribution across sales channels</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={100} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--popover-foreground))",
            }}
            formatter={(value: number) => `$${value.toLocaleString()}`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}
