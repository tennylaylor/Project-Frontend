import React, { useState, useEffect } from "react";
import {
  getWeeklyEvents,
  addWeeklyEvent,
  deleteWeeklyEvent,
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
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await getWeeklyEvents();
      setEvents(response.data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch events");
      console.error("Error fetching events:", error);
    }
  };

  const handleAddEvent = async () => {
    if (!selectedDay || !newEvent.time || !newEvent.description) {
      alert("Please fill out all fields!");
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
      setError(null);
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
      setError(null);
    } catch (error) {
      setError("Failed to remove event");
      console.error("Error removing event:", error);
    }
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
              <div key={event._id} className="event-item">
                <div>
                  <strong>{event.time}</strong>
                  <p>{event.description}</p>
                </div>
                <button onClick={() => handleRemoveEvent(day, event._id)}>
                  ×
                </button>
              </div>
            ))}
            <button onClick={() => setSelectedDay(day)}>Add Event</button>
          </div>
        ))}
      </div>

      {selectedDay && (
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
