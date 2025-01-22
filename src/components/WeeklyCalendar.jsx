import React, { useState, useEffect } from "react";
import {
  getWeeklyEvents,
  addWeeklyEvent,
  deleteWeeklyEvent,
  updateWeeklyEvent,
} from "../services/calendarService";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const WeeklyCalendar = ({ onBack }) => {
  const [events, setEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [newEvent, setNewEvent] = useState({ time: "", description: "" });
  const [error, setError] = useState("");
  const [editEventId, setEditEventId] = useState(null); // Track the event being edited
  const [updatedEvent, setUpdatedEvent] = useState({
    time: "",
    description: "",
  }); // Track updated event details

  const fetchEvents = async () => {
    try {
      const response = await getWeeklyEvents();
      setEvents(response.data);
      setError("");
    } catch (error) {
      setError("Failed to fetch events");
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = async () => {
    if (!selectedDay || !newEvent.time || !newEvent.description.trim()) {
      setError("Please fill out all fields!");
      return;
    }

    try {
      const response = await addWeeklyEvent(selectedDay, newEvent);
      setEvents((prev) => ({
        ...prev,
        [selectedDay]: response.data.events,
      }));
      setNewEvent({ time: "", description: "" });
      setSelectedDay(null);
      setError("");
    } catch (error) {
      setError("Failed to add event");
      console.error("Error adding event:", error);
    }
  };

  const handleRemoveEvent = async (day, eventId) => {
    try {
      const response = await deleteWeeklyEvent(day, eventId);
      setEvents((prev) => ({
        ...prev,
        [day]: response.data.events,
      }));
      setError("");
    } catch (error) {
      setError("Failed to remove event");
      console.error("Error removing event:", error);
    }
  };

  const handleEditClick = (day, event) => {
    setEditEventId(event._id);
    setUpdatedEvent({ time: event.time, description: event.description });
    setSelectedDay(day);
  };

  const handleSaveEdit = async (day, eventId) => {
    if (!updatedEvent.time || !updatedEvent.description.trim()) {
      setError("Fields cannot be empty!");
      return;
    }

    try {
      const response = await updateWeeklyEvent(day, eventId, updatedEvent);
      setEvents((prev) => ({
        ...prev,
        [day]: prev[day].map((event) =>
          event._id === eventId ? response.data : event
        ),
      }));
      setEditEventId(null);
      setUpdatedEvent({ time: "", description: "" });
      setError("");
    } catch (error) {
      setError("Failed to update event");
      console.error("Error updating event:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditEventId(null);
    setUpdatedEvent({ time: "", description: "" });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Weekly Calendar</h2>
      <button onClick={onBack} style={{ marginBottom: "20px" }}>
        Back to Fridge
      </button>
      {error && <div className="error-message">{error}</div>}
      <div className="calendar-container">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-box">
            <h3>{day}</h3>
            {(events[day] || []).map((event) => (
              <div
                key={event._id}
                className="event-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between", // Push elements to the edges
                  marginBottom: "10px",
                }}
              >
                {editEventId === event._id ? (
                  <>
                    <input
                      type="time"
                      value={updatedEvent.time}
                      onChange={(e) =>
                        setUpdatedEvent({
                          ...updatedEvent,
                          time: e.target.value,
                        })
                      }
                      style={{
                        marginRight: "5px",
                        padding: "5px",
                        borderRadius: "3px",
                      }}
                    />
                    <input
                      type="text"
                      value={updatedEvent.description}
                      onChange={(e) =>
                        setUpdatedEvent({
                          ...updatedEvent,
                          description: e.target.value,
                        })
                      }
                      style={{
                        marginRight: "5px",
                        padding: "5px",
                        borderRadius: "3px",
                      }}
                    />
                    <button
                      onClick={() => handleSaveEdit(day, event._id)}
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        fontSize: "10px",
                        padding: "5px",
                        borderRadius: "3px",
                        marginRight: "5px",
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        fontSize: "10px",
                        padding: "5px",
                        borderRadius: "3px",
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <strong>{event.time}</strong>
                      <p>{event.description}</p>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                      <button
                        onClick={() => handleEditClick(day, event)}
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          fontSize: "10px",
                          padding: "5px",
                          borderRadius: "3px",
                          marginLeft: "10px", // Push button closer to the right
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemoveEvent(day, event._id)}
                        style={{
                          backgroundColor: "gray",
                          color: "white",
                          fontSize: "10px",
                          padding: "5px",
                          borderRadius: "3px",
                          marginLeft: "5px",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
            <button onClick={() => setSelectedDay(day)}>Add Event</button>
          </div>
        ))}
      </div>

      {selectedDay && !editEventId && (
        <div className="event-form">
          <h3>Add Event for {selectedDay}</h3>
          <input
            type="time"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
          />
          <button onClick={handleAddEvent}>Add Event</button>
        </div>
      )}
    </div>
  );
};

export default WeeklyCalendar;
