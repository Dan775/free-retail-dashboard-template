"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Package,
  Users,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  ChevronRight,
  Calendar,
} from "lucide-react"
import { InsightDetailDialog } from "@/components/insights/insight-detail-dialog"

const insights = [
  {
    id: 1,
    type: "demand",
    category: "Inventory",
    title: "iPhone 15 Pro demand surge detected",
    summary: "Sales velocity increased by 23% above forecast. Current stock will deplete in 0.7 days at current rate.",
    description:
      "Our AI model detected an unexpected surge in iPhone 15 Pro demand starting 3 days ago. Analysis of historical patterns suggests this is related to competitor stockouts and positive social media sentiment following recent software updates. The current inventory of 12 units is critically low.",
    confidence: 95,
    impact: "critical",
    timestamp: "2025-01-03T14:30:00Z",
    evidence: [
      "30-day sales trend shows 23% increase",
      "Competitor Best Buy out of stock since Jan 1",
      "Social media mentions up 45% (positive sentiment)",
      "Current stock: 12 units, avg daily sales: 17 units",
    ],
    recommendations: [
      "Place emergency order for 150 units with expedited shipping",
      "Consider temporary price increase to $1,049 to manage demand",
      "Alert marketing team about opportunity for promotional campaign",
    ],
    relatedProducts: ["APL-IP15P-256"],
    feedback: null,
  },
  {
    id: 2,
    type: "pricing",
    category: "Revenue",
    title: "Pricing opportunity on AirPods Pro",
    summary: "Competitor prices increased 12% on average. Market can support $20 price increase.",
    description:
      "Market analysis shows all major competitors (Best Buy, Amazon, Target, Walmart) have raised AirPods Pro prices by an average of 12% over the past 2 weeks. Your current price of $249 is now $30 below market average. Price elasticity analysis suggests you can increase to $269 with minimal volume impact.",
    confidence: 88,
    impact: "high",
    timestamp: "2025-01-03T10:15:00Z",
    evidence: [
      "Competitor average price: $279 (was $249)",
      "Price elasticity coefficient: -0.9 (low sensitivity)",
      "Historical data: 8% price increase resulted in only 3% volume decrease",
      "Strong demand: 1,834 units sold in last 7 days",
    ],
    recommendations: [
      "Increase price to $269 (8% increase)",
      "Expected revenue impact: +$36,680 per month",
      "Monitor competitor pricing for next 2 weeks",
    ],
    relatedProducts: ["APL-APP-2"],
    feedback: "helpful",
  },
  {
    id: 3,
    type: "inventory",
    category: "Inventory",
    title: "Samsung Galaxy S24 overstock situation",
    summary: "Inventory 3.2x higher than 30-day forecast. Consider promotional pricing.",
    description:
      "Current Samsung Galaxy S24 inventory (45 units) is significantly higher than optimal levels based on recent sales velocity. The product is selling at 9 units per day, giving you 5 days of inventory, but forecast suggests demand will decrease by 15% next week as new models are announced.",
    confidence: 82,
    impact: "medium",
    timestamp: "2025-01-02T16:45:00Z",
    evidence: [
      "Current stock: 45 units, optimal: 35 units",
      "Sales velocity declining: -8% week-over-week",
      "Samsung Galaxy S25 announcement expected Jan 15",
      "Inventory carrying cost: $600/unit",
    ],
    recommendations: [
      "Reduce price by $20 (2.5%) to accelerate sell-through",
      "Create bundle offer with accessories",
      "Target expected revenue increase: +$12,450",
    ],
    relatedProducts: ["SAM-GS24-128"],
    feedback: null,
  },
  {
    id: 4,
    type: "customer",
    category: "Customer Experience",
    title: "Increased return rate on iPhone 15 Pro",
    summary: "Return rate increased from 0.8% to 1.2%. Most common reason: defective screen.",
    description:
      "Quality analysis detected an uptick in iPhone 15 Pro returns over the past 30 days. The return rate increased from the normal 0.8% to 1.2%, with 'defective screen' being the most cited reason (60% of returns). This may indicate a batch quality issue.",
    confidence: 90,
    impact: "medium",
    timestamp: "2025-01-02T09:20:00Z",
    evidence: [
      "Return rate: 1.2% (baseline: 0.8%)",
      "Total returns: 15 units in 30 days",
      "Primary reason: Defective screen (9 units)",
      "Batch correlation: 80% from same supplier shipment",
    ],
    recommendations: [
      "Contact Apple Distribution about potential batch issue",
      "Inspect remaining inventory from same batch",
      "Consider extended warranty offer for affected customers",
    ],
    relatedProducts: ["APL-IP15P-256"],
    feedback: "helpful",
  },
  {
    id: 5,
    type: "trend",
    category: "Market Trends",
    title: "Holiday season demand forecast",
    summary: "Historical data suggests 35% demand increase in next 3 weeks across all categories.",
    description:
      "Seasonal analysis of the past 5 years shows consistent demand patterns during the holiday season. Based on current inventory levels and historical trends, we forecast a 35% increase in overall demand, with highest impact on phones (45% increase) and wearables (40% increase).",
    confidence: 85,
    impact: "high",
    timestamp: "2025-01-01T08:00:00Z",
    evidence: [
      "5-year historical average: +35% demand increase",
      "Current inventory: 15% below optimal for seasonal demand",
      "Competitor inventory levels: 20% lower than last year",
      "Consumer confidence index: +8% year-over-year",
    ],
    recommendations: [
      "Increase inventory orders by 40% for high-velocity items",
      "Prepare marketing campaigns for holiday promotions",
      "Consider hiring temporary staff for increased order volume",
    ],
    relatedProducts: ["APL-IP15P-256", "APL-APP-2", "SAM-SW6-44"],
    feedback: null,
  },
  {
    id: 6,
    type: "supplier",
    category: "Supply Chain",
    title: "Supplier lead time increasing",
    summary: "Apple Distribution lead time increased from 14-21 days to 21-28 days.",
    description:
      "Analysis of recent purchase orders shows Apple Distribution lead times have increased by approximately 7 days over the past 2 months. This may impact your ability to respond quickly to demand changes, especially for high-velocity products like iPhone 15 Pro.",
    confidence: 78,
    impact: "medium",
    timestamp: "2024-12-30T11:30:00Z",
    evidence: [
      "Average lead time: 24 days (was 17 days)",
      "Last 5 orders: all exceeded original estimates",
      "Supplier communication: increased demand from other retailers",
      "Alternative suppliers available with 14-day lead time",
    ],
    recommendations: [
      "Increase safety stock levels by 20% for Apple products",
      "Explore alternative suppliers for critical items",
      "Adjust reorder points to account for longer lead times",
    ],
    relatedProducts: ["APL-IP15P-256", "APL-APP-2", "APL-MBP-14"],
    feedback: "not-helpful",
  },
]

