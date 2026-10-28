import dotenv from "dotenv";

dotenv.config();

import connectDB from "../config/db.js";
import Product from "../models/Product.js";
import { createProduct } from "../services/productService.js";

const products = [
  {
    name: "Nike Natural Grass Football Boots",
    category: "Football Boots",
    brand: "Nike",
    description:
      "Lightweight football boots designed for playing on natural grass surfaces.",
    price: 4999,
    tags: ["football", "boots", "grass", "outdoor"],
    tenantId: "store-1",
  },

  {
    name: "Adidas Artificial Turf Shoes",
    category: "Football Boots",
    brand: "Adidas",
    description:
      "Durable football shoes with a turf sole for artificial grass pitches.",
    price: 3999,
    tags: ["football", "turf", "artificial grass", "shoes"],
    tenantId: "store-1",
  },

  {
    name: "Football Training Jersey",
    category: "Jerseys",
    brand: "Puma",
    description:
      "Breathable sports jersey for football training and outdoor matches.",
    price: 1499,
    tags: ["jersey", "football", "training", "sportswear"],
    tenantId: "store-1",
  },

  {
    name: "Professional Shin Guards",
    category: "Protection",
    brand: "Nike",
    description:
      "Lightweight protective shin guards for football players.",
    price: 799,
    tags: ["protection", "football", "shin guards"],
    tenantId: "store-1",
  },

  {
    name: "Goalkeeper Gloves",
    category: "Goalkeeper Equipment",
    brand: "Adidas",
    description:
      "Football goalkeeper gloves with grip for catching and handling the ball.",
    price: 1999,
    tags: ["goalkeeper", "gloves", "football"],
    tenantId: "store-1",
  },

  {
    name: "Running Shoes",
    category: "Running",
    brand: "Nike",
    description:
      "Cushioned running shoes for jogging, road running, and daily exercise.",
    price: 3499,
    tags: ["running", "shoes", "exercise"],
    tenantId: "store-1",
  },
];

const seedProducts = async () => {
  try {
    await connectDB();

    // Remove only the sample tenant's existing products.
    await Product.deleteMany({
      tenantId: "store-1",
    });

    for (const productData of products) {
      await createProduct(productData);

      console.log(`Created: ${productData.name}`);
    }

    console.log("Product ingestion completed.");
  } catch (error) {
    console.error("Ingestion failed:", error.message);
    process.exitCode = 1;
  } finally {
    if (Product.db.readyState !== 0) {
      await Product.db.close();
    }
  }
};

seedProducts();
