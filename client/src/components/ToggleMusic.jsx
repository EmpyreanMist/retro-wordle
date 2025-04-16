function ToggleMusic({ isPlaying, toggleMusic }) {
  return (
    <div className="music-container-button-wrapper">
      <button
        id="music-btn"
        onClick={(e) => {
          if (window.innerWidth > 768) {
            // PC = toggla musik
            toggleMusic();
          }
          // Mobil = gör inget här (klick på container sköter slider-visning)
        }}
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>
    </div>
  );
}

export default ToggleMusic;
