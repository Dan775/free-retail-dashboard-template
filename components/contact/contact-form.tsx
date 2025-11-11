"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    })

    setIsSubmitting(false)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-foreground">
            First name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="John"
            required
            className="bg-background border-border text-foreground"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-foreground">
            Last name
          </Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Doe"
            required
            className="bg-background border-border text-foreground"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
          className="bg-background border-border text-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company" className="text-foreground">
          Company
        </Label>
        <Input
          id="company"
          name="company"
          placeholder="Acme Inc."
          className="bg-background border-border text-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-foreground">
          Subject
        </Label>
        <Input
          id="subject"
          name="subject"
          placeholder="How can we help?"
          required
          className="bg-background border-border text-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-foreground">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us more about your needs..."
          required
          rows={6}
          className="bg-background border-border text-foreground resize-none"
        />
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>
    </form>
  )
}
