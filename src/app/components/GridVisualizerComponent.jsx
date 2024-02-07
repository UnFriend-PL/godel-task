import React, { useEffect, useRef } from "react";

function GridVisualizerComponent({ audioContext, src }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (audioContext) {
      const analyser = audioContext.createAnalyser();

      src.connect(analyser);
      analyser.fftSize = 64;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      function draw() {
        requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);

        context.fillStyle = "rgb(0, 0, 0)";
        context.fillRect(0, 0, canvas.width, canvas.height);

        const squareSize = canvas.width / 8;
        const borderSize = squareSize / 8;

        for (let j = 0; j < 8; j++) {
          for (let i = 0; i < 8; i++) {
            const barHeight = dataArray[i * 8 + j];

            context.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
            context.fillRect(
              i * squareSize + borderSize,
              canvas.height - (j * squareSize + borderSize) - squareSize,
              squareSize - 2 * borderSize,
              squareSize - 2 * borderSize
            );
          }
        }
      }

      draw();
    }
  }, [audioContext, src]);

  return <canvas ref={canvasRef} />;
}

export default GridVisualizerComponent;
