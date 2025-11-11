"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { getChartColors } from "@/lib/chart-colors"

const data = [
  { date: "Dec 1", sales: 145 },
  { date: "Dec 5", sales: 168 },
  { date: "Dec 10", sales: 152 },
  { date: "Dec 15", sales: 189 },
  { date: "Dec 20", sales: 201 },
  { date: "Dec 25", sales: 178 },
  { date: "Dec 31", sales: 163 },
]

export function ProductSalesChart() {
  const colors = getChartColors()
  
  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Sales Trend</h3>
        <p className="text-sm text-muted-foreground">Daily sales over the last 30 days</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
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
            formatter={(value: number) => [`${value} units`, "Sales"]}
          />
          <Line type="monotone" dataKey="sales" stroke={colors.chart1} strokeWidth={3} dot={{ fill: colors.chart1, r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
