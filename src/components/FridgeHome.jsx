import React, { useState } from "react";
import WeeklyCalendar from "./WeeklyCalendar";

const FridgeHome = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div>
      {showCalendar ? (
        <WeeklyCalendar onClose={() => setShowCalendar(false)} />
      ) : (
        <div>
          <h1>Schedule</h1>
          <button onClick={() => setShowCalendar(true)}>
            Open Weekly Calendar
          </button>
        </div>
      )}
    </div>
  );
};

export default FridgeHome;
