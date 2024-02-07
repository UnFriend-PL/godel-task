"use client";
import React, { useRef, useState } from "react";

function Page() {
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [source, setSource] = useState(null);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [buffer, setBuffer] = useState(null);
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
      visualize();
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const visualize = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / dataArray.length) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      barHeight = dataArray[i];

      ctx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
      ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

      x += barWidth + 1;
    }

    window.animationFrameId = requestAnimationFrame(visualize);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <canvas ref={canvasRef} width="500" height="200"></canvas>
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
