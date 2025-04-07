import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5080;

// __dirname och __filename for ES-modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Atlas Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(' Connected to MongoDB Atlas'))
  .catch((err) => console.error(' MongoDB connection error:', err));

// View engine: EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import highScoreRoute from './routes/highScoreRoute.js';
import wordRoute from './routes/wordRoute.js';

app.use('/api/highscore', highScoreRoute);
app.use('/api/word', wordRoute);

import HighScore from './models/Highscore.js';

app.get('/scoreboard', async (req, res) => {
  try {
    const scores = await HighScore.find().sort({
      guesses: 1,
      timeInSeconds: 1,
    });
    res.render('scoreboard', { scores });
  } catch (error) {
    console.error('Failed to load scores:', error);
    res.status(500).send('Could not load scoreboard.');
  }
});

// Static files
app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(express.static(path.join(__dirname, 'public')));

// React fallback
app.get('*', (req, res) => {
  console.log('Sending frontend index.html');
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
