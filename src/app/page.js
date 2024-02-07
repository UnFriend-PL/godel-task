"use client";
import React, { useRef, useState } from "react";
import CanvasComponent from "./components/CanvasComponent";

function Page() {
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [source, setSource] = useState(null);
  const audioRef = useRef(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const context = new (window.AudioContext || window.webkitAudioContext)();

    reader.onload = function (e) {
      audioRef.current.src = URL.createObjectURL(file);
      const src = context.createMediaElementSource(audioRef.current);

      const analyser = context.createAnalyser();
      src.connect(analyser);
      analyser.connect(context.destination);

      setAudioContext(context);
      setAnalyser(analyser);
      setSource(src);
    };

    reader.readAsArrayBuffer(file);
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <CanvasComponent analyser={analyser} />
      <audio
        ref={audioRef}
        controls
        onPlay={handlePlay}
        onPause={handlePause}
      ></audio>
    </div>
  );
}

export default Page;
