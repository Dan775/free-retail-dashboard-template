"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ArrowUpDown, Package, TrendingUp, TrendingDown, ChevronLeft, ChevronRight } from "lucide-react"

// Note: Metadata cannot be exported from client components
// This will be handled by the layout or parent component

const products = [
  {
    sku: "APL-IP15P-256",
    name: "iPhone 15 Pro 256GB",
    category: "Phones",
    stock: 12,
    reorderPoint: 50,
    price: 999,
    cost: 750,
    sales7d: 1247,
    revenue7d: 1246753,
    trend: "up",
    change: "+23%",
  },
  {
    sku: "SAM-GS24-128",
    name: "Samsung Galaxy S24 128GB",
    category: "Phones",
    stock: 45,
    reorderPoint: 40,
    price: 799,
    cost: 600,
    sales7d: 892,
    revenue7d: 713600,
    trend: "up",
    change: "+15%",
  },
  {
    sku: "APL-MBA-M3",
    name: "MacBook Air M3",
    category: "Laptops",
    stock: 23,
    reorderPoint: 20,
    price: 1199,
    cost: 900,
    sales7d: 456,
    revenue7d: 547200,
    trend: "up",
    change: "+8%",
  },
  {
    sku: "APL-APP-2",
    name: "AirPods Pro 2nd Gen",
    category: "Accessories",
    stock: 23,
    reorderPoint: 100,
    price: 249,
    cost: 180,
    sales7d: 1834,
    revenue7d: 458500,
    trend: "down",
    change: "-5%",
  },
  {
    sku: "APL-IPP-129",
    name: "iPad Pro 12.9 M2",
    category: "Tablets",
    stock: 34,
    reorderPoint: 30,
    price: 1199,
    cost: 900,
    sales7d: 234,
    revenue7d: 280800,
    trend: "up",
    change: "+12%",
  },
  {
    sku: "SAM-SW6-44",
    name: "Samsung Watch 6 44mm",
    category: "Wearables",
    stock: 8,
    reorderPoint: 30,
    price: 329,
    cost: 240,
    sales7d: 567,
    revenue7d: 186543,
    trend: "up",
    change: "+18%",
  },
  {
    sku: "APL-MBP-14",
    name: "MacBook Pro 14 M3 Pro",
    category: "Laptops",
    stock: 15,
    reorderPoint: 40,
    price: 1999,
    cost: 1500,
    sales7d: 123,
    revenue7d: 245877,
    trend: "up",
    change: "+6%",
  },
  {
    sku: "SON-WH1000",
    name: "Sony WH-1000XM5",
    category: "Accessories",
    stock: 67,
    reorderPoint: 50,
    price: 399,
    cost: 280,
    sales7d: 445,
    revenue7d: 177555,
    trend: "down",
    change: "-3%",
  },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Products</h1>
        <p className="text-muted-foreground">Manage your product catalog and inventory</p>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-card border-border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[200px] bg-background">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Phones">Phones</SelectItem>
              <SelectItem value="Tablets">Tablets</SelectItem>
              <SelectItem value="Laptops">Laptops</SelectItem>
              <SelectItem value="Accessories">Accessories</SelectItem>
              <SelectItem value="Wearables">Wearables</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </div>
      </Card>

      {/* Products Table */}
      <Card className="bg-card border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Product</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">SKU</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Category</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Stock</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Price</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">7d Sales</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">7d Revenue</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Trend</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr key={product.sku} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <Package className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground font-mono">{product.sku}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{product.category}</span>
                  </td>
                  <td className="p-4 text-right">
                    <span
                      className={`text-sm font-medium ${
                        product.stock < product.reorderPoint ? "text-destructive" : "text-foreground"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-sm text-foreground">${product.price}</span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-sm text-foreground">{product.sales7d}</span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-sm font-medium text-foreground">${product.revenue7d.toLocaleString()}</span>
                  </td>
                  <td className="p-4 text-right">
                    <div
                      className={`inline-flex items-center gap-1 text-sm ${product.trend === "up" ? "text-chart-2" : "text-destructive"}`}
                    >
                      {product.trend === "up" ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span>{product.change}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/dashboard/products/${product.sku}`}>View</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
