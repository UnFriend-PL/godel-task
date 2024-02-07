"use client";
import React, { useState, useRef } from "react";

export default function Home() {
  const [audioFile, setAudioFile] = useState(null);
  const audioRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };

  const handlePlay = () => {
    if (audioFile) {
      const audioURL = URL.createObjectURL(audioFile);
      audioRef.current.src = audioURL;
      audioRef.current.play();
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handlePlay}>Play</button>

      <div className="grid-container"></div>

      <audio ref={audioRef} controls />
    </div>
  );
}
