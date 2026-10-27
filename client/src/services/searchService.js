/**
 * searchService.js
 * ----------------
 * All API calls to the backend live here, keeping them
 * completely separate from the UI components.
 *
 * Backend base URL: http://localhost:3000
 * Routes (all GET):
 *   /api/search/keyword  ?q=&limit=&category=&minPrice=&maxPrice=
 *   /api/search/semantic ?q=&limit=&category=&minPrice=&maxPrice=
 *   /api/search/hybrid   ?q=&limit=&category=&minPrice=&maxPrice=
 *
 * Every route returns:
 *   { query, count, latencyMs, results: [{_id, name, category, brand, description, price, score | hybridScore}] }
 */

import axios from "axios";

// Use a relative URL so the Vite dev server proxy forwards requests to Express.
// In vite.config.js: proxy "/api" → "http://localhost:3000"
const BASE_URL = "/api/search";

/**
 * Build a query-string from an options object,
 * skipping undefined / empty values.
 *
 * @param {object} params - Key-value pairs to serialise
 * @returns {URLSearchParams}
 */
const buildParams = (params) => {
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      urlParams.append(key, value);
    }
  });
  return urlParams;
};

/**
 * Shared fetch helper — sends a GET request and returns the parsed JSON body.
 *
 * @param {string} endpoint - e.g. "/keyword"
 * @param {URLSearchParams} params
 * @returns {Promise<object>} - The full response body
 */
const fetchSearch = async (endpoint, params) => {
  const response = await axios.get(`${BASE_URL}${endpoint}`, { params });
  return response.data; // { query, count, latencyMs, results }
};

/**
 * Keyword search — uses Atlas $search (text index).
 *
 * @param {string} query          - The search term
 * @param {object} [options={}]   - Optional filters
 * @param {number} [options.limit=10]
 * @param {string} [options.category]
 * @param {number} [options.minPrice]
 * @param {number} [options.maxPrice]
 */
export const keywordSearch = (query, options = {}) => {
  const params = buildParams({ q: query, ...options });
  return fetchSearch("/keyword", params);
};

/**
 * Semantic search — uses Atlas $vectorSearch (embedding index).
 *
 * @param {string} query          - Natural-language description
 * @param {object} [options={}]
 */
export const semanticSearch = (query, options = {}) => {
  const params = buildParams({ q: query, ...options });
  return fetchSearch("/semantic", params);
};

/**
 * Hybrid search — RRF fusion of keyword + semantic results.
 * Returned products include a `hybridScore` field instead of `score`.
 *
 * @param {string} query          - Natural-language or keyword query
 * @param {object} [options={}]
 */
export const hybridSearch = (query, options = {}) => {
  const params = buildParams({ q: query, ...options });
  return fetchSearch("/hybrid", params);
};
