import { useState, useEffect } from "react";
import StartScreen from "./StartScreen";
import WordLengthSelector from "./WordLengthSelector";
import GameBoard from "./GameBoard";
import Keyboard from "./Keyboard";
import axios from "axios";

function GamePage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [wordLength, setWordLength] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [didWin, setDidWin] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [keyStatuses, setKeyStatuses] = useState({});
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [secretWord, setSecretWord] = useState(null);
  const [allowDuplicates, setAllowDuplicates] = useState(true);

  const startNewGame = async (length, allowDupes) => {
    try {
      const res = await axios.post("/api/games", {
        length,
        allowDuplicates: allowDupes,
      });
      setGameId(res.data.id);
      setWordLength(length);
      setAllowDuplicates(allowDupes);
      setStartTime(Date.now());
    } catch (err) {
      console.error("Failed to start game:", err);
    }
  };

  const updateKeyStatuses = (guess, feedback) => {
    setKeyStatuses((prev) => {
      const updated = { ...prev };
      guess.split("").forEach((letter, i) => {
        const status = feedback[i];
        if (status === "correct" || status === "present") {
          updated[letter] = "correct";
        } else if (!updated[letter]) {
          updated[letter] = "absent";
        }
      });
      return updated;
    });
  };

  const handleKeyPress = async (key) => {
    if (gameOver) return;

    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (key === "Enter") {
      if (currentGuess.length !== wordLength) return;

      try {
        const res = await axios.post(`/api/games/${gameId}/guess`, {
          guess: currentGuess,
        });
        const feedback = res.data.feedback;

        updateKeyStatuses(currentGuess, feedback);
        setGuesses((prev) => [...prev, currentGuess]);
        setFeedbackList((prev) => [...prev, feedback]);
        setCurrentGuess("");

        if (res.data.isCorrect) {
          const endTime = Date.now();
          setDuration(Math.floor((endTime - startTime) / 1000));
          setDidWin(true);
          setGameOver(true);
        } else if (guesses.length + 1 >= 6) {
          setGameOver(true);
        }
      } catch (err) {
        console.error("Failed to submit guess:", err);
      }
    } else if (/^[a-zA-Z]$/.test(key)) {
      if (currentGuess.length < wordLength) {
        setCurrentGuess((prev) => prev + key.toLowerCase());
      }
    }
  };

  useEffect(() => {
    const listener = (e) => handleKeyPress(e.key);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [currentGuess, wordLength, gameId, guesses, feedbackList, gameOver]);

  useEffect(() => {
    if (gameOver && !didWin) {
      const fetchWord = async () => {
        try {
          const res = await axios.get(`/api/games/${gameId}/word`);
          setSecretWord(res.data.word);
        } catch (err) {
          console.error("Could not fetch word after game over", err);
        }
      };
      fetchWord();
    }
  }, [gameOver, didWin, gameId]);

  const resetGame = () => {
    setGameStarted(false);
    setWordLength(null);
    setGameId(null);
    setGuesses([]);
    setFeedbackList([]);
    setCurrentGuess("");
    setGameOver(false);
    setDidWin(false);
    setDuration(null);
    setPlayerName("");
    setKeyStatuses({});
    setScoreSubmitted(false);
    setSecretWord(null);
  };

  if (!gameStarted)
    return <StartScreen startGame={() => setGameStarted(true)} />;

  if (wordLength === null)
    return (
      <WordLengthSelector
        onConfirm={(length, allowDupes) => {
          startNewGame(length, allowDupes);
        }}
      />
    );

  if (!gameId) return <p>Loading...</p>;

  return (
    <>
      <div className="game-layout">
        {gameOver && (
          <div className="stats-panel">
            <h2>{didWin ? "🎉 You won!" : "💀 Game Over"}</h2>
            <p>
              Word length: <strong>{wordLength}</strong>
            </p>
            <p>
              Allow duplicates:{" "}
              <strong>{allowDuplicates ? "Yes" : "No"}</strong>
            </p>
            <p>
              Attempts used: <strong>{guesses.length}</strong>
            </p>
            {didWin && (
              <p>
                Time: <strong>{duration} seconds</strong>
              </p>
            )}
            {!didWin && secretWord && (
              <p>
                The correct word was: <strong>{secretWord}</strong>
              </p>
            )}
          </div>
        )}

        <GameBoard
          wordLength={wordLength}
          guesses={guesses}
          currentGuess={currentGuess}
          feedbackList={feedbackList}
        />
      </div>

      {gameOver && (
        <div className="score-form">
          {didWin && !scoreSubmitted && (
            <>
              <label htmlFor="name">Enter your name:</label>
              <input
                id="name"
                type="text"
                className="name-input"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <button
                className="submit-score-btn"
                onClick={async () => {
                  try {
                    const res = await axios.post(
                      `/api/games/${gameId}/highscore`,
                      {
                        name: playerName,
                      }
                    );

                    if (res.status === 201) {
                      setScoreSubmitted(true);
                    }
                  } catch (err) {
                    console.error("Error submitting score:", err);
                    alert("Could not submit score. Please try again.");
                  }
                }}
              >
                Submit Score
              </button>
            </>
          )}
          {didWin && scoreSubmitted && (
            <p className="submitted-message">
              Your score has been submitted to the scoreboard!
            </p>
          )}
          <button className="play-again-btn" onClick={resetGame}>
            Play again
          </button>
        </div>
      )}

      {!gameOver && (
        <div className="keyboard-wrapper">
          <Keyboard onKeyPress={handleKeyPress} keyStatuses={keyStatuses} />
        </div>
      )}
    </>
  );
}

export default GamePage;
