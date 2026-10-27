import Product from "../models/Product.js";

import {
  generateEmbedding,
} from "./embeddingService.js";

export const semanticSearch = async ({
  query,
  tenantId,
  category,
  minPrice,
  maxPrice,
  limit = 10,
}) => {
  const queryEmbedding = await generateEmbedding(query);

  const filter = {
    tenantId: {
      $eq: tenantId,
    },

    isActive: {
      $eq: true,
    },
  };

  if (category) {
    filter.category = {
      $eq: category,
    };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};

    if (minPrice !== undefined) {
      filter.price.$gte = minPrice;
    }

    if (maxPrice !== undefined) {
      filter.price.$lte = maxPrice;
    }
  }

  const results = await Product.aggregate([
    {
      $vectorSearch: {
        index: "products_vector_index",

        path: "embedding",

        queryVector: queryEmbedding,

        numCandidates: 100,

        limit,

        filter,
      },
    },

    {
      $project: {
        name: 1,
        category: 1,
        brand: 1,
        description: 1,
        price: 1,

        score: {
          $meta: "vectorSearchScore",
        },
      },
    },
  ]);

  return results;
};


export const keywordSearch = async ({
  query,
  tenantId,
  category,
  minPrice,
  maxPrice,
  limit = 10,
}) => {
  const filter = [
    {
      equals: {
        path: "tenantId",
        value: tenantId,
      },
    },

    {
      equals: {
        path: "isActive",
        value: true,
      },
    },
  ];

  if (category) {
    filter.push({
      equals: {
        path: "category",
        value: category,
      },
    });
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    const range = {
      path: "price",
    };

    if (minPrice !== undefined) {
      range.gte = minPrice;
    }

    if (maxPrice !== undefined) {
      range.lte = maxPrice;
    }

    filter.push({
      range,
    });
  }

  const results = await Product.aggregate([
    {
      $search: {
        index: "products_text_index",

        compound: {
          should: [
            {
              text: {
                query,
                path: "name",
                score: {
                  boost: {
                    value: 4,
                  },
                },
              },
            },

            {
              text: {
                query,
                path: "brand",
                score: {
                  boost: {
                    value: 3,
                  },
                },
              },
            },

            {
              text: {
                query,
                path: [
                  "description",
                  "category",
                  "tags",
                ],
              },
            },
          ],

          minimumShouldMatch: 1,

          filter,
        },
      },
    },

    {
      $limit: limit,
    },

    {
      $project: {
        name: 1,
        category: 1,
        brand: 1,
        description: 1,
        price: 1,

        score: {
          $meta: "searchScore",
        },
      },
    },
  ]);

  return results;
};


export const hybridSearch = async (options) => {
  const {
    query,
    tenantId,
    category,
    minPrice,
    maxPrice,
    limit = 10,
  } = options;

  const [keywordResults, vectorResults] = await Promise.all([
    keywordSearch({
      query,
      tenantId,
      category,
      minPrice,
      maxPrice,
      limit: 50,
    }),

    semanticSearch({
      query,
      tenantId,
      category,
      minPrice,
      maxPrice,
      limit: 50,
    }),
  ]);

  const rrfK = 60;

  const scores = new Map();
  const products = new Map();

  const addResults = (results) => {
    results.forEach((product, index) => {
      const id = product._id.toString();

      const rank = index + 1;

      const contribution = 1 / (rrfK + rank);

      scores.set(
        id,
        (scores.get(id) || 0) + contribution
      );

      products.set(id, product);
    });
  };

  addResults(keywordResults);
  addResults(vectorResults);

  const rankedResults = [...scores.entries()]
    .map(([id, score]) => ({
      ...products.get(id),
      hybridScore: score,
    }))
    .sort((a, b) => b.hybridScore - a.hybridScore)
    .slice(0, limit);

  return rankedResults;
};