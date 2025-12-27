"use server";

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import type { User } from "@/types";
import type { Product as ProductType } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";

export const scrapeAndStoreProduct = async (productURL: string) => {
  if (!productURL) {
    throw new Error("Product URL is required");
  }

  try {
    await connectToDB();

    const scrapedProduct = await scrapeAmazonProduct(productURL);

    if (!scrapedProduct) return;

    let product = scrapedProduct;

    const existingProduct = await Product.findOne({
      url: scrapedProduct.url,
    }).lean();

    if (existingProduct) {
      const previousHistory =
        (
          existingProduct as {
            priceHistory?: Array<{ price: number; date?: Date }>;
          }
        ).priceHistory ?? [];

      const updatedPriceHistory: Array<{ price: number; date?: Date }> = [
        ...previousHistory,
        { price: scrapedProduct.currentPrice },
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory as unknown as never[],
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );

    revalidatePath(`/products/${newProduct._id}`);
  } catch (error) {
    console.error("Error scraping product:", error);
    throw new Error("Failed to scrape product");
  }
};

export const getProductById = async (
  productId: string
): Promise<ProductType | null> => {
  try {
    await connectToDB();

    const product = await Product.findById(productId).lean();
    if (!product) return null;

    return {
      ...(product as unknown as ProductType),
      _id: String((product as { _id: unknown })._id),
    };
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw new Error("Failed to fetch product by ID");
  }
};

export const getAllProducts = async (): Promise<ProductType[]> => {
  try {
    await connectToDB();

    const products = await Product.find({}).lean();

    return products.map((p) => ({
      ...(p as unknown as ProductType),
      _id: String((p as { _id: unknown })._id),
    }));
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw new Error("Failed to fetch all products");
  }
};

export async function getSimilarProducts(
  productId: string
): Promise<ProductType[] | null> {
  try {
    await connectToDB();

    const currentProduct = await Product.findById(productId).lean();
    if (!currentProduct) return null;

    const similarProducts = await Product.find({
      _id: { $ne: productId },
    })
      .limit(3)
      .lean();

    return similarProducts.map((p) => ({
      ...(p as unknown as ProductType),
      _id: String((p as { _id: unknown })._id),
    }));
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addUserEmailToProduct(
  productId: string,
  userEmail: string
) {
  try {
    const product = await Product.findById(productId);
    if (!product) return;

    const userExists = product.users.some(
      (user: User) => user.email === userEmail
    );

    if (!userExists) {
      product.users.push({ email: userEmail });

      await product.save();

      const emailContent = await generateEmailBody(product, "WELCOME");

      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.log(error);
  }
}
