import { useState } from "react";

function WordLengthSelector({ onConfirm }) {
  const [length, setLength] = useState(5);
  const [allowDuplicates, setAllowDuplicates] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(length, allowDuplicates);
  };

  return (
    <form onSubmit={handleSubmit} className="word-length-selector">
      <label htmlFor="word-length">Choose word length:</label>
      <input
        id="word-length"
        type="number"
        min="3"
        max="10"
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
      />

      <label htmlFor="allow-duplicates">
        <input
          id="allow-duplicates"
          type="checkbox"
          checked={allowDuplicates}
          onChange={(e) => setAllowDuplicates(e.target.checked)}
        />
        Allow duplicate letters
      </label>

      <button type="submit" className="confirm-length-btn">
        Confirm
      </button>
    </form>
  );
}

export default WordLengthSelector;
