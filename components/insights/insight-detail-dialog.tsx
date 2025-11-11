"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  Archive,
  Share2,
  Calendar,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Package,
  Users,
} from "lucide-react"

interface InsightDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  insight: {
    id: number
    type: string
    category: string
    title: string
    summary: string
    description: string
    confidence: number
    impact: string
    timestamp: string
    evidence: string[]
    recommendations: string[]
    relatedProducts: string[]
    feedback: string | null
  }
}

export function InsightDetailDialog({ open, onOpenChange, insight }: InsightDetailDialogProps) {
  const [feedback, setFeedback] = useState(insight.feedback)
  const [notes, setNotes] = useState("")

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
        return <TrendingUp className="w-6 h-6" />
      case "pricing":
        return <DollarSign className="w-6 h-6" />
      case "inventory":
        return <Package className="w-6 h-6" />
      case "customer":
        return <Users className="w-6 h-6" />
      case "trend":
        return <TrendingUp className="w-6 h-6" />
      case "supplier":
        return <Package className="w-6 h-6" />
      default:
        return <Sparkles className="w-6 h-6" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <div className="flex items-start gap-4 mb-2">
            <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
              {getTypeIcon(insight.type)}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{insight.title}</DialogTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getImpactColor(insight.impact)}>
                  {insight.impact} impact
                </Badge>
                <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
                  {insight.category}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground ml-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(insight.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Confidence Score */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">AI Confidence Score</span>
              </div>
              <span className="text-lg font-bold text-primary">{insight.confidence}%</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${insight.confidence}%` }} />
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Analysis</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
          </div>

          <Separator />

          {/* Evidence */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Supporting Evidence</h4>
            <div className="space-y-2">
              {insight.evidence.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                  <CheckCircle2 className="w-5 h-5 text-chart-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Recommendations */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Recommended Actions</h4>
            <div className="space-y-2">
              {insight.recommendations.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20"
                >
                  <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Products */}
          {insight.relatedProducts.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">Related Products</h4>
                <div className="flex flex-wrap gap-2">
                  {insight.relatedProducts.map((sku, index) => (
                    <Badge key={index} variant="outline" className="bg-secondary text-foreground border-border">
                      {sku}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Notes */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Add Notes</h4>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your thoughts or action items..."
              className="bg-background"
              rows={3}
            />
          </div>

          {/* Feedback */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Was this insight helpful?</h4>
            <div className="flex items-center gap-3">
              <Button
                variant={feedback === "helpful" ? "default" : "outline"}
                size="sm"
                onClick={() => setFeedback("helpful")}
                className="flex-1"
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                Helpful
              </Button>
              <Button
                variant={feedback === "not-helpful" ? "destructive" : "outline"}
                size="sm"
                onClick={() => setFeedback("not-helpful")}
                className="flex-1"
              >
                <ThumbsDown className="w-4 h-4 mr-2" />
                Not Helpful
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex-1 bg-transparent">
              <Archive className="w-4 h-4 mr-2" />
              Archive
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button className="flex-1" onClick={() => onOpenChange(false)}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Mark as Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
