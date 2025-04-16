import "../styles/music.css";

function VolumeSlider({ volume, setVolume }) {
  return (
    <div className="volume-slider">
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        orient="vertical"
      />
    </div>
  );
}

export default VolumeSlider;
