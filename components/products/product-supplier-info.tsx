import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Mail, Phone, MapPin, Clock } from "lucide-react"

const supplier = {
  name: "Apple Distribution International",
  contact: "Sarah Johnson",
  email: "orders@apple-dist.com",
  phone: "+1 (555) 123-4567",
  location: "Cork, Ireland",
  leadTime: "14-21 days",
  minOrderQty: 50,
  lastOrderDate: "2024-12-15",
  lastOrderQty: 200,
  reliability: 98.5,
}

export function ProductSupplierInfo() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Supplier Information</h3>
          <p className="text-sm text-muted-foreground">Primary supplier details and performance</p>
        </div>
        <Button variant="outline">Contact Supplier</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">{supplier.name}</p>
              <p className="text-xs text-muted-foreground">Contact: {supplier.contact}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm text-foreground">{supplier.email}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm text-foreground">{supplier.phone}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm text-foreground">{supplier.location}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Lead Time</p>
              <p className="text-xs text-muted-foreground">{supplier.leadTime}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Minimum Order Quantity</p>
            <p className="text-xs text-muted-foreground">{supplier.minOrderQty} units</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Last Order</p>
            <p className="text-xs text-muted-foreground">
              {supplier.lastOrderDate} • {supplier.lastOrderQty} units
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Reliability Score</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-chart-2" style={{ width: `${supplier.reliability}%` }} />
              </div>
              <span className="text-sm font-medium text-chart-2">{supplier.reliability}%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
