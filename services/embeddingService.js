
import { pipeline } from "@huggingface/transformers";

export const EMBEDDING_MODEL =
  "Xenova/all-MiniLM-L6-v2";

let extractor;

export const generateEmbedding = async (text) => {
  if (!extractor) {
    extractor = await pipeline(
      "feature-extraction",
      EMBEDDING_MODEL
    );
  }

  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
};
