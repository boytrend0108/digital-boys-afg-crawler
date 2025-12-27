import mongoose from "mongoose";

export interface PriceHistoryItem {
  price: number;
  date?: Date;
}

export interface ProductDocument extends mongoose.Document {
  url: string;
  currency: string;
  image: string;
  title: string;
  currentPrice: number;
  originalPrice: number;
  priceHistory: PriceHistoryItem[];
  lowestPrice?: number;
  highestPrice?: number;
  averagePrice?: number;
  discountRate?: number;
  description?: string;
  category?: string;
  reviewsCount?: number;
  isOutOfStock: boolean;
  users: Array<{ email: string }>;
}

const productSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, unique: true },
    currency: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    priceHistory: [
      {
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    lowestPrice: { type: Number },
    highestPrice: { type: Number },
    averagePrice: { type: Number },
    discountRate: { type: Number },
    description: { type: String },
    category: { type: String },
    reviewsCount: { type: Number },
    isOutOfStock: { type: Boolean, default: false },
    users: {
      type: [{ email: { type: String, required: true } }],
      default: [],
    },
  },
  { timestamps: true }
);

const Product =
  (mongoose.models.Product as mongoose.Model<ProductDocument>) ||
  mongoose.model<ProductDocument>("Product", productSchema);

export default Product;
