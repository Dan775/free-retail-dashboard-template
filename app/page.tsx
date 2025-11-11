import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  TrendingUp,
  Package,
  DollarSign,
  Sparkles,
  ShoppingCart,
  Users,
  AlertTriangle,
} from "lucide-react";
import { MiniKPICard } from "@/components/landing/mini-kpi-card";
import { MiniChart } from "@/components/landing/mini-chart";
import { TopProducts } from "@/components/landing/top-products";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "RetailOS - AI-Powered Retail Dashboard by Lotfi Jebali",
  description:
    "Aggregate POS sales, inventory, supplier data, and web orders into one intelligent dashboard. Get real-time KPIs, demand forecasts, and AI-generated insights. Made by Lotfi Jebali.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              RetailOS
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#demo"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Demo
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/dashboard">
                Get started <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Retail Intelligence</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-balance mb-6 text-foreground">
            Your retail business, <span className="text-primary">unified</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 leading-relaxed">
            Aggregate POS sales, inventory, supplier data, and web orders into
            one intelligent dashboard. Get real-time KPIs, demand forecasts, and
            AI-generated insights that drive decisions.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                View live demo <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#demo">Watch video</Link>
            </Button>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Made by{" "}
            <a
              href="https://lotfijebali.dev?utm_source=free-retail-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Lotfi Jebali
            </a>
          </p>
        </div>
      </section>

      {/* Interactive Dashboard Preview */}
      <section id="demo" className="container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Everything you need in one place
            </h2>
            <p className="text-lg text-muted-foreground text-balance">
              Real-time insights across your entire retail operation
            </p>
          </div>

          {/* Mini Dashboard Preview */}
          <Card className="p-6 bg-card border-border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <MiniKPICard
                title="Total Revenue"
                value="$2.4M"
                change="+12.5%"
                trend="up"
                icon={<DollarSign className="w-4 h-4" />}
              />
              <MiniKPICard
                title="Orders Today"
                value="1,247"
                change="+8.2%"
                trend="up"
                icon={<ShoppingCart className="w-4 h-4" />}
              />
              <MiniKPICard
                title="Active SKUs"
                value="3,842"
                change="-2.1%"
                trend="down"
                icon={<Package className="w-4 h-4" />}
              />
              <MiniKPICard
                title="Stockouts"
                value="23"
                change="+5"
                trend="down"
                icon={<AlertTriangle className="w-4 h-4" />}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MiniChart />
              <TopProducts />
            </div>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Demand Forecasting
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                AI-powered predictions for inventory needs, seasonal trends, and
                customer demand patterns.
              </p>
            </Card>

            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Smart Replenishment
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Automated reorder recommendations with confidence scores, lead
                times, and cost impact analysis.
              </p>
            </Card>

            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Dynamic Pricing
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Real-time pricing suggestions based on demand, competition, and
                inventory levels.
              </p>
            </Card>

            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                AI Insights
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                LLM-generated business insights with evidence, confidence
                scores, and actionable recommendations.
              </p>
            </Card>

            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Real-time Analytics
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Live dashboards with sales, inventory, and customer metrics
                updated in real-time.
              </p>
            </Card>

            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Multi-Channel
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Unified view of POS, web orders, marketplace sales, and customer
                interactions.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24">
        <Card className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Ready to transform your retail operations?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-balance">
              Join hundreds of retailers using AI-powered insights to drive
              growth
            </p>
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Start free trial <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <p className="mt-6 text-sm text-muted-foreground">
              Made by{" "}
              <a
                href="https://lotfijebali.dev?utm_source=free-retail-dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Lotfi Jebali
              </a>
            </p>
          </div>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
