# PriceWise (AFG Crawler)

PriceWise is a powerful product scraping and price tracking application designed to help users make smart shopping decisions. It allows users to track product prices from Amazon, providing analytics and notifications to help convert, engage, and retain customers.

## Features

- **Product Scraping**: Extracts product details like title, price, images, and description from Amazon using Bright Data proxies.
- **Price Tracking**: Monitors product prices over time.
- **Email Notifications**: Sends alerts when products are back in stock or when prices drop.
- **Trending Products**: Showcases trending items on the homepage.
- **Responsive Design**: Built with a mobile-first approach using Tailwind CSS.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Linting & Formatting**: [Biome](https://biomejs.dev/)

## Key Libraries

- **Scraping**:
  - `cheerio`: For parsing HTML and extracting data.
  - `axios`: For making HTTP requests.
  - `bright-data`: Utilized for proxy management to bypass scraping restrictions.
- **UI Components**:
  - `@headlessui/react`: For unstyled, fully accessible UI components.
  - `react-responsive-carousel`: For product image carousels.
- **Email Services**:
  - `mailgun.js`: Integration for email delivery.

## Getting Started

1. **Clone the repository**

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the necessary variables (e.g., MongoDB URI, Bright Data credentials, Email credentials).

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open the app**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

[DEMO](https://digital-boys-afg-crawler.vercel.app)
