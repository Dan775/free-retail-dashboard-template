import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import Image from "next/image"

interface Product {
  id: string
  name: string
  category: string
  sales: number
  revenue: string
  change: number
  trend: "up" | "down"
  image: string
}

const topProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    category: "Electronics",
    sales: 1247,
    revenue: "$124,700",
    change: 18.5,
    trend: "up",
    image: "/wireless-headphones.png",
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    category: "Apparel",
    sales: 2156,
    revenue: "$64,680",
    change: 12.3,
    trend: "up",
    image: "/cotton-tshirt.png",
  },
  {
    id: "3",
    name: "Stainless Steel Water Bottle",
    category: "Home & Kitchen",
    sales: 1834,
    revenue: "$55,020",
    change: -5.2,
    trend: "down",
    image: "/reusable-water-bottle.png",
  },
  {
    id: "4",
    name: "Yoga Mat Pro",
    category: "Sports & Fitness",
    sales: 892,
    revenue: "$44,600",
    change: 24.1,
    trend: "up",
    image: "/rolled-yoga-mat.png",
  },
  {
    id: "5",
    name: "Smart Watch Series 5",
    category: "Electronics",
    sales: 567,
    revenue: "$113,400",
    change: 8.7,
    trend: "up",
    image: "/smartwatch-lifestyle.png",
  },
]

export function TopProducts() {
  return (
    <Card className="p-6 bg-secondary/50 border-border">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">Top Products</h3>
        <p className="text-sm text-muted-foreground">Best performing items this month</p>
      </div>
      <div className="space-y-4">
        {topProducts.map((product, index) => (
          <div key={product.id} className="flex items-center gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="text-sm font-medium text-muted-foreground w-6">{index + 1}</span>
              <div className="w-12 h-12 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground">{product.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 flex-shrink-0">
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{product.revenue}</p>
                <p className="text-xs text-muted-foreground">{product.sales.toLocaleString()} sold</p>
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium min-w-[60px] justify-end ${
                  product.trend === "up" ? "text-chart-2" : "text-destructive"
                }`}
              >
                {product.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span>{Math.abs(product.change)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
