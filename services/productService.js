import Product from "../models/Product.js";
import { retryWithBackoff } from "../utils/retry.js";
import { EMBEDDING_MODEL, generateEmbedding } from "./embeddingService.js";

const EMBEDDING_VERSION = 1;

const buildProductText = (product) => {
  return [
    product.name,
    product.category,
    product.brand,
    product.description,
    ...(product.tags || []),
  ].join(" ");
};

export const createProduct = async (productData) => {
  const searchableText = buildProductText(productData);

  const embedding = await retryWithBackoff(() =>
    generateEmbedding(searchableText),
  );

  const product = await Product.create({
    ...productData,
    embedding,
    embeddingModel: EMBEDDING_MODEL,
    embeddingVersion: EMBEDDING_VERSION,
  });

  return product;
};
