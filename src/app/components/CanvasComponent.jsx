import React, { useRef, useEffect } from "react";

function CanvasComponent({ analyser }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (analyser) {
      visualize();
    }
  }, [analyser]);

  const visualize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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

  return <canvas ref={canvasRef} width="500" height="200"></canvas>;
}

export default CanvasComponent;
