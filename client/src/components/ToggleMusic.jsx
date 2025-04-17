function ToggleMusic({ isPlaying, volume, toggleMusic, setShowSlider }) {
  const handleClick = (e) => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      toggleMusic();
    } else {
      setShowSlider((prev) => !prev); // På mobil: toggla slidern
    }
    e.stopPropagation();
  };

  // Logik för vilken ikon som ska visas
  const icon = volume === 0 ? "🔇" : isPlaying ? "🔊" : "🔇";

  return (
    <button id="music-btn" onClick={handleClick}>
      {icon}
    </button>
  );
}

export default ToggleMusic;
