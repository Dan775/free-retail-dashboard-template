import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp, AlertTriangle, DollarSign } from "lucide-react"

const insights = [
  {
    id: 1,
    type: "demand",
    title: "High demand detected",
    description:
      "Sales velocity is 23% higher than forecast. Current stock will last less than 1 day. Recommend immediate reorder of 150 units.",
    confidence: "high",
    impact: "critical",
    icon: TrendingUp,
    action: "Create emergency PO",
  },
  {
    id: 2,
    type: "pricing",
    title: "Pricing opportunity",
    description:
      "Competitors raised prices by average of $50. You can increase price to $1,049 while maintaining competitive position.",
    confidence: "medium",
    impact: "high",
    icon: DollarSign,
    action: "Adjust pricing",
  },
  {
    id: 3,
    type: "quality",
    title: "Return rate increasing",
    description:
      "Return rate increased from 0.8% to 1.2% in last 30 days. Most common reason: defective screen. Consider quality check with supplier.",
    confidence: "high",
    impact: "medium",
    icon: AlertTriangle,
    action: "Contact supplier",
  },
]

export function ProductAIInsights({ productName }: { productName: string }) {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">AI Insights for {productName}</h3>
        </div>
        <p className="text-sm text-muted-foreground">Personalized recommendations based on product performance</p>
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
                      insight.impact === "critical"
                        ? "bg-destructive/10 text-destructive"
                        : insight.impact === "high"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {insight.impact} impact
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                View analysis
              </Button>
              <Button size="sm" className="flex-1">
                {insight.action}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
