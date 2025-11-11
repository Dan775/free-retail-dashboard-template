import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp, AlertTriangle, DollarSign, ArrowRight } from "lucide-react"

const insights = [
  {
    id: 1,
    type: "demand",
    title: "Increased demand for iPhone 15 Pro",
    description:
      "Sales velocity is 23% higher than forecast. Consider increasing order quantity by 150 units to prevent stockouts during holiday season.",
    confidence: "high",
    impact: "high",
    icon: TrendingUp,
    evidence: "Based on 30-day sales trend and seasonal patterns",
  },
  {
    id: 2,
    type: "pricing",
    title: "Pricing opportunity on Samsung Galaxy S24",
    description:
      "Competitor prices increased by 8%. You can raise price by $50 while maintaining competitive position and increase margin by 4.2%.",
    confidence: "medium",
    impact: "medium",
    icon: DollarSign,
    evidence: "Based on competitor analysis and price elasticity data",
  },
  {
    id: 3,
    type: "inventory",
    title: "Overstock alert: AirPods Pro",
    description:
      "Current inventory is 3.2x higher than 30-day forecast. Consider promotional pricing or bundle offers to accelerate sell-through.",
    confidence: "high",
    impact: "medium",
    icon: AlertTriangle,
    evidence: "Based on inventory turnover and demand forecast",
  },
]

export function RecentInsights() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">AI Insights</h3>
          <p className="text-sm text-muted-foreground">Latest recommendations from your AI assistant</p>
        </div>
        <Button variant="outline" size="sm">
          View all <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <insight.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-foreground">{insight.title}</h4>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      insight.confidence === "high" ? "bg-chart-2/10 text-chart-2" : "bg-chart-3/10 text-chart-3"
                    }`}
                  >
                    {insight.confidence} confidence
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      insight.impact === "high" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {insight.impact} impact
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">{insight.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="w-3 h-3" />
                  <span>{insight.evidence}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                View details
              </Button>
              <Button size="sm" className="flex-1">
                Take action
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
