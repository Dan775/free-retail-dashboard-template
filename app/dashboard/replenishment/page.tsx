"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  Sparkles,
} from "lucide-react"
import { ReorderDialog } from "@/components/replenishment/reorder-dialog"

const recommendations = [
  {
    id: 1,
    sku: "APL-IP15P-256",
    name: "iPhone 15 Pro 256GB",
    currentStock: 12,
    reorderPoint: 50,
    suggestedQty: 150,
    confidence: 95,
    leadTime: "14-21 days",
    unitCost: 750,
    totalCost: 112500,
    supplier: "Apple Distribution",
    priority: "critical",
    reason: "Stock below reorder point, high demand detected",
    daysUntilStockout: 0.7,
    avgDailySales: 17,
  },
  {
    id: 2,
    sku: "SAM-GS24-128",
    name: "Samsung Galaxy S24 128GB",
    currentStock: 45,
    reorderPoint: 40,
    suggestedQty: 100,
    confidence: 88,
    leadTime: "10-14 days",
    unitCost: 600,
    totalCost: 60000,
    supplier: "Samsung Electronics",
    priority: "high",
    reason: "Approaching reorder point, steady demand",
    daysUntilStockout: 5.1,
    avgDailySales: 9,
  },
  {
    id: 3,
    sku: "APL-APP-2",
    name: "AirPods Pro 2nd Gen",
    currentStock: 23,
    reorderPoint: 100,
    suggestedQty: 200,
    confidence: 92,
    leadTime: "14-21 days",
    unitCost: 180,
    totalCost: 36000,
    supplier: "Apple Distribution",
    priority: "critical",
    reason: "Well below reorder point, holiday season approaching",
    daysUntilStockout: 1.3,
    avgDailySales: 18,
  },
  {
    id: 4,
    sku: "SAM-SW6-44",
    name: "Samsung Watch 6 44mm",
    currentStock: 8,
    reorderPoint: 30,
    suggestedQty: 75,
    confidence: 85,
    leadTime: "10-14 days",
    unitCost: 240,
    totalCost: 18000,
    supplier: "Samsung Electronics",
    priority: "critical",
    reason: "Critical stock level, increasing demand trend",
    daysUntilStockout: 1.4,
    avgDailySales: 6,
  },
  {
    id: 5,
    sku: "APL-MBP-14",
    name: "MacBook Pro 14 M3 Pro",
    currentStock: 15,
    reorderPoint: 40,
    suggestedQty: 80,
    confidence: 78,
    leadTime: "21-28 days",
    unitCost: 1500,
    totalCost: 120000,
    supplier: "Apple Distribution",
    priority: "high",
    reason: "Below reorder point, long lead time",
    daysUntilStockout: 12.2,
    avgDailySales: 1.2,
  },
  {
    id: 6,
    sku: "SON-WH1000",
    name: "Sony WH-1000XM5",
    currentStock: 67,
    reorderPoint: 50,
    suggestedQty: 100,
    confidence: 82,
    leadTime: "7-10 days",
    unitCost: 280,
    totalCost: 28000,
    supplier: "Sony Corporation",
    priority: "medium",
    reason: "Optimal reorder timing, seasonal demand expected",
    daysUntilStockout: 15.1,
    avgDailySales: 4.4,
  },
]

export default function ReplenishmentPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedRecommendation, setSelectedRecommendation] = useState<(typeof recommendations)[0] | null>(null)

  const filteredRecommendations = recommendations.filter((rec) => {
    const matchesSearch =
      rec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPriority = priorityFilter === "all" || rec.priority === priorityFilter
    return matchesSearch && matchesPriority
  })

  const toggleSelection = (id: number) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const toggleAll = () => {
    if (selectedItems.length === filteredRecommendations.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredRecommendations.map((r) => r.id))
    }
  }

  const totalSelectedCost = recommendations
    .filter((r) => selectedItems.includes(r.id))
    .reduce((sum, r) => sum + r.totalCost, 0)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "high":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20"
      case "medium":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Replenishment</h1>
          <p className="text-muted-foreground">AI-powered reorder recommendations</p>
        </div>
        <Button disabled={selectedItems.length === 0}>
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Create PO for {selectedItems.length} items
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Critical Items</span>
            <AlertTriangle className="w-4 h-4 text-destructive" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            {recommendations.filter((r) => r.priority === "critical").length}
          </div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Recommendations</span>
            <Package className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold text-foreground">{recommendations.length}</div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Avg Confidence</span>
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            {Math.round(recommendations.reduce((sum, r) => sum + r.confidence, 0) / recommendations.length)}%
          </div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Selected Total</span>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold text-foreground">${(totalSelectedCost / 1000).toFixed(0)}k</div>
        </Card>
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
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full md:w-[200px] bg-background">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Recommendations Table */}
      <Card className="bg-card border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="p-4 text-left">
                  <Checkbox
                    checked={selectedItems.length === filteredRecommendations.length}
                    onCheckedChange={toggleAll}
                  />
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Product</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Priority</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Current Stock</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Suggested Qty</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Confidence</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Lead Time</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Total Cost</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecommendations.map((rec) => (
                <tr key={rec.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="p-4">
                    <Checkbox
                      checked={selectedItems.includes(rec.id)}
                      onCheckedChange={() => toggleSelection(rec.id)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <Package className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{rec.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{rec.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className={getPriorityColor(rec.priority)}>
                      {rec.priority}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex flex-col items-end">
                      <span
                        className={`text-sm font-medium ${rec.currentStock < rec.reorderPoint ? "text-destructive" : "text-foreground"}`}
                      >
                        {rec.currentStock}
                      </span>
                      <span className="text-xs text-muted-foreground">{rec.daysUntilStockout.toFixed(1)}d left</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium text-foreground">{rec.suggestedQty}</span>
                      <span className="text-xs text-muted-foreground">units</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium text-chart-2">{rec.confidence}%</span>
                      <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden mt-1">
                        <div className="h-full bg-chart-2" style={{ width: `${rec.confidence}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{rec.leadTime}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium text-foreground">${rec.totalCost.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">${rec.unitCost} each</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedRecommendation(rec)
                        setDialogOpen(true)
                      }}
                    >
                      Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* AI Insights */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Replenishment Insights</h3>
        </div>
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-secondary/50 border border-border">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-chart-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Holiday season preparation</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Based on historical data, demand typically increases by 35% in the next 3 weeks. Consider increasing
                  order quantities for high-velocity items like iPhone 15 Pro and AirPods Pro.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-secondary/50 border border-border">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Critical stockout risk</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  3 products will run out of stock within 2 days if current sales velocity continues. Recommend
                  expedited shipping for critical items.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-secondary/50 border border-border">
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-chart-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Bulk order opportunity</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Apple Distribution offers 5% discount on orders over $150k. Current selected items total $112k.
                  Consider adding MacBook Pro 14 to qualify for discount.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {selectedRecommendation && (
        <ReorderDialog open={dialogOpen} onOpenChange={setDialogOpen} recommendation={selectedRecommendation} />
      )}
    </div>
  )
}
