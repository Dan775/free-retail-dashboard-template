"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Users,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  DollarSign,
  ShoppingCart,
} from "lucide-react";

const customers = [
  {
    id: "CUST-001",
    name: "John Smith",
    email: "john.smith@email.com",
    totalOrders: 12,
    totalSpent: 12479.98,
    avgOrderValue: 1039.99,
    lastOrder: "2024-01-15",
    status: "active",
    segment: "VIP",
  },
  {
    id: "CUST-002",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    totalOrders: 8,
    totalSpent: 7899.99,
    avgOrderValue: 987.50,
    lastOrder: "2024-01-14",
    status: "active",
    segment: "Premium",
  },
  {
    id: "CUST-003",
    name: "Mike Davis",
    email: "mike.davis@email.com",
    totalOrders: 5,
    totalSpent: 2349.97,
    avgOrderValue: 469.99,
    lastOrder: "2024-01-13",
    status: "active",
    segment: "Regular",
  },
  {
    id: "CUST-004",
    name: "Emily Wilson",
    email: "emily.w@email.com",
    totalOrders: 3,
    totalSpent: 1649.97,
    avgOrderValue: 549.99,
    lastOrder: "2024-01-12",
    status: "active",
    segment: "Regular",
  },
  {
    id: "CUST-005",
    name: "David Brown",
    email: "david.brown@email.com",
    totalOrders: 15,
    totalSpent: 18999.95,
    avgOrderValue: 1266.66,
    lastOrder: "2024-01-15",
    status: "active",
    segment: "VIP",
  },
  {
    id: "CUST-006",
    name: "Lisa Anderson",
    email: "lisa.a@email.com",
    totalOrders: 7,
    totalSpent: 5499.93,
    avgOrderValue: 785.70,
    lastOrder: "2024-01-11",
    status: "inactive",
    segment: "Premium",
  },
  {
    id: "CUST-007",
    name: "Robert Taylor",
    email: "robert.t@email.com",
    totalOrders: 2,
    totalSpent: 899.98,
    avgOrderValue: 449.99,
    lastOrder: "2024-01-10",
    status: "active",
    segment: "Regular",
  },
  {
    id: "CUST-008",
    name: "Jennifer Martinez",
    email: "jennifer.m@email.com",
    totalOrders: 9,
    totalSpent: 8999.91,
    avgOrderValue: 999.99,
    lastOrder: "2024-01-14",
    status: "active",
    segment: "Premium",
  },
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSegment = segmentFilter === "all" || customer.segment === segmentFilter;
    return matchesSearch && matchesSegment;
  });

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case "VIP":
        return "bg-primary/10 text-primary border-primary/20";
      case "Premium":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      case "Regular":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-chart-2/10 text-chart-2 border-chart-2/20"
      : "bg-muted text-muted-foreground border-border";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Customers</h1>
        <p className="text-muted-foreground">Manage customer relationships and insights</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Customers</span>
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground">{customers.length}</div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Active Customers</span>
            <TrendingUp className="w-4 h-4 text-chart-2" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            {customers.filter((c) => c.status === "active").length}
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Revenue</span>
            <DollarSign className="w-4 h-4 text-chart-2" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Avg Order Value</span>
            <ShoppingCart className="w-4 h-4 text-chart-3" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            $
            {Math.round(
              customers.reduce((sum, c) => sum + c.avgOrderValue, 0) / customers.length
            ).toLocaleString()}
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-card border-border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
          <Select value={segmentFilter} onValueChange={setSegmentFilter}>
            <SelectTrigger className="w-full md:w-[200px] bg-background">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Segments</SelectItem>
              <SelectItem value="VIP">VIP</SelectItem>
              <SelectItem value="Premium">Premium</SelectItem>
              <SelectItem value="Regular">Regular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Customers Table */}
      <Card className="bg-card border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Customer</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Email</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Segment</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Orders</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Total Spent</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Avg Order</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <Users className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{customer.name}</div>
                        <div className="text-xs text-muted-foreground font-mono">{customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{customer.email}</span>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className={getSegmentColor(customer.segment)}>
                      {customer.segment}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className={getStatusColor(customer.status)}>
                      {customer.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-sm text-foreground">{customer.totalOrders}</span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-sm font-medium text-foreground">
                      ${customer.totalSpent.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-sm text-foreground">${customer.avgOrderValue.toLocaleString()}</span>
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
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCustomers.length)} of{" "}
            {filteredCustomers.length} customers
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

