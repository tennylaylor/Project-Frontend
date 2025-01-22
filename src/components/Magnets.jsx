import React, { useState, useEffect } from "react";

const Magnets = ({ onBack }) => {
  const [magnets, setMagnets] = useState([]);
  const [newMagnetText, setNewMagnetText] = useState("");
  const [draggingMagnetId, setDraggingMagnetId] = useState(null);
  const [editMagnetId, setEditMagnetId] = useState(null); // Track magnet being edited
  const [updatedText, setUpdatedText] = useState(""); // Track new text for editing

  // Fetch magnets from backend
  useEffect(() => {
    fetch("/api/magnets")
      .then((res) => res.json())
      .then((data) => setMagnets(data))
      .catch((error) => console.error("Error fetching magnets:", error));
  }, []);

  // Handle drag and drop
  const handleDragStart = (e, magnetId) => {
    setDraggingMagnetId(magnetId);
    e.dataTransfer.setData("text/plain", magnetId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggingMagnetId === null) return;

    const boardRect = e.currentTarget.getBoundingClientRect();
    const dropX = e.clientX - boardRect.left;
    const dropY = e.clientY - boardRect.top;

    setMagnets((prevMagnets) =>
      prevMagnets.map((magnet) =>
        magnet._id === draggingMagnetId
          ? { ...magnet, x: dropX, y: dropY }
          : magnet
      )
    );

    fetch(`/api/magnets/${draggingMagnetId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ x: dropX, y: dropY }),
    }).catch((error) =>
      console.error("Failed to update magnet position:", error)
    );

    setDraggingMagnetId(null);
  };

  // Add a new magnet
  const addMagnet = () => {
    if (!newMagnetText.trim()) {
      alert("Please enter magnet text");
      return;
    }

    const newMagnet = {
      text: newMagnetText.trim(),
      x: Math.random() * 300,
      y: Math.random() * 300,
    };

    fetch("/api/magnets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMagnet),
    })
      .then((res) => res.json())
      .then((data) => setMagnets([...magnets, data]))
      .catch((error) => console.error("Failed to add magnet:", error));

    setNewMagnetText("");
  };

  // Handle edit click
  const handleEditClick = (id, currentText) => {
    setEditMagnetId(id);
    setUpdatedText(currentText);
  };

  // Save edits
  const handleSaveEdit = async (id) => {
    const updatedMagnet = { text: updatedText };
    try {
      const response = await fetch(`/api/magnets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMagnet),
      });
      const data = await response.json();
      setMagnets((prev) =>
        prev.map((magnet) => (magnet._id === id ? data : magnet))
      );
      setEditMagnetId(null);
      setUpdatedText("");
    } catch (error) {
      console.error("Failed to update magnet:", error);
    }
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
        overflow: "hidden",
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
            key={magnet._id}
            draggable
            onDragStart={(e) => handleDragStart(e, magnet._id)}
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
            {editMagnetId === magnet._id ? (
              <>
                <input
                  type="text"
                  value={updatedText}
                  onChange={(e) => setUpdatedText(e.target.value)}
                />
                <button
                  style={{
                    backgroundColor: "darkgreen",
                    color: "white",
                    fontSize: "8px",
                    padding: "2px 5px",
                    borderRadius: "3px",
                    margin: "2px",
                  }}
                  onClick={() => handleSaveEdit(magnet._id)}
                >
                  Save
                </button>
                <button
                  style={{
                    backgroundColor: "darkred",
                    color: "white",
                    fontSize: "8px",
                    padding: "2px 5px",
                    borderRadius: "3px",
                    margin: "2px",
                  }}
                  onClick={() => setEditMagnetId(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{magnet.text}</span>
                <button
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    fontSize: "8px",
                    padding: "2px 5px",
                    borderRadius: "3px",
                    margin: "2px",
                  }}
                  onClick={() => handleEditClick(magnet._id, magnet.text)}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Magnets;
