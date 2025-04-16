import { useEffect, useRef, useState } from "react";
import BackgroundMusic from "./BackgroundMusic";
import ToggleMusic from "./ToggleMusic";
import VolumeSlider from "./VolumeSlider";

function MusicController() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.1);
  const [showSlider, setShowSlider] = useState(false);

  // Autoplay på första interaktion
  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.1;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Kunde inte spela upp ljud", err));
      }
      document.removeEventListener("click", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  // Uppdatera volym vid förändring
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((err) => console.log("Kunde inte spela upp ljud", err));
    }
    setIsPlaying(!isPlaying);
  };

  // Avgör om vi är på mobil (enkel check)
  const isMobile = window.innerWidth <= 768;

  return (
    <>
      <BackgroundMusic audioRef={audioRef} />
      <div
        className="music-container"
        onClick={(e) => {
          e.stopPropagation();
          if (isMobile) {
            setShowSlider((prev) => !prev);
          }
        }}
        onMouseEnter={() => {
          if (!isMobile) setShowSlider(true);
        }}
        onMouseLeave={() => {
          if (!isMobile) setShowSlider(false);
        }}
      >
        <ToggleMusic isPlaying={isPlaying} toggleMusic={toggleMusic} />
        {showSlider && <VolumeSlider volume={volume} setVolume={setVolume} />}
      </div>
    </>
  );
}

export default MusicController;
