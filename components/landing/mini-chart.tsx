"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { getChartColors } from "@/lib/chart-colors"

const data = [
  { time: "00:00", sales: 45000 },
  { time: "04:00", sales: 52000 },
  { time: "08:00", sales: 68000 },
  { time: "12:00", sales: 85000 },
  { time: "16:00", sales: 92000 },
  { time: "20:00", sales: 78000 },
  { time: "23:59", sales: 95000 },
]

export function MiniChart() {
  const colors = getChartColors()
  
  return (
    <Card className="p-4 bg-secondary/50 border-border">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-foreground mb-1">Sales Today</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">$95,247</span>
          <span className="text-sm text-chart-2">+12.5%</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
              color: "hsl(var(--popover-foreground))",
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Sales"]}
          />
          <Line type="monotone" dataKey="sales" stroke={colors.chart1} strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