export default function InsightsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [impactFilter, setImpactFilter] = useState("all")
  const [selectedInsight, setSelectedInsight] = useState<(typeof insights)[0] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const filteredInsights = insights.filter((insight) => {
    const matchesSearch =
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || insight.category === categoryFilter
    const matchesImpact = impactFilter === "all" || insight.impact === impactFilter
    return matchesSearch && matchesCategory && matchesImpact
  })

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "critical":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "high":
        return "bg-primary/10 text-primary border-primary/20"
      case "medium":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "demand":
        return <TrendingUp className="w-5 h-5" />
      case "pricing":
        return <DollarSign className="w-5 h-5" />
      case "inventory":
        return <Package className="w-5 h-5" />
      case "customer":
        return <Users className="w-5 h-5" />
      case "trend":
        return <TrendingUp className="w-5 h-5" />
      case "supplier":
        return <Package className="w-5 h-5" />
      default:
        return <Sparkles className="w-5 h-5" />
    }
  }

  const helpfulCount = insights.filter((i) => i.feedback === "helpful").length
  const notHelpfulCount = insights.filter((i) => i.feedback === "not-helpful").length
  const avgConfidence = Math.round(insights.reduce((sum, i) => sum + i.confidence, 0) / insights.length)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">AI Insights</h1>
        <p className="text-muted-foreground">LLM-generated business insights with evidence and recommendations</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Insights</span>
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground">{insights.length}</div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Critical Items</span>
            <AlertTriangle className="w-4 h-4 text-destructive" />
          </div>
          <div className="text-2xl font-bold text-destructive">
            {insights.filter((i) => i.impact === "critical").length}
          </div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Avg Confidence</span>
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground">{avgConfidence}%</div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Helpful Rate</span>
            <ThumbsUp className="w-4 h-4 text-chart-2" />
          </div>
          <div className="text-2xl font-bold text-chart-2">
            {Math.round((helpfulCount / (helpfulCount + notHelpfulCount)) * 100)}%
          </div>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Insights</TabsTrigger>
          <TabsTrigger value="actionable">Actionable</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Filters */}
          <Card className="p-4 bg-card border-border">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[200px] bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Inventory">Inventory</SelectItem>
                  <SelectItem value="Revenue">Revenue</SelectItem>
                  <SelectItem value="Customer Experience">Customer Experience</SelectItem>
                  <SelectItem value="Market Trends">Market Trends</SelectItem>
                  <SelectItem value="Supply Chain">Supply Chain</SelectItem>
                </SelectContent>
              </Select>
              <Select value={impactFilter} onValueChange={setImpactFilter}>
                <SelectTrigger className="w-full md:w-[200px] bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Impact Levels</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Insights List */}
          <div className="space-y-4">
            {filteredInsights.map((insight) => (
              <Card
                key={insight.id}
                className="p-6 bg-card border-border hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedInsight(insight)
                  setDialogOpen(true)
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                    {getTypeIcon(insight.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-foreground">{insight.title}</h3>
                          <Badge variant="outline" className={getImpactColor(insight.impact)}>
                            {insight.impact}
                          </Badge>
                          <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
                            {insight.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{insight.summary}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">Confidence:</span>
                            <span className="font-medium text-chart-2">{insight.confidence}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {new Date(insight.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          {insight.feedback && (
                            <div className="flex items-center gap-2">
                              {insight.feedback === "helpful" ? (
                                <ThumbsUp className="w-4 h-4 text-chart-2" />
                              ) : (
                                <ThumbsDown className="w-4 h-4 text-destructive" />
                              )}
                              <span className="text-muted-foreground capitalize">{insight.feedback}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="actionable">
          <Card className="p-12 bg-card border-border text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No actionable insights</h3>
            <p className="text-sm text-muted-foreground">
              Insights you mark as actionable will appear here for easy tracking
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="archived">
          <Card className="p-12 bg-card border-border text-center">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No archived insights</h3>
            <p className="text-sm text-muted-foreground">
              Insights you archive will be moved here for future reference
            </p>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedInsight && (
        <InsightDetailDialog open={dialogOpen} onOpenChange={setDialogOpen} insight={selectedInsight} />
      )}
    </div>
  )
}
