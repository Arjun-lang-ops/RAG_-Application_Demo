import {
  keywordSearch,
  semanticSearch,
  hybridSearch,
} from "../services/searchService.js";

const parseOptionalNumber = (value, fieldName) => {
  if (value === undefined) {
    return undefined;
  }

  if (value === "" || !Number.isFinite(Number(value))) {
    throw new Error(`${fieldName} must be a valid number`);
  }

  const number = Number(value);

  if (number < 0) {
    throw new Error(`${fieldName} cannot be negative`);
  }

  return number;
};

const getSearchOptions = (req) => {
  const query = String(req.query.q || "").trim();

  if (!query) {
    throw new Error("Search query q is required");
  }

  const minPrice = parseOptionalNumber(
    req.query.minPrice,
    "minPrice"
  );

  const maxPrice = parseOptionalNumber(
    req.query.maxPrice,
    "maxPrice"
  );

  if (
    minPrice !== undefined &&
    maxPrice !== undefined &&
    minPrice > maxPrice
  ) {
    throw new Error("minPrice cannot exceed maxPrice");
  }

  const limitValue = Number(req.query.limit ?? 10);

  if (
    !Number.isInteger(limitValue) ||
    limitValue < 1 ||
    limitValue > 50
  ) {
    throw new Error("limit must be an integer between 1 and 50");
  }

  return {
    query,
    category: req.query.category || undefined,
    minPrice,
    maxPrice,
    limit: limitValue,

    // For this learning project, use a fixed tenant.
    // In production, obtain this from authenticated server-side context.
    tenantId: "store-1",
  };
};

const handleSearch = (searchFunction) => async (req, res) => {
  try {
    const options = getSearchOptions(req);

    const start = performance.now();

    const results = await searchFunction(options);

    const latencyMs = performance.now() - start;

    res.json({
      query: options.query,
      count: results.length,
      latencyMs: Number(latencyMs.toFixed(2)),
      results,
    });
  } catch (error) {
    const isValidationError =
      error.message.includes("required") ||
      error.message.includes("must be") ||
      error.message.includes("cannot");

    res.status(isValidationError ? 400 : 500).json({
      error: error.message,
    });
  }
};

export const searchKeyword = handleSearch(keywordSearch);

export const searchSemantic = handleSearch(semanticSearch);

export const searchHybrid = handleSearch(hybridSearch);