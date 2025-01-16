import React, { useState, useEffect } from "react";
import axios from "axios";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const WeeklyCalendar = ({ onClose }) => {
  const [events, setEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [newEvent, setNewEvent] = useState({ time: "", description: "" });

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/calendar`
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Add a new event
  const addEvent = async () => {
    if (!selectedDay || !newEvent.time || !newEvent.description) {
      alert("Please fill out all fields!");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/calendar/${selectedDay}`,
        newEvent
      );
      setEvents((prev) => ({
        ...prev,
        [selectedDay]: response.data.events,
      }));
      setNewEvent({ time: "", description: "" }); // Reset the form
      setSelectedDay(null); // Close the form
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Remove an event
  const removeEvent = async (day, eventId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/calendar/${day}/${eventId}`
      );
      setEvents((prev) => ({
        ...prev,
        [day]: prev[day].filter((event) => event._id !== eventId),
      }));
    } catch (error) {
      console.error("Error removing event:", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Weekly Calendar</h2>
      <button onClick={onClose} style={{ marginBottom: "20px" }}>
        Back to Fridge
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically (if needed)
          gap: "10px",

          padding: "20px",
        }}
      >
        {daysOfWeek.map((day) => (
          <div
            key={day}
            style={{
              border: "1px solid black",
              width: "200px",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              padding: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)", // Optional shadow for better look
            }}
          >
            {/* Day Header */}
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {day}
            </div>

            {/* Events */}
            <div style={{ flex: 1 }}>
              {(events[day] || []).map((event) => (
                <div
                  key={event._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <input
                    type="radio"
                    onChange={() => removeEvent(day, event._id)}
                    style={{ marginRight: "5px" }}
                  />
                  <span>{event.description}</span>
                </div>
              ))}
            </div>

            {/* Add Event Button */}
            <button
              style={{
                padding: "5px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                cursor: "pointer",
                marginTop: "10px",
              }}
              onClick={() => setSelectedDay(day)}
            >
              Add Event
            </button>
          </div>
        ))}
      </div>

      {/* Add Event Form */}
      {selectedDay && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3>Add Event for {selectedDay}</h3>
          <input
            type="time"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            style={{ marginRight: "10px" }}
          />
          <input
            type="text"
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
            style={{ marginRight: "10px" }}
          />
          <button onClick={addEvent}>Add Event</button>
        </div>
      )}
    </div>
  );
};

export default WeeklyCalendar;
