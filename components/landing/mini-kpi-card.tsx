import type React from "react"
import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface MiniKPICardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
}

export function MiniKPICard({ title, value, change, trend, icon }: MiniKPICardProps) {
  return (
    <Card className="p-4 bg-secondary/50 border-border">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">{title}</span>
        <div className="text-muted-foreground">{icon}</div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        <div className={`flex items-center gap-1 text-xs ${trend === "up" ? "text-chart-2" : "text-destructive"}`}>
          {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{change}</span>
        </div>
      </div>
    </Card>
  )
}
