import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

const products = [
  { name: "iPhone 15 Pro", sku: "APL-IP15P-256", sales: 1247, revenue: 1246753, trend: "up", change: "+23%" },
  { name: "Samsung Galaxy S24", sku: "SAM-GS24-128", sales: 892, revenue: 713600, trend: "up", change: "+15%" },
  { name: "MacBook Air M3", sku: "APL-MBA-M3", sales: 456, revenue: 547200, trend: "up", change: "+8%" },
  { name: "AirPods Pro", sku: "APL-APP-2", sales: 1834, revenue: 458500, trend: "down", change: "-5%" },
  { name: "iPad Pro 12.9", sku: "APL-IPP-129", sales: 234, revenue: 280800, trend: "up", change: "+12%" },
]

export function TopProducts() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Top Products</h3>
        <p className="text-sm text-muted-foreground">Best performers this week</p>
      </div>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={product.sku} className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-sm font-medium text-foreground">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
              <p className="text-xs text-muted-foreground">{product.sku}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">${product.revenue.toLocaleString()}</p>
              <div
                className={`flex items-center gap-1 text-xs ${product.trend === "up" ? "text-chart-2" : "text-destructive"}`}
              >
                {product.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span>{product.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
