import mongoose from "mongoose";

const highScoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  guesses: { type: Number, required: true },
  timeInSeconds: { type: Number, required: true },
  wordLength: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  word: String,
});

export default mongoose.model("HighScore", highScoreSchema);
