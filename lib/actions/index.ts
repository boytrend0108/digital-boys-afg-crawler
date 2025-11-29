'use server';

import { scrapeAmazonProduct } from "../scraper";

export const scrapeAndStoreProduct = async (productURL: string) => {
  if (!productURL) {
    throw new Error('Product URL is required');
  };

  try {

    const scrapedProduct = await scrapeAmazonProduct(productURL);

  } catch (error) {
    console.error('Error scraping product:', error);
    throw new Error('Failed to scrape product');
  }
};

