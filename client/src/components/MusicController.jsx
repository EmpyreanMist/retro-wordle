import { useEffect, useRef, useState } from "react";
import BackgroundMusic from "./BackgroundMusic";
import ToggleMusic from "./ToggleMusic";
import VolumeSlider from "./VolumeSlider";

function MusicController() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(window.innerWidth <= 768 ? 0.05 : 0.1);
  const [showSlider, setShowSlider] = useState(false);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current) {
        audioRef.current.volume = volume;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Could not play sound", err));
      }
      document.removeEventListener("click", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, [volume]);

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
        .catch((err) => console.log("Could not play sound", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <BackgroundMusic audioRef={audioRef} />
      <div
        className="music-container"
        onMouseEnter={() => {
          if (!isMobile) setShowSlider(true);
        }}
        onMouseLeave={() => {
          if (!isMobile) setShowSlider(false);
        }}
      >
        <ToggleMusic
          isPlaying={isPlaying}
          toggleMusic={toggleMusic}
          volume={volume}
        />

        {!isMobile && showSlider && (
          <VolumeSlider volume={volume} setVolume={setVolume} />
        )}
      </div>
    </>
  );
}

export default MusicController;
