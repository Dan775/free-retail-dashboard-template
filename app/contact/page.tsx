import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, ExternalLink } from "lucide-react";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Contact - Retail Dashboard",
  description:
    "For any inquiries about this retail dashboard, please reach out to Lotfi Jebali.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              RetailOS
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#demo"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Demo
            </Link>
            <Link
              href="/#pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="text-sm text-foreground font-medium"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/dashboard">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 text-foreground">
            Get in touch
          </h1>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Have questions about RetailOS? For any inquiries, please reach out
            to Lotfi Jebali.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="container mx-auto px-6 pb-24">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 md:p-12 bg-card border-border text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Contact Lotfi Jebali
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              For any inquiries about this retail dashboard or questions about
              RetailOS, please reach out to{" "}
              <span className="font-semibold text-foreground">
                Lotfi Jebali
              </span>
              .
            </p>
            <Button size="lg" asChild className="gap-2">
              <a
                href="https://lotfijebali.dev?utm_source=free-retail-dashboard"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Lotfi Jebali's Website
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
