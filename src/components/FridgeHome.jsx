import React from "react";
import TodoList from "./TodoList";
import WeeklyCalendar from "./WeeklyCalendar";
import Magnets from "./Magnets";
import Photo from "./Photo";
import AboutPage from "./AboutPage";
import DescriptionPage from "./DescriptionPage";
import ContactPage from "./ContactPage";

const FridgeHome = () => {
  const [activeComponent, setActiveComponent] = React.useState("home");

  const renderComponent = () => {
    switch (activeComponent) {
      case "todo":
        return <TodoList onBack={() => setActiveComponent("home")} />;
      case "calendar":
        return <WeeklyCalendar onBack={() => setActiveComponent("home")} />;
      case "magnets":
        return <Magnets onBack={() => setActiveComponent("home")} />;
      case "photos":
        return <Photo onBack={() => setActiveComponent("home")} />;
      case "about":
        return <AboutPage onBack={() => setActiveComponent("home")} />;
      case "description":
        return <DescriptionPage onBack={() => setActiveComponent("home")} />;
      case "contact":
        return <ContactPage onBack={() => setActiveComponent("home")} />;
      default:
        return (
          <div className="nav-grid">
            <button
              className="nav-button"
              onClick={() => setActiveComponent("todo")}
            >
              📝 Todo List
            </button>
            <button
              className="nav-button"
              onClick={() => setActiveComponent("calendar")}
            >
              📅 Calendar
            </button>
            <button
              className="nav-button"
              onClick={() => setActiveComponent("magnets")}
            >
              🧲 Magnets
            </button>
            <button
              className="nav-button"
              onClick={() => setActiveComponent("photos")}
            >
              📸 Photos
            </button>
            <button
              className="nav-button"
              onClick={() => setActiveComponent("about")}
            >
              📖 About
            </button>
            <button
              className="nav-button"
              onClick={() => setActiveComponent("description")}
            >
              📜 Description
            </button>
            <button
              className="nav-button"
              onClick={() => setActiveComponent("contact")}
            >
              📧 Contact
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fridge-container">
      <div className="fridge-door">
        <h1
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            color: "#2c3e50",
            fontSize: "2.5rem",
            fontFamily: '"Comic Sans MS", cursive',
          }}
        >
          Family Fridge
        </h1>
        {renderComponent()}
      </div>
    </div>
  );
};

export default FridgeHome;
