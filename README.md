# Business Performance & Revenue Analytics Dashboard

An interactive admin dashboard to track leads, quotations, deals, orders and revenue. Built with dummy data, no backend needed.

**Live demo:** https://business-performance-and-revenue-an.vercel.app/

## Features

- **Lead analytics:** KPI cards, lead funnel, daily trend and lead sources
- **Date filters:** Today, Last 7 Days, Last 30 Days and Custom Range, with % change against the previous equivalent period
- **Quotation analytics:** by service, value, status and quote-to-deal conversion
- **Deals and revenue:** by service and category, priority breakdown, total vs collected vs outstanding
- **Orders and payments:** order status, progress, payment history and collection trend
- **Drill-down:** click a lead, deal or payment to see its quotations, deals, orders and payments
- **Lead Explorer:** search and filter leads by status
- Fully responsive

## Tech Stack

React, Vite, Tailwind CSS, Recharts

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

To create a production build:

```bash
npm run build
```

## Project Structure

```
src/
├── App.jsx            # state and page layout
├── components/        # Header, KpiGrid, DrillDownModal, shared UI
├── sections/          # one file per dashboard section
├── data/mockData.js   # dummy data
└── utils/analytics.js # filters, comparison and chart data
```

## Data Model

One lead can have many quotations and deals. One deal can have many orders and payments.

```
Lead → Quotation → Deal → Order → Payment
```