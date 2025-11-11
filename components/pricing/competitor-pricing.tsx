import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

const competitors = [
  {
    product: "iPhone 15 Pro 256GB",
    yourPrice: 999,
    competitors: [
      { name: "Best Buy", price: 1049, change: "+5%", trend: "up" },
      { name: "Amazon", price: 1029, change: "+3%", trend: "up" },
      { name: "Target", price: 1099, change: "+10%", trend: "up" },
      { name: "Walmart", price: 1019, change: "+2%", trend: "up" },
    ],
    avgCompetitorPrice: 1049,
    position: "below",
  },
  {
    product: "Samsung Galaxy S24 128GB",
    yourPrice: 799,
    competitors: [
      { name: "Best Buy", price: 789, change: "0%", trend: "neutral" },
      { name: "Amazon", price: 779, change: "-3%", trend: "down" },
      { name: "Target", price: 799, change: "0%", trend: "neutral" },
      { name: "Walmart", price: 789, change: "-1%", trend: "down" },
    ],
    avgCompetitorPrice: 789,
    position: "above",
  },
  {
    product: "AirPods Pro 2nd Gen",
    yourPrice: 249,
    competitors: [
      { name: "Best Buy", price: 279, change: "+12%", trend: "up" },
      { name: "Amazon", price: 269, change: "+8%", trend: "up" },
      { name: "Target", price: 289, change: "+16%", trend: "up" },
      { name: "Walmart", price: 279, change: "+12%", trend: "up" },
    ],
    avgCompetitorPrice: 279,
    position: "below",
  },
]

export function CompetitorPricing() {
  return (
    <div className="space-y-6">
      {competitors.map((item, index) => (
        <Card key={index} className="p-6 bg-card border-border">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{item.product}</h3>
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Your Price: </span>
                  <span className="text-lg font-bold text-foreground">${item.yourPrice}</span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Competitor Avg: </span>
                  <span className="text-lg font-bold text-foreground">${item.avgCompetitorPrice}</span>
                </div>
              </div>
            </div>
            <Badge
              variant="outline"
              className={
                item.position === "below"
                  ? "bg-chart-2/10 text-chart-2 border-chart-2/20"
                  : "bg-chart-3/10 text-chart-3 border-chart-3/20"
              }
            >
              {item.position === "below" ? "Below market" : "Above market"}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {item.competitors.map((competitor, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{competitor.name}</span>
                  <div
                    className={`flex items-center gap-1 text-xs ${
                      competitor.trend === "up"
                        ? "text-chart-2"
                        : competitor.trend === "down"
                          ? "text-destructive"
                          : "text-muted-foreground"
                    }`}
                  >
                    {competitor.trend === "up" ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : competitor.trend === "down" ? (
                      <TrendingDown className="w-3 h-3" />
                    ) : (
                      <Minus className="w-3 h-3" />
                    )}
                    <span>{competitor.change}</span>
                  </div>
                </div>
                <div className="text-xl font-bold text-foreground">${competitor.price}</div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}
