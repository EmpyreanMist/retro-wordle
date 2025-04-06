# Fullstack Wordle Game

A fullstack word game inspired by wordle - built with React, Node.js and MongoDB.

---

## Features

- Play Wordle with word length of your choice
- Keyboard feedback with color-coded hints
- Submit your score with name and timer
- View scoreboard with filtering and pagination
- Server-side rendered screboard using EJS
- MongoDB for persistent highscore storage

---

**Live version:**
https://christians-wordle.up.railway.app/

## Tech stack

### Frontend (`/client`)

- React
- Vite

### Backend (`/server`)

- Express
- MongoDB + Mongoose
- EJS (SSR scoreboard)
- Cors

### API Routes

| Method | Endpoint         | Description                             |
| ------ | ---------------- | --------------------------------------- |
| GET    | `/api/word`      | Returns a random word (query: `length`) |
| POST   | `/api/highscore` | Submits a new highscore                 |
| GET    | `/scoreboard`    | Renders the scoreboard page (SSR)       |

---

## Tests

The `/tests` folder will contain all automated tests for this project.

## Run it Locally

### 1. Clone the project and install dependencies

In bash:

```bash
git clone https://github.com/EmpyreanMist/fullstack-wordle.git
cd fullstack-wordle/server
npm install
```

### 2. Create a .env file in /server and use a MongoDB URI

```ini
MONGODB_URI=your-mongodb-atlas-connection-string
```

### 3. Start the server

```bash
npm start
```

## To Do / Ideas

- Responsive mobile design
- SSR 404 response with EJS
