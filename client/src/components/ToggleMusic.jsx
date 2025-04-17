function ToggleMusic({ isPlaying, volume, toggleMusic }) {
  const handleClick = (e) => {
    toggleMusic();
    e.stopPropagation();
  };

  const icon = volume === 0 || !isPlaying ? "🔇" : "🔊";

  return (
    <button id="music-btn" onClick={handleClick}>
      {icon}
    </button>
  );
}

export default ToggleMusic;
