import React, { useRef, useState, useEffect } from "react";
import "../css/MusicaFondo.css";

function MusicaFondo() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handlePlayMusic = async () => {
      if (!audioRef.current) return;

      try {
        if (!isPlaying) {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error("Error al reproducir el audio:", error);
      }
    };

    document.body.addEventListener("click", handlePlayMusic);

    return () => {
      document.body.removeEventListener("click", handlePlayMusic);
    };
  }, [isPlaying]);

  const toggleMusic = (event) => {
    event.stopPropagation();

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div>
      <button onClick={toggleMusic} className="music-button">
        {isPlaying ? "⏸" : "▶"}
      </button>
      <audio ref={audioRef} loop>
        <source src="/public/audio/Cancion.mp3" type="audio/mp3" />
      </audio>
    </div>
  );
}

export default MusicaFondo;
