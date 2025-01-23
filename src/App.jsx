import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import React Router components

import FridgeHome from "./components/FridgeHome";
import AboutPage from "./components/AboutPage"; // Import the About page
import DescriptionPage from "./components/DescriptionPage"; // Import the Description page
import ContactPage from "./components/ContactPage"; // Import another themed page

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Define routes for each page */}
          <Route path="/" element={<FridgeHome />} /> {/* Home Page */}
          <Route path="/about" element={<AboutPage />} /> {/* About Page */}
          <Route path="/description" element={<DescriptionPage />} />{" "}
          {/* Description Page */}
          <Route path="/contact" element={<ContactPage />} />{" "}
          {/* Themed Page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
