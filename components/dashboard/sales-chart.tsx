"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { getChartColors } from "@/lib/chart-colors"

const data = [
  { date: "Jan 1", pos: 45000, web: 28000, marketplace: 15000 },
  { date: "Jan 2", pos: 52000, web: 32000, marketplace: 18000 },
  { date: "Jan 3", pos: 48000, web: 29000, marketplace: 16000 },
  { date: "Jan 4", pos: 61000, web: 38000, marketplace: 22000 },
  { date: "Jan 5", pos: 58000, web: 35000, marketplace: 20000 },
  { date: "Jan 6", pos: 65000, web: 42000, marketplace: 24000 },
  { date: "Jan 7", pos: 72000, web: 48000, marketplace: 28000 },
]

export function SalesChart() {
  const colors = getChartColors()
  
  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Sales by Channel</h3>
        <p className="text-sm text-muted-foreground">Last 7 days performance</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
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
          <Line type="monotone" dataKey="pos" stroke={colors.chart1} strokeWidth={3} name="POS" dot={{ fill: colors.chart1, r: 4 }} />
          <Line type="monotone" dataKey="web" stroke={colors.chart2} strokeWidth={3} name="Web" dot={{ fill: colors.chart2, r: 4 }} />
          <Line type="monotone" dataKey="marketplace" stroke={colors.chart3} strokeWidth={3} name="Marketplace" dot={{ fill: colors.chart3, r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
