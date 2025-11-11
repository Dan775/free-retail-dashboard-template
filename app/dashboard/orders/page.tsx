"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Package,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

const orders = [
  {
    id: "ORD-2024-001",
    customer: "John Smith",
    date: "2024-01-15",
    status: "completed",
    total: 1247.98,
    items: 3,
    channel: "Web",
  },
  {
    id: "ORD-2024-002",
    customer: "Sarah Johnson",
    date: "2024-01-15",
    status: "processing",
    total: 899.99,
    items: 2,
    channel: "POS",
  },
  {
    id: "ORD-2024-003",
    customer: "Mike Davis",
    date: "2024-01-14",
    status: "shipped",
    total: 2349.97,
    items: 5,
    channel: "Marketplace",
  },
  {
    id: "ORD-2024-004",
    customer: "Emily Wilson",
    date: "2024-01-14",
    status: "completed",
    total: 549.99,
    items: 1,
    channel: "Web",
  },
  {
    id: "ORD-2024-005",
    customer: "David Brown",
    date: "2024-01-13",
    status: "cancelled",
    total: 799.99,
    items: 2,
    channel: "Web",
  },
  {
    id: "ORD-2024-006",
    customer: "Lisa Anderson",
    date: "2024-01-13",
    status: "completed",
    total: 1899.98,
    items: 4,
    channel: "POS",
  },
  {
    id: "ORD-2024-007",
    customer: "Robert Taylor",
    date: "2024-01-12",
    status: "processing",
    total: 449.99,
    items: 1,
    channel: "Marketplace",
  },
  {
    id: "ORD-2024-008",
    customer: "Jennifer Martinez",
    date: "2024-01-12",
    status: "shipped",
    total: 999.99,
    items: 2,
    channel: "Web",
  },
];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      case "processing":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20";
      case "shipped":
        return "bg-primary/10 text-primary border-primary/20";
      case "cancelled":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "processing":
        return <Clock className="w-4 h-4" />;
      case "shipped":
        return <Package className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Orders</h1>
        <p className="text-muted-foreground">Manage and track customer orders</p>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-card border-border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by order ID or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[200px] bg-background">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="bg-card border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Order ID</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Customer</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Channel</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Items</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Total</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="p-4">
                    <span className="text-sm font-medium text-foreground font-mono">{order.id}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{order.customer}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{order.date}</span>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className={getStatusColor(order.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </span>
                    </Badge>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{order.channel}</span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-sm text-foreground">{order.items}</span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-sm font-medium text-foreground">${order.total.toLocaleString()}</span>
                  </td>
                  <td className="p-4 text-right">
                    <Button size="sm" variant="outline">
                      View
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
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of{" "}
            {filteredOrders.length} orders
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
  );
}

