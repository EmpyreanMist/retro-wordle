import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5080;

// __dirname och __filename for ES-modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Atlas Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(" Connected to MongoDB Atlas"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// View engine: EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import secureGameRoute from "./routes/secureGameRoute.js";

app.use("/api/games", secureGameRoute);

import HighScore from "./models/Highscore.js";

app.get("/scoreboard", async (req, res) => {
  try {
    const pageSize = 15;
    const page = parseInt(req.query.page, 10) || 1;
    const length = parseInt(req.query.length, 10);
    const unique = req.query.unique; // 👈 Lägg till denna rad

    const filter = {};

    if (!isNaN(length)) {
      filter.wordLength = length;
    }

    if (unique === "true") {
      filter.allowDuplicates = false;
    } else if (unique === "false") {
      filter.allowDuplicates = true;
    }

    const totalScores = await HighScore.countDocuments(filter);
    const totalPages = Math.ceil(totalScores / pageSize);

    const scores = await HighScore.find(filter)
      .sort({ guesses: 1, timeInSeconds: 1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.render("scoreboard", {
      scores,
      currentPath: req.path,
      selectedLength: length,
      selectedUnique: unique,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.error("Failed to load scores:", error);
    res.status(500).send("Could not load scoreboard.");
  }
});

// Static files
app.use(express.static(path.resolve(__dirname, "../client/dist")));
app.use(express.static(path.join(__dirname, "public")));

// React fallback
app.get("*", (req, res) => {
  console.log("Sending frontend index.html");
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
