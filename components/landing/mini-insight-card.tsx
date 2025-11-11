import { Card } from "@/components/ui/card"
import { Sparkles, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MiniInsightCard() {
  return (
    <Card className="p-4 bg-secondary/50 border-border">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-medium text-foreground">AI Insight</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-chart-2/10 text-chart-2">High confidence</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            iPhone 15 Pro demand is 23% higher than forecast. Consider increasing order quantity by 150 units to prevent
            stockouts during holiday season.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
        <TrendingUp className="w-3 h-3" />
        <span>Based on 30-day sales trend and seasonal patterns</span>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
          View details
        </Button>
        <Button size="sm" className="flex-1">
          Create PO
        </Button>
      </div>
    </Card>
  )
}
