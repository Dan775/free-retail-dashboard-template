# Retail Dashboard

A beautifully designed, comprehensive retail management dashboard built with Next.js, React, and Tailwind CSS. This dashboard provides real-time insights into your retail operations, including product management, inventory tracking, sales analytics, AI-powered insights, and customer management—all in one modern, intuitive interface.

## Purpose

This repository provides a production-ready retail dashboard template that you can customize and deploy for your own retail operations. Perfect for retailers, e-commerce businesses, and inventory managers who need a comprehensive solution to monitor and manage their retail operations with modern, data-driven insights.

## Features

### Dashboard Overview

Real-time KPI cards, sales charts, channel breakdowns, top products, inventory heatmaps, and stockout alerts—all on one comprehensive overview page.

### Products Management

Complete product catalog management with SKU tracking, inventory levels, product details, and search functionality.

### Replenishment

Intelligent inventory replenishment recommendations and stock level monitoring to prevent stockouts and optimize inventory.

### Pricing

Dynamic pricing management and optimization tools to maximize revenue and competitiveness.

### AI Insights

AI-powered insights and recommendations to help you make data-driven decisions about your retail operations.

### Analytics

Advanced analytics and reporting with customizable charts, trends, and performance metrics.

### Orders Management

Complete order tracking and management system to monitor sales and fulfillment.

### Customers

Customer relationship management with customer profiles, purchase history, and engagement metrics.

### Settings

Comprehensive settings panel for profile management, notification preferences, security settings, and application preferences.

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/lotfijb/free-retail-dashboard-template
cd free-retail-dashboard-template
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open http://localhost:3000 in your browser to see the dashboard.

## Project Structure

```
retail-dashboard/
├── app/
│   ├── dashboard/          # Main dashboard pages
│   │   ├── analytics/      # Analytics page
│   │   ├── customers/      # Customers management
│   │   ├── insights/       # AI Insights
│   │   ├── orders/         # Orders management
│   │   ├── pricing/        # Pricing management
│   │   ├── products/       # Products catalog
│   │   ├── replenishment/  # Inventory replenishment
│   │   ├── settings/       # Settings page
│   │   └── page.tsx        # Dashboard overview
│   ├── contact/            # Contact page
│   ├── profile/            # User profile
│   └── page.tsx            # Landing page
├── components/
│   ├── dashboard/          # Dashboard-specific components
│   ├── landing/            # Landing page components
│   ├── layout/             # Layout components
│   └── ui/                 # Reusable UI components
├── public/                 # Static assets
└── ...
```

## Usage

1. Navigate to the landing page to see the dashboard overview
2. Access the dashboard at `/dashboard` to view the main interface
3. Explore different sections using the sidebar navigation
4. Customize the content, styling, and components to match your needs
5. Connect to your backend API to integrate real data
6. Deploy!

## Technologies

- **Next.js 15** - React framework for production
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Recharts** - Charting library for data visualization
- **Lucide React** - Beautiful icon library
- **Next Themes** - Dark mode support

## Credits

Dashboard designed and developed by [Lotfi Jebali](https://lotfijebali.dev/?utm_source=free-retail-dashboard-template).

## License

This project is open source and available for personal and commercial use.
