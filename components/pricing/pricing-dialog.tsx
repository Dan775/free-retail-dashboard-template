"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Sparkles, TrendingUp, Target, AlertTriangle, CheckCircle2 } from "lucide-react"

interface PricingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  suggestion: {
    sku: string
    name: string
    currentPrice: number
    suggestedPrice: number
    change: number
    changePercent: number
    confidence: number
    reason: string
    impact: {
      revenueChange: string
      marginChange: string
      volumeChange: string
    }
    competitorAvg: number
    elasticity: number
  }
}

export function PricingDialog({ open, onOpenChange, suggestion }: PricingDialogProps) {
  const [newPrice, setNewPrice] = useState(suggestion.suggestedPrice)
  const [notes, setNotes] = useState("")

  const priceChange = newPrice - suggestion.currentPrice
  const priceChangePercent = ((priceChange / suggestion.currentPrice) * 100).toFixed(1)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl">Update Pricing</DialogTitle>
          <DialogDescription>Review and adjust the AI recommendation before applying</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{suggestion.name}</h3>
            <p className="text-sm text-muted-foreground font-mono">{suggestion.sku}</p>
          </div>

          <Separator />

          {/* AI Recommendation */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-3 mb-3">
              <Sparkles className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">AI Recommendation</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{suggestion.reason}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Confidence:</span>
              <span className="font-medium text-chart-2">{suggestion.confidence}%</span>
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden ml-2">
                <div className="h-full bg-chart-2" style={{ width: `${suggestion.confidence}%` }} />
              </div>
            </div>
          </div>

          {/* Current vs Suggested */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
              <p className="text-sm text-muted-foreground mb-2">Current Price</p>
              <p className="text-3xl font-bold text-foreground">${suggestion.currentPrice}</p>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-2">Suggested Price</p>
              <p className="text-3xl font-bold text-primary">${suggestion.suggestedPrice}</p>
            </div>
          </div>

          {/* New Price Input */}
          <div>
            <Label htmlFor="newPrice" className="text-sm font-medium text-foreground mb-2 block">
              New Price
            </Label>
            <Input
              id="newPrice"
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(Number(e.target.value))}
              className="bg-background text-lg font-semibold"
              step="0.01"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Change: {priceChange > 0 ? "+" : ""}${priceChange.toFixed(2)} ({priceChange > 0 ? "+" : ""}
              {priceChangePercent}%)
            </p>
          </div>

          {/* Expected Impact */}
          <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Expected Impact</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Revenue</p>
                <p className="text-lg font-bold text-chart-2">{suggestion.impact.revenueChange}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Margin</p>
                <p className="text-lg font-bold text-foreground">{suggestion.impact.marginChange}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Volume</p>
                <p className="text-lg font-bold text-foreground">{suggestion.impact.volumeChange}</p>
              </div>
            </div>
          </div>

          {/* Market Context */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Competitor Average</span>
              </div>
              <p className="text-2xl font-bold text-foreground">${suggestion.competitorAvg}</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Price Elasticity</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{suggestion.elasticity}</p>
            </div>
          </div>

          {/* Warning */}
          {Math.abs(priceChange) > Math.abs(suggestion.change) * 1.5 && (
            <div className="p-4 rounded-lg bg-chart-3/10 border border-chart-3/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-chart-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Large price change detected</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your price change is significantly different from the AI recommendation. Consider the potential
                    impact on demand and revenue.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="text-sm font-medium text-foreground mb-2 block">
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this pricing change..."
              className="bg-background"
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={() => onOpenChange(false)}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Apply Price Change
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
