import express from "express";
import asyncHandler from "express-async-handler";
import { searchMulti } from "../tmdb-api.js";

const router = express.Router();

router.get("/multi", asyncHandler(async (req, res) => {
  const { query, page = 1 } = req.query;
  res.status(200).json(await searchMulti(query, page));
}));

export default router;
