import type React from "react"
import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface KPICardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
  sparklineData: number[]
}

export function KPICard({ title, value, change, trend, icon, sparklineData }: KPICardProps) {
  const max = Math.max(...sparklineData)
  const min = Math.min(...sparklineData)
  const range = max - min

  return (
    <Card className="p-4 bg-card border-border hover:border-primary/50 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">{title}</span>
        <div className="text-muted-foreground">{icon}</div>
      </div>
      <div className="mb-3">
        <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
        <div className={`flex items-center gap-1 text-sm ${trend === "up" ? "text-chart-2" : "text-destructive"}`}>
          {trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{change}</span>
        </div>
      </div>
      {/* Sparkline */}
      <div className="h-12 flex items-end gap-0.5">
        {sparklineData.map((value, i) => {
          const height = ((value - min) / range) * 100
          return (
            <div
              key={i}
              className="flex-1 bg-primary/20 rounded-sm transition-all hover:bg-primary/40"
              style={{ height: `${height}%` }}
            />
          )
        })}
      </div>
    </Card>
  )
}
