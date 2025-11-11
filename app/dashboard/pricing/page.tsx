"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, TrendingUp, TrendingDown, DollarSign, Target, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react"
import { PriceElasticityChart } from "@/components/pricing/price-elasticity-chart"
import { CompetitorPricing } from "@/components/pricing/competitor-pricing"
import { PricingDialog } from "@/components/pricing/pricing-dialog"

const pricingSuggestions = [
  {
    id: 1,
    sku: "APL-IP15P-256",
    name: "iPhone 15 Pro 256GB",
    currentPrice: 999,
    suggestedPrice: 1049,
    change: 50,
    changePercent: 5.0,
    confidence: 92,
    reason: "Competitor prices increased by 8%. Market can support higher price.",
    impact: {
      revenueChange: "+$61,350",
      marginChange: "+4.2%",
      volumeChange: "-3.5%",
    },
    competitorAvg: 1069,
    marketPosition: "below",
    elasticity: -1.2,
    priority: "high",
  },
  {
    id: 2,
    sku: "SAM-GS24-128",
    name: "Samsung Galaxy S24 128GB",
    currentPrice: 799,
    suggestedPrice: 779,
    change: -20,
    changePercent: -2.5,
    confidence: 85,
    reason: "High inventory levels. Price reduction will accelerate sell-through.",
    impact: {
      revenueChange: "+$12,450",
      marginChange: "-1.8%",
      volumeChange: "+18.2%",
    },
    competitorAvg: 789,
    marketPosition: "above",
    elasticity: -2.1,
    priority: "medium",
  },
  {
    id: 3,
    sku: "APL-APP-2",
    name: "AirPods Pro 2nd Gen",
    currentPrice: 249,
    suggestedPrice: 269,
    change: 20,
    changePercent: 8.0,
    confidence: 88,
    reason: "Strong demand and limited supply. Optimal time for price increase.",
    impact: {
      revenueChange: "+$36,680",
      marginChange: "+6.1%",
      volumeChange: "-5.2%",
    },
    competitorAvg: 279,
    marketPosition: "below",
    elasticity: -0.9,
    priority: "high",
  },
  {
    id: 4,
    sku: "SON-WH1000",
    name: "Sony WH-1000XM5",
    currentPrice: 399,
    suggestedPrice: 399,
    change: 0,
    changePercent: 0,
    confidence: 95,
    reason: "Current price is optimal. No change recommended.",
    impact: {
      revenueChange: "$0",
      marginChange: "0%",
      volumeChange: "0%",
    },
    competitorAvg: 399,
    marketPosition: "optimal",
    elasticity: -1.5,
    priority: "low",
  },
]

export default function PricingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState<(typeof pricingSuggestions)[0] | null>(null)

  const filteredSuggestions = pricingSuggestions.filter((sug) => {
    const matchesSearch =
      sug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sug.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPriority = priorityFilter === "all" || sug.priority === priorityFilter
    return matchesSearch && matchesPriority
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-primary/10 text-primary border-primary/20"
      case "medium":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dynamic Pricing</h1>
        <p className="text-muted-foreground">AI-powered pricing recommendations and competitor analysis</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Active Suggestions</span>
            <Target className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            {pricingSuggestions.filter((s) => s.change !== 0).length}
          </div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Potential Revenue</span>
            <TrendingUp className="w-4 h-4 text-chart-2" />
          </div>
          <div className="text-2xl font-bold text-chart-2">+$110k</div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Avg Confidence</span>
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            {Math.round(pricingSuggestions.reduce((sum, s) => sum + s.confidence, 0) / pricingSuggestions.length)}%
          </div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Price Increases</span>
            <TrendingUp className="w-4 h-4 text-chart-2" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            {pricingSuggestions.filter((s) => s.change > 0).length}
          </div>
        </Card>
      </div>

      <Tabs defaultValue="suggestions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="suggestions">Pricing Suggestions</TabsTrigger>
          <TabsTrigger value="elasticity">Price Elasticity</TabsTrigger>
          <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions" className="space-y-6">
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
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Suggestions List */}
          <div className="space-y-4">
            {filteredSuggestions.map((suggestion) => (
              <Card key={suggestion.id} className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{suggestion.name}</h3>
                      <Badge variant="outline" className={getPriorityColor(suggestion.priority)}>
                        {suggestion.priority}
                      </Badge>
                      {suggestion.change === 0 && (
                        <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/20">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Optimal
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground font-mono mb-3">{suggestion.sku}</p>
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-primary mt-0.5" />
                      <p className="text-sm text-muted-foreground leading-relaxed">{suggestion.reason}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedSuggestion(suggestion)
                      setDialogOpen(true)
                    }}
                    disabled={suggestion.change === 0}
                  >
                    Review
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Current vs Suggested Price */}
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Price Change</span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xl font-bold text-foreground">${suggestion.currentPrice}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="text-xl font-bold text-primary">${suggestion.suggestedPrice}</span>
                    </div>
                    <div
                      className={`flex items-center gap-1 text-sm ${suggestion.change > 0 ? "text-chart-2" : suggestion.change < 0 ? "text-destructive" : "text-muted-foreground"}`}
                    >
                      {suggestion.change > 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : suggestion.change < 0 ? (
                        <TrendingDown className="w-4 h-4" />
                      ) : null}
                      <span>
                        {suggestion.change > 0 ? "+" : ""}
                        {suggestion.changePercent}%
                      </span>
                    </div>
                  </div>

                  {/* Revenue Impact */}
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Revenue Impact</span>
                    </div>
                    <div className="text-xl font-bold text-chart-2 mb-1">{suggestion.impact.revenueChange}</div>
                    <div className="text-sm text-muted-foreground">Margin: {suggestion.impact.marginChange}</div>
                  </div>

                  {/* Market Position */}
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">vs Competitors</span>
                    </div>
                    <div className="text-xl font-bold text-foreground mb-1">${suggestion.competitorAvg}</div>
                    <div className="text-sm text-muted-foreground capitalize">{suggestion.marketPosition} market</div>
                  </div>

                  {/* Confidence */}
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Confidence</span>
                    </div>
                    <div className="text-xl font-bold text-primary mb-2">{suggestion.confidence}%</div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${suggestion.confidence}%` }} />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* AI Insights */}
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Pricing Insights</h3>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-chart-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Market conditions favorable</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Overall market prices increased by 4.2% this month. Consider implementing suggested price
                      increases to maintain competitive margins.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-chart-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Price sensitivity detected</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Samsung Galaxy S24 shows high price elasticity (-2.1). Small price reduction could significantly
                      boost volume and total revenue.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="elasticity">
          <PriceElasticityChart />
        </TabsContent>

        <TabsContent value="competitors">
          <CompetitorPricing />
        </TabsContent>
      </Tabs>

      {selectedSuggestion && (
        <PricingDialog open={dialogOpen} onOpenChange={setDialogOpen} suggestion={selectedSuggestion} />
      )}
    </div>
  )
}
