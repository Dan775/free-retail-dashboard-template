"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, TrendingUp, Clock, Building2, Sparkles, CheckCircle2 } from "lucide-react"

interface ReorderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  recommendation: {
    sku: string
    name: string
    currentStock: number
    suggestedQty: number
    confidence: number
    leadTime: string
    unitCost: number
    totalCost: number
    supplier: string
    priority: string
    reason: string
    daysUntilStockout: number
    avgDailySales: number
  }
}

export function ReorderDialog({ open, onOpenChange, recommendation }: ReorderDialogProps) {
  const [quantity, setQuantity] = useState(recommendation.suggestedQty)
  const [notes, setNotes] = useState("")

  const totalCost = quantity * recommendation.unitCost
  const expectedStock = recommendation.currentStock + quantity
  const daysOfInventory = expectedStock / recommendation.avgDailySales

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl">Create Purchase Order</DialogTitle>
          <DialogDescription>Review and adjust the AI recommendation before creating the PO</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Info */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center">
              <Package className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-1">{recommendation.name}</h3>
              <p className="text-sm text-muted-foreground font-mono mb-2">{recommendation.sku}</p>
              <Badge
                variant="outline"
                className={
                  recommendation.priority === "critical"
                    ? "bg-destructive/10 text-destructive border-destructive/20"
                    : "bg-chart-3/10 text-chart-3 border-chart-3/20"
                }
              >
                {recommendation.priority} priority
              </Badge>
            </div>
          </div>

          <Separator />

          {/* AI Recommendation */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-3 mb-3">
              <Sparkles className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">AI Recommendation</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{recommendation.reason}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Confidence:</span>
              <span className="font-medium text-chart-2">{recommendation.confidence}%</span>
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden ml-2">
                <div className="h-full bg-chart-2" style={{ width: `${recommendation.confidence}%` }} />
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Current Stock</span>
              </div>
              <p className="text-2xl font-bold text-destructive">{recommendation.currentStock}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {recommendation.daysUntilStockout.toFixed(1)} days until stockout
              </p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Avg Daily Sales</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{recommendation.avgDailySales}</p>
              <p className="text-xs text-muted-foreground mt-1">units per day</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="quantity" className="text-sm font-medium text-foreground mb-2 block">
                Order Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="bg-background"
              />
              <p className="text-xs text-muted-foreground mt-1">AI suggests: {recommendation.suggestedQty} units</p>
            </div>

            <div>
              <Label htmlFor="notes" className="text-sm font-medium text-foreground mb-2 block">
                Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any special instructions or notes..."
                className="bg-background"
                rows={3}
              />
            </div>
          </div>

          <Separator />

          {/* Supplier Info */}
          <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 border border-border">
            <Building2 className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{recommendation.supplier}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{recommendation.leadTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Order Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Unit Cost</span>
                <span className="text-foreground">${recommendation.unitCost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quantity</span>
                <span className="text-foreground">{quantity} units</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span className="text-foreground">Total Cost</span>
                <span className="text-foreground">${totalCost.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Expected Impact */}
          <div className="p-4 rounded-lg bg-chart-2/5 border border-chart-2/20">
            <h4 className="text-sm font-semibold text-foreground mb-3">Expected Impact</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Expected Stock</p>
                <p className="text-lg font-bold text-chart-2">{expectedStock} units</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Days of Inventory</p>
                <p className="text-lg font-bold text-chart-2">{daysOfInventory.toFixed(1)} days</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={() => onOpenChange(false)}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Create Purchase Order
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
