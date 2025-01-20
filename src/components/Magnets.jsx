import React, { useState } from "react";

const Magnets = ({ onBack }) => {
  const [magnets, setMagnets] = useState([
    { id: 1, text: "Hello!", x: 100, y: 100 },
    { id: 2, text: "Family", x: 200, y: 150 },
    { id: 3, text: "Love", x: 150, y: 200 },
  ]);
  const [newMagnetText, setNewMagnetText] = useState("");
  const [draggingMagnetId, setDraggingMagnetId] = useState(null);

  const handleDragStart = (e, magnetId) => {
    setDraggingMagnetId(magnetId);
    e.dataTransfer.setData("text/plain", magnetId); // Required for drag-and-drop
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow dropping
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e) => {
    e.preventDefault();

    if (draggingMagnetId === null) return;

    const boardRect = e.currentTarget.getBoundingClientRect(); // Get the bounding rectangle of the board
    const dropX = e.clientX - boardRect.left; // Adjust X to be relative to the board
    const dropY = e.clientY - boardRect.top; // Ad

    setMagnets((prevMagnets) =>
      prevMagnets.map((magnet) =>
        magnet.id === draggingMagnetId
          ? { ...magnet, x: dropX, y: dropY }
          : magnet
      )
    );

    setDraggingMagnetId(null);
  };

  const addMagnet = () => {
    if (!newMagnetText.trim()) {
      alert("Please enter magnet text");
      return;
    }

    const newMagnet = {
      id: Date.now(),
      text: newMagnetText.trim(),
      x: Math.random() * 300,
      y: Math.random() * 300,
    };

    setMagnets([...magnets, newMagnet]);
    setNewMagnetText("");
  };

  return (
    <div
      className="magnet-board"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        position: "relative",
        width: "95%",
        height: "100%",
        border: "1px solid black",
        overflow: "hidden", // Prevent magnets from being dropped outside
      }}
    >
      <button onClick={onBack} className="mb-4">
        Back to Home
      </button>
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
            onDragStart={(e) => handleDragStart(e, magnet.id)}
            className="magnet"
            style={{
              position: "absolute",
              left: `${magnet.x}px`,
              top: `${magnet.y}px`,
              cursor: "grab",
              backgroundColor: "lightblue",
              padding: "5px",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
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
