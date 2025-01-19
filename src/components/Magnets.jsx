import React, { useState } from "react";
import axios from "axios";

const Magnets = ({ onBack }) => {
  const [magnets, setMagnets] = useState([
    { id: 1, text: "Hello!", x: 100, y: 100 },
    { id: 2, text: "Family", x: 200, y: 150 },
    { id: 3, text: "Love", x: 150, y: 200 },
  ]);
  const [newMagnetText, setNewMagnetText] = useState("");
  const [draggingMagnet, setDraggingMagnet] = useState(null);
  const [error, setError] = useState("");

  const handleDragStart = (magnet) => {
    try {
      setDraggingMagnet(magnet);
      setError("");
    } catch (error) {
      setError("Failed to start dragging");
      console.error("Error starting drag:", error);
    }
  };

  const handleDrag = (e, magnetId) => {
    if (!draggingMagnet) return;

    try {
      const newMagnets = magnets.map((m) => {
        if (m.id === magnetId) {
          return {
            ...m,
            x: e.clientX,
            y: e.clientY,
          };
        }
        return m;
      });

      setMagnets(newMagnets);
      setError("");
    } catch (error) {
      setError("Failed to drag magnet");
      console.error("Error dragging magnet:", error);
    }
  };

  const handleDragEnd = () => {
    try {
      setDraggingMagnet(null);
      setError("");
    } catch (error) {
      setError("Failed to end dragging");
      console.error("Error ending drag:", error);
    }
  };

  const addMagnet = () => {
    if (!newMagnetText.trim()) {
      setError("Please enter magnet text");
      return;
    }

    try {
      const newMagnet = {
        id: Date.now(),
        text: newMagnetText.trim(),
        x: Math.random() * 300,
        y: Math.random() * 300,
      };

      setMagnets([...magnets, newMagnet]);
      setNewMagnetText("");
      setError("");
    } catch (error) {
      setError("Failed to add magnet");
      console.error("Error adding magnet:", error);
    }
  };

  return (
    <div className="magnet-board">
      <button onClick={onBack} className="mb-4">
        Back to Home
      </button>
      {error && <div className="error-message">{error}</div>}

      <div className="magnet-controls">
        <input
          type="text"
          value={newMagnetText}
          onChange={(e) => setNewMagnetText(e.target.value)}
          placeholder="New magnet text"
        />
        <button onClick={addMagnet}>Add Magnet</button>
      </div>

      <div className="magnet-area">
        {magnets.map((magnet) => (
          <div
            key={magnet.id}
            draggable
            onDragStart={() => handleDragStart(magnet)}
            onDrag={(e) => handleDrag(e, magnet.id)}
            onDragEnd={handleDragEnd}
            className="magnet"
            style={{
              left: magnet.x,
              top: magnet.y,
            }}
          >
            {magnet.text}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Magnets;
