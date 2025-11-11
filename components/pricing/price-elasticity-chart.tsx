"use client"

import { Card } from "@/components/ui/card"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { getChartColors } from "@/lib/chart-colors"

const data = [
  { price: 899, demand: 220, product: "iPhone 15 Pro" },
  { price: 949, demand: 195, product: "iPhone 15 Pro" },
  { price: 999, demand: 163, product: "iPhone 15 Pro" },
  { price: 1049, demand: 142, product: "iPhone 15 Pro" },
  { price: 1099, demand: 118, product: "iPhone 15 Pro" },
]

export function PriceElasticityChart() {
  const colors = getChartColors()
  
  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Price Elasticity Analysis</h3>
        <p className="text-sm text-muted-foreground">Relationship between price changes and demand for iPhone 15 Pro</p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            type="number"
            dataKey="price"
            name="Price"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => `$${value}`}
          />
          <YAxis
            type="number"
            dataKey="demand"
            name="Daily Demand"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--popover-foreground))",
            }}
            formatter={(value: number, name: string) => {
              if (name === "Price") return `$${value}`
              return `${value} units/day`
            }}
          />
          <Legend />
          <Scatter name="Price vs Demand" data={data} fill={colors.chart1} />
        </ScatterChart>
      </ResponsiveContainer>
      <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground mb-2">Elasticity Coefficient: -1.2</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A 1% price increase results in approximately 1.2% decrease in demand. This indicates moderate price
              sensitivity. Current price point ($999) is near optimal for revenue maximization.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
