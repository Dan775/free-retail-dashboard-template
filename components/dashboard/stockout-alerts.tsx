import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Package } from "lucide-react"

const alerts = [
  { product: "iPhone 15 Pro", sku: "APL-IP15P-256", stock: 12, reorderPoint: 50, severity: "high" },
  { product: "AirPods Pro", sku: "APL-APP-2", stock: 23, reorderPoint: 100, severity: "high" },
  { product: "Samsung Watch 6", sku: "SAM-SW6-44", stock: 8, reorderPoint: 30, severity: "critical" },
  { product: "iPad Air", sku: "APL-IPA-11", stock: 34, reorderPoint: 75, severity: "medium" },
  { product: "MacBook Pro 14", sku: "APL-MBP-14", stock: 15, reorderPoint: 40, severity: "high" },
]

export function StockoutAlerts() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Stockout Alerts</h3>
        <p className="text-sm text-muted-foreground">Products below reorder point</p>
      </div>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.sku}
            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-colors"
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                alert.severity === "critical"
                  ? "bg-destructive/10"
                  : alert.severity === "high"
                    ? "bg-chart-3/10"
                    : "bg-chart-2/10"
              }`}
            >
              <AlertTriangle
                className={`w-5 h-5 ${
                  alert.severity === "critical"
                    ? "text-destructive"
                    : alert.severity === "high"
                      ? "text-chart-3"
                      : "text-chart-2"
                }`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{alert.product}</p>
              <p className="text-xs text-muted-foreground">
                {alert.stock} units left • Reorder at {alert.reorderPoint}
              </p>
            </div>
            <Button size="sm" variant="outline">
              <Package className="w-4 h-4 mr-2" />
              Reorder
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}
