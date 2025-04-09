import express from "express";
import { v4 as uuidv4 } from "uuid";
import getRandomWord from "../services/wordService.js";
import { getFeedback } from "../utils/getFeedback.js";

const router = express.Router();

const games = {}; // { [gameId]: { word, guesses, startTime } }

// Start new game
router.post("/", (req, res) => {
  const length = parseInt(req.body.length, 10);
  const word = getRandomWord(length);

  const id = uuidv4();
  games[id] = {
    word,
    guesses: [],
    startTime: Date.now(),
  };

  res.status(201).json({ id });
});

// Send guess
router.post("/:id/guess", (req, res) => {
  const game = games[req.params.id];
  if (!game) return res.status(404).json({ error: "Game not found" });

  const guess = req.body.guess;
  const feedback = getFeedback(guess, game.word);

  game.guesses.push({ guess, feedback });

  const isCorrect = guess === game.word;

  res.status(200).json({
    feedback,
    isCorrect,
    guesses: game.guesses,
  });
});

import HighScore from "../models/Highscore.js";

router.post("/:id/highscore", async (req, res) => {
  const game = games[req.params.id];
  if (!game) return res.status(404).json({ error: "Game not found" });

  const { name } = req.body;

  const duration = Math.floor((Date.now() - game.startTime) / 1000);

  const newScore = new HighScore({
    name,
    guesses: game.guesses.length,
    timeInSeconds: duration,
    wordLength: game.word.length,
  });

  await newScore.save();

  res.status(201).json({ message: "Highscore saved" });
});

router.get("/:id/word", (req, res) => {
  const game = games[req.params.id];
  if (!game) return res.status(404).json({ error: "Game not found" });

  if (
    game.guesses.length >= 6 ||
    game.guesses.some((g) => g.guess === game.word)
  ) {
    return res.json({ word: game.word });
  } else {
    return res.status(403).json({ error: "Game not finished yet" });
  }
});

export default router;
