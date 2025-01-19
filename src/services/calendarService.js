import axios from "axios";

const API_URL = "http://localhost:5000/api/calendar";

export const getWeeklyEvents = () => axios.get(API_URL);
export const addWeeklyEvent = (day, event) =>
  axios.post(`${API_URL}/${day}`, event);
export const deleteWeeklyEvent = (day, eventId) =>
  axios.delete(`${API_URL}/${day}/${eventId}`);
