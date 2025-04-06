import mongoose from 'mongoose';

const highScoreSchema = new mongoose.Schema({
  name: String,
  guesses: Number,
  wordLength: Number,
  timeInSeconds: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const HighScore = mongoose.model('HighScore', highScoreSchema);
export default HighScore;
