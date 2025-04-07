import '../styles/infoPage.css';

function InfoPage() {
  const infoList = [
    'Choose a word length between 3 and 10 letters before starting the game.',
    'You have 6 attempts to guess the hidden word',
    'After each guess, the tiles give you feedback on how accurate your guess was:',
    'Grey: The letter is not in the word.',
    'Yellow: The letter is in the word, but in the wrong position.',
    'Green: The letter is correct and on the right position.',
  ];

  const keyboardInfo = [
    'You can use your physical keyboard or the on-screen keyboard to type.',
    "Press 'Enter' to submit your guess and 'Backspace' to delete",
    'The on-screen keyboard also gives feedback:',
    '- Red: The letter is not in the word',
    '- Green: The letter is included in the word',
    'Yellow letters will only appear in the game grid, not on the keyboard',
  ];

  const scoreInfo = [
    "If you guess the correct word, you'll be able to enter your name.",
    'Your score includes number of guesses, word length and time taken.',
    'Your result will be visible on the scorepage.',
  ];

  const aboutMe = [
    "Hi! I'm Christian, and I created this game as part of my journey into web development.",
    'The frontend is build with React and styled with CSS modules',
    'The backend uses Express and MongoDB to manage words and high scores.',
  ];

  return (
    <>
      <div className="info-section">
        <h2>How to Play</h2>
        <ul className="animated-ul delay-1">
          {infoList.map((info, index) => (
            <li key={index}>{info}</li>
          ))}
        </ul>
      </div>

      <div className="info-section">
        <h2>Keyboard Controls & Feedback</h2>
        <ul className="animated-ul delay-2">
          {keyboardInfo.map((info, index) => (
            <li key={index}>{info}</li>
          ))}
        </ul>
      </div>

      <div className="info-section">
        <h2>Scoring & Scoreboard</h2>
        <ul className="animated-ul delay-3">
          {scoreInfo.map((info, index) => (
            <li key={index}>{info}</li>
          ))}
        </ul>
      </div>

      <div className="info-section">
        <h2>About the Developer</h2>
        <ul className="animated-ul delay-4">
          {aboutMe.map((info, index) => (
            <li key={index}>{info}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default InfoPage;
