// src/components/Canva.jsx
import React, { useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import "./style.scss";

export default function Canva() {
  const canvasRef = useRef(null);
  const [brushColor, setBrushColor] = useState("#000000");

  const clearCanvas = () => {
    canvasRef.current.clear();
  };

  const undoLastStroke = () => {
    canvasRef.current.undo();
  };

  const saveDrawing = () => {
    const data = canvasRef.current.getSaveData();
    console.log("Saved Drawing Data:", data);
  };

  const handleColorChange = (color) => {
    setBrushColor(color);
  };

  return (
    <div className="canva-container">
      <CanvasDraw
        ref={canvasRef}
        canvasWidth={800}
        canvasHeight={600}
        brushRadius={4}
        lazyRadius={0}
        brushColor={brushColor}
      />
      <div className="controls">
        <button onClick={clearCanvas}>Nettoyer</button>
        <button onClick={undoLastStroke}>Annuler</button>
        <button onClick={saveDrawing}>Sauvegarde</button>
        <div className="color-picker">
          <label>Choisis ta couleur:</label>
          <input
            type="color"
            value={brushColor}
            onChange={(e) => handleColorChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
