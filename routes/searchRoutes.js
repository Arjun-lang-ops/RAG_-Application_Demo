import express from "express";

import {
  searchKeyword,
  searchSemantic,
  searchHybrid,
} from "../controllers/searchController.js";

const router = express.Router();

router.get("/keyword", searchKeyword);

router.get("/semantic", searchSemantic);

router.get("/hybrid", searchHybrid);

export default router;