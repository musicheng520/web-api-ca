import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movieId: { type: Number, required: true },
    title: { type: String },
    posterPath: { type: String },
  },
  { timestamps: true }
);

// Prevent duplicates per user per movie
favouriteSchema.index({ user: 1, movieId: 1 }, { unique: true });

export default mongoose.model("Favourite", favouriteSchema);
