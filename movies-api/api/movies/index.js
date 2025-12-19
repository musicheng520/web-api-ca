import express from "express";
import asyncHandler from "express-async-handler";
import {
  getMovies,
  getMovie,
  getGenres,
  getMovieCredits,
  getMovieImages,
  getMovieReviews,
  getMovieRecommendations,
} from "../tmdb-api.js";

const router = express.Router();

const allowedCategories = new Set([
  "discover",
  "popular",
  "top_rated",
  "now_playing",
  "upcoming",
]);

// -------- fixed routes first --------

// genres
router.get("/genres", asyncHandler(async (req, res) => {
  res.status(200).json(await getGenres());
}));

// discover
router.get("/discover", asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  res.status(200).json(await getMovies({ category: "discover", page }));
}));

// -------- movie detail & sub-resources --------

// movie detail
router.get("/:id", asyncHandler(async (req, res, next) => {
  if (!/^\d+$/.test(req.params.id)) return next();
  res.status(200).json(await getMovie(req.params.id));
}));

router.get("/:id/credits", asyncHandler(async (req, res) => {
  res.status(200).json(await getMovieCredits(req.params.id));
}));

router.get("/:id/images", asyncHandler(async (req, res) => {
  res.status(200).json(await getMovieImages(req.params.id));
}));

router.get("/:id/reviews", asyncHandler(async (req, res) => {
  res.status(200).json(await getMovieReviews(req.params.id));
}));

router.get("/:id/recommendations", asyncHandler(async (req, res) => {
  res.status(200).json(await getMovieRecommendations(req.params.id));
}));

// -------- category list last --------

router.get("/:category", asyncHandler(async (req, res) => {
  const { category } = req.params;
  if (!allowedCategories.has(category)) {
    return res.status(404).json({ message: "Unknown category" });
  }
  const page = Number(req.query.page) || 1;
  res.status(200).json(await getMovies({ category, page }));
}));

export default router;
