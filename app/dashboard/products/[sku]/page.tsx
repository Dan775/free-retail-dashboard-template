import type { Metadata } from "next";
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProductSalesChart } from "@/components/products/product-sales-chart"
import { ProductInventoryChart } from "@/components/products/product-inventory-chart"
import { ProductPriceHistory } from "@/components/products/product-price-history"
import { ProductReturns } from "@/components/products/product-returns"
import { ProductSupplierInfo } from "@/components/products/product-supplier-info"
import { ProductAIInsights } from "@/components/products/product-ai-insights"
import { Package, DollarSign, TrendingUp, AlertTriangle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export async function generateMetadata({ params }: { params: { sku: string } }): Promise<Metadata> {
  return {
    title: `Product ${params.sku} - Retail Dashboard`,
    description: `View detailed product information, sales trends, inventory levels, and AI insights for ${params.sku}.`,
  };
}

// Mock product data
const product = {
  sku: "APL-IP15P-256",
  name: "iPhone 15 Pro 256GB",
  category: "Phones",
  brand: "Apple",
  description: "Latest flagship smartphone with A17 Pro chip and titanium design",
  currentStock: 12,
  reorderPoint: 50,
  optimalStock: 75,
  price: 999,
  cost: 750,
  margin: 24.9,
  sales30d: 4892,
  revenue30d: 4887108,
  avgDailySales: 163,
  daysOfInventory: 0.07,
}

export default function ProductDetailPage({ params }: { params: { sku: string } }) {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild>
        <Link href="/dashboard/products">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>
      </Button>

      {/* Product Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center">
            <Package className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">{product.name}</h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="font-mono">{product.sku}</span>
              <span>•</span>
              <span>{product.category}</span>
              <span>•</span>
              <span>{product.brand}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Edit Product</Button>
          <Button>Create PO</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Current Stock</span>
            <Package className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-destructive">{product.currentStock}</span>
            <span className="text-sm text-muted-foreground">/ {product.reorderPoint} min</span>
          </div>
          <div className="mt-2 text-xs text-destructive">Below reorder point</div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Price / Margin</span>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">${product.price}</span>
            <span className="text-sm text-chart-2">+{product.margin}%</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Cost: ${product.cost}</div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">30d Revenue</span>
            <TrendingUp className="w-4 h-4 text-chart-2" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">${(product.revenue30d / 1000000).toFixed(2)}M</span>
            <span className="text-sm text-chart-2">+23%</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">{product.sales30d} units sold</div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Days of Inventory</span>
            <AlertTriangle className="w-4 h-4 text-destructive" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-destructive">{product.daysOfInventory}</span>
            <span className="text-sm text-muted-foreground">days</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Avg daily sales: {product.avgDailySales}</div>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductSalesChart />
        <ProductInventoryChart />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductPriceHistory />
        <ProductReturns />
      </div>

      {/* Full Width Sections */}
      <ProductSupplierInfo />
      <ProductAIInsights productName={product.name} />
    </div>
  )
}
