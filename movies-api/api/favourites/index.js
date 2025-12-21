import express from "express";
import asyncHandler from "express-async-handler";
import Favourite from "./favouriteModel.js";
import authenticate from '../../authenticate';

const router = express.Router();

// GET /api/favourites -> list my favourites
router.get(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    res.set("Cache-Control", "no-store");
    const favourites = await Favourite.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(favourites);
  })
);

// POST /api/favourites -> add favourite
router.post(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    const { movieId, title, posterPath } = req.body;

    if (!movieId) {
      return res.status(400).json({ message: "movieId is required" });
    }

    try {
      const fav = await Favourite.create({
        user: req.user._id,
        movieId,
        title,
        posterPath,
      });
      res.status(201).json(fav);
    } catch (err) {
      // Duplicate key -> already exists
      if (err.code === 11000) {
        return res.status(409).json({ message: "Already in favourites" });
      }
      throw err;
    }
  })
);

// DELETE /api/favourites/:id -> delete my favourite only
router.delete(
  "/:id",
  authenticate,
  asyncHandler(async (req, res) => {
    const fav = await Favourite.findById(req.params.id);

    if (!fav) {
      return res.status(404).json({ message: "Favourite not found" });
    }

    if (fav.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await fav.deleteOne();
    res.status(200).json({ message: "Favourite removed" });
  })
);

export default router;
