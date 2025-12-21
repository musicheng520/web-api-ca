import express from "express";
import asyncHandler from "express-async-handler";
import authenticate from "../../authenticate";
import Watchlist from "./watchlistModel";

const router = express.Router();

// GET current user's watchlist
router.get(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    res.set("Cache-Control", "no-store");
    const list = await Watchlist.find({ user: req.user._id });
    res.status(200).json(list);
  })
);

// ADD to watchlist
router.post(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    const { movieId, title, posterPath } = req.body;

    const existing = await Watchlist.findOne({
      user: req.user._id,
      movieId,
    });

    if (existing) {
      return res.status(409).json({ message: "Already in watchlist" });
    }

    const item = await Watchlist.create({
      user: req.user._id,
      movieId,
      title,
      posterPath,
    });

    res.status(201).json(item);
  })
);

// DELETE by document id
router.delete(
  "/:id",
  authenticate,
  asyncHandler(async (req, res) => {
    await Watchlist.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Removed from watchlist" });
  })
);

export default router;
