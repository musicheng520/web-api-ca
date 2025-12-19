import express from "express";
import asyncHandler from "express-async-handler";
import {
  getPerson,
  getPersonMovieCredits,
} from "../tmdb-api.js";

const router = express.Router();

router.get("/:id", asyncHandler(async (req, res) => {
  res.status(200).json(await getPerson(req.params.id));
}));

router.get("/:id/movie_credits", asyncHandler(async (req, res) => {
  res.status(200).json(await getPersonMovieCredits(req.params.id));
}));

export default router;
