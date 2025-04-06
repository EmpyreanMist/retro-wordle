import express from 'express';
import HighScore from '../models/Highscore.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, guesses, wordLength, timeInSeconds } = req.body;

    const newScore = new HighScore({
      name,
      guesses,
      wordLength,
      timeInSeconds,
    });

    await newScore.save();

    res.status(201).json({ message: 'Score saved!', score: newScore });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Could not save score', details: error.message });
  }
});

export default router;
