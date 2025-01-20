# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Project-Frontend

Interactive Fridge Application
Overview
The Interactive Fridge is a fun and practical web application that combines tools for daily productivity, like a to-do list and a weekly calendar, with creative features like photo management. Built with the MERN stack (MongoDB, Express, React, Node.js), this project serves as a demonstration of my full-stack development skills.

Key Features
1.To-Do List:
`Add, update, and delete tasks.
 `Organize tasks with priority levels (low, medium, high).
`Tasks are stored in the backend for persistence.

2.Weekly Calendar:
`Plan your week by adding events to specific days.
 `View, update, and delete events as needed.
`Events are grouped by day for easy management.

3.Photo Gallery:
`Upload and display photos.
 `Add captions and delete photos.
`Uses file upload handling for a simple photo manager.

4.Fridge Home:
`A central hub for navigation between the app's features.
 `Styled like a virtual fridge for a fun and creative user experience.

How It Works

Frontend:
`React is used to build the user interface.
 `React Hooks manage state efficiently across components.
`CSS provides a polished, responsive design with visually appealing styles.

Backend:
`Node.js and Express power the server.
 `MongoDB stores data for tasks and events.
`Axios is used for communication between the frontend and backend.

APIs:
1.To-Do List API:
GET /api/todos: Fetch all tasks.
POST /api/todos: Add a new task.
PUT /api/todos/:id: Update a task.
DELETE /api/todos/:id: Delete a task.

2.Weekly Calendar API:
GET /api/calendar: Fetch weekly events.
POST /api/calendar/:day: Add an event to a specific day.
DELETE /api/calendar/:day/:eventId: Delete an event.

Setup Instructions

1. Clone the Repository
   git clone https://github.com/tennylaylor/Project-Frontend.git
   
   git clone https://github.com/tennylaylor/Project_Backend.git

cd Family_Fridge/Frontend
cd Family_Fridge/Backend

2. Install Dependencies
   Frontend:
   cd frontend
   npm install
   Backend:
   cd backend
   npm install

3. Configure Environment Variables
   Create a .env file in the backend directory.
   MONGO_URI=mongodb+srv://Tennylaylor:<****\*\*****>>@elantris.r5x1a.mongodb.net/?retryWrites=true&w=majority
   VITE_BACKEND_URL=http://localhost:5000

# Server Port

PORT=5000

4. Start the Application
   Backend:
   cd backend
   npm start

Frontend:
cd frontend
npm run dev
Visit http://localhost:5173 to access the app.

Frontend:.env:
REACT_APP_BACKEND_URL=http://localhost:5000
VITE_BACKEND_URL=http://localhost:5000
