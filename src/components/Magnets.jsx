import React, { useState, useEffect } from "react";

const Magnets = ({ onBack }) => {
  const [magnets, setMagnets] = useState([]);
  const [newMagnetText, setNewMagnetText] = useState(""); //state for the new magnet text
  const [draggingMagnetId, setDraggingMagnetId] = useState(null); //state to track dragged magnet
  const [editMagnetId, setEditMagnetId] = useState(null); // Track magnet being edited
  const [updatedText, setUpdatedText] = useState(""); // Track new text for editing

  // Fetch magnets from backend
  useEffect(() => {
    fetch("/api/magnets")
      .then((res) => res.json())
      .then((data) => setMagnets(data)) // set magnets in state
      .catch((error) => console.error("Error fetching magnets:", error));
  }, []);

  // Handle drag and drop
  const handleDragStart = (e, magnetId) => {
    setDraggingMagnetId(magnetId); // save the ID of the dragged magnet
    e.dataTransfer.setData("text/plain", magnetId); //required for drag-and-drop
    e.dataTransfer.effectAllowed = "move"; // allow the move action
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // prevent default behavior to allow drop
    e.dataTransfer.dropEffect = "move"; // indicate move action
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggingMagnetId === null) return; //exit if no magnet is being dragged

    const boardRect = e.currentTarget.getBoundingClientRect(); // get the boards dimensions
    const dropX = e.clientX - boardRect.left; // calucate  the new X position
    const dropY = e.clientY - boardRect.top; // calculate  the new Y position

    // update magnet position locally in route
    setMagnets((prevMagnets) =>
      prevMagnets.map((magnet) =>
        magnet._id === draggingMagnetId
          ? { ...magnet, x: dropX, y: dropY }
          : magnet
      )
    );
    //send the updated position to the backend
    fetch(`/api/magnets/${draggingMagnetId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ x: dropX, y: dropY }),
    }).catch((error) =>
      console.error("Failed to update magnet position:", error)
    );

    setDraggingMagnetId(null); //clear dragging state
  };

  // Add a new magnet
  const addMagnet = () => {
    if (!newMagnetText.trim()) {
      alert("Please enter magnet text");
      return;
    }

    const newMagnet = {
      text: newMagnetText.trim(), // trim white space from input
      x: Math.random() * 300, //set random X position
      y: Math.random() * 300, // set random Y position
    };
    //send the new magnet to the backend
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

  // Delete a magnet
  const handleDeleteMagnet = (id) => {
    fetch(`/api/magnets/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json()) //parse response json
      .then(() =>
        setMagnets((prevMagnets) => prevMagnets.filter((m) => m._id !== id))
      ) // remove deleted magnet from state
      .catch((error) => console.error("Failed to delete magnet:", error));
  };

  // start editing a magnet
  const handleEditClick = (id, currentText) => {
    setEditMagnetId(id); // set the magnet  ID being edited
    setUpdatedText(currentText); // set the current text in the input
  };

  // save changes to a magnets text
  const handleSaveEdit = async (id) => {
    const updatedMagnet = { text: updatedText }; // make updated data
    try {
      const response = await fetch(`/api/magnets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMagnet),
      });
      const data = await response.json();
      setMagnets((prev) =>
        prev.map((magnet) => (magnet._id === id ? data : magnet))
      ); // update magnet in state
      setEditMagnetId(null); //clear edit state
      setUpdatedText(""); // clear input field
    } catch (error) {
      console.error("Failed to update magnet:", error);
    }
  };

  return (
    <div //container for magnet board
      className="magnet-board"
      onDragOver={handleDragOver} // Allow magnets to be dragged over the board
      onDrop={handleDrop} // Handle the dropping of magnets onto the board
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
          type="text" // Input field to enter text for a new magnet
          value={newMagnetText} // Controlled input bound to `newMagnetText` state
          onChange={(e) => setNewMagnetText(e.target.value)} // Update state when text changes
          placeholder="New magnet text"
        />
        <button onClick={addMagnet}>Add Magnet</button>
      </div>

      <div className="magnet-area">
        {magnets.map((magnet) => (
          <div
            key={magnet._id}
            draggable
            onDragStart={(e) => handleDragStart(e, magnet._id)} //handle drag for this magnet
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
                  onChange={(e) => setUpdatedText(e.target.value)} //update state when text changes
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
                  onClick={() => handleSaveEdit(magnet._id)} // save function on click
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
                  onClick={() => setEditMagnetId(null)} //reset edit state on cancel
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
                  onClick={() => handleEditClick(magnet._id, magnet.text)} // call edit function
                >
                  ++
                </button>
                <button
                  style={{
                    backgroundColor: "gray",
                    color: "white",
                    fontSize: "8px",
                    padding: "2px 5px",
                    borderRadius: "3px",
                    marginLeft: "10px",
                  }}
                  onClick={() => handleDeleteMagnet(magnet._id)} // call delete function
                >
                  --
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
