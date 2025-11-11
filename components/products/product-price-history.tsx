"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { getChartColors } from "@/lib/chart-colors"

const data = [
  { date: "Oct", yourPrice: 999, competitorAvg: 1049 },
  { date: "Nov", yourPrice: 999, competitorAvg: 1029 },
  { date: "Dec", yourPrice: 999, competitorAvg: 1019 },
  { date: "Jan", yourPrice: 999, competitorAvg: 999 },
]

export function ProductPriceHistory() {
  const colors = getChartColors()
  
  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Price History</h3>
        <p className="text-sm text-muted-foreground">Your price vs competitor average</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `$${value}`} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--popover-foreground))",
            }}
            formatter={(value: number) => `$${value}`}
          />
          <Legend />
          <Line type="monotone" dataKey="yourPrice" stroke={colors.chart1} strokeWidth={3} name="Your Price" dot={{ fill: colors.chart1, r: 4 }} />
          <Line
            type="monotone"
            dataKey="competitorAvg"
            stroke={colors.chart3}
            strokeWidth={3}
            strokeDasharray="5 5"
            name="Competitor Avg"
            dot={{ fill: colors.chart3, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
