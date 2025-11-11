import { Card } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

const returns = [
  { date: "2025-01-02", reason: "Defective screen", quantity: 1, status: "Processing" },
  { date: "2025-01-01", reason: "Wrong color", quantity: 1, status: "Refunded" },
  { date: "2024-12-28", reason: "Customer changed mind", quantity: 2, status: "Refunded" },
  { date: "2024-12-25", reason: "Defective battery", quantity: 1, status: "Replaced" },
]

export function ProductReturns() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Recent Returns</h3>
        <p className="text-sm text-muted-foreground">Last 30 days return activity</p>
      </div>
      <div className="space-y-3">
        {returns.map((returnItem, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
            <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4 text-destructive" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-foreground">{returnItem.reason}</p>
                <span className="text-xs text-muted-foreground">{returnItem.date}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>Qty: {returnItem.quantity}</span>
                <span>•</span>
                <span className="text-chart-2">{returnItem.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
