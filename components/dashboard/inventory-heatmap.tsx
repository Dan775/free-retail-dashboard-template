"use client"

import { Card } from "@/components/ui/card"

const stores = ["Downtown", "Mall", "Airport", "Suburb", "Online"]
const categories = ["Phones", "Tablets", "Laptops", "Accessories", "Wearables"]

// Generate mock heatmap data (0-100 representing stock levels)
const heatmapData = stores.map((store) =>
  categories.map((category) => ({
    store,
    category,
    value: Math.floor(Math.random() * 100),
  })),
)

function getColorForValue(value: number) {
  if (value < 20) return "bg-destructive"
  if (value < 40) return "bg-chart-3"
  if (value < 60) return "bg-chart-2"
  if (value < 80) return "bg-chart-1"
  return "bg-primary"
}

export function InventoryHeatmap() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Inventory Heatmap</h3>
        <p className="text-sm text-muted-foreground">Stock levels by store and category</p>
      </div>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="flex gap-2">
            <div className="w-24 flex flex-col gap-2 pt-8">
              {stores.map((store) => (
                <div key={store} className="h-12 flex items-center text-sm text-muted-foreground">
                  {store}
                </div>
              ))}
            </div>
            <div className="flex-1">
              <div className="flex gap-2 mb-2">
                {categories.map((category) => (
                  <div key={category} className="flex-1 text-sm text-muted-foreground text-center">
                    {category}
                  </div>
                ))}
              </div>
              {heatmapData.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2 mb-2">
                  {row.map((cell, cellIndex) => (
                    <div
                      key={cellIndex}
                      className={`flex-1 h-12 rounded-lg ${getColorForValue(cell.value)} flex items-center justify-center text-sm font-medium text-primary-foreground cursor-pointer hover:opacity-80 transition-opacity`}
                      title={`${cell.store} - ${cell.category}: ${cell.value}%`}
                    >
                      {cell.value}%
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-destructive" />
          <span>Critical</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-chart-3" />
          <span>Low</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-chart-2" />
          <span>Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-chart-1" />
          <span>Good</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary" />
          <span>Excellent</span>
        </div>
      </div>
    </Card>
  )
}
