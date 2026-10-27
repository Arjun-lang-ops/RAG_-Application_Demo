import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const EMBEDDING_MODEL = "gemini-embedding-2";

export const generateEmbedding = async (text) => {
  const response = await ai.models.embedContent({
    model: EMBEDDING_MODEL,
    contents: text,
    config: {
      outputDimensionality: 768,
    },
  });

  return response.embeddings[0].values;
};