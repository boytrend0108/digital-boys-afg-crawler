'use server';

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

export const scrapeAndStoreProduct = async (productURL: string) => {
  if (!productURL) {
    throw new Error('Product URL is required');
  };

  try {
    await connectToDB();

    const scrapedProduct = await scrapeAmazonProduct(productURL);

    if (!scrapedProduct) return;

    let product = scrapedProduct;

    const existingProduct = await Product.findOne({ url: scrapedProduct.url });

    if (existingProduct) {
      const updatedPriceHistory = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice }
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      }
    };


    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );

    revalidatePath(`/products/${newProduct._id}`);

  } catch (error) {
    console.error('Error scraping product:', error);
    throw new Error('Failed to scrape product');
  }
};

export const getProductById = async (productId: string) => {
  try {
    await connectToDB();
    const product = await Product.findOne({ _id: productId })
    if (!product) return null;

    return product;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw new Error('Failed to fetch product by ID');
  }
}

export const getAllProducts = async () => {
  try {
    await connectToDB();
    const products = await Product.find()
    return products;
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw new Error('Failed to fetch all products');
  }
}

