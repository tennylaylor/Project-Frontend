import React from "react";

const AboutPage = ({ onBack }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>About Page</h2>
      <p>
        Welcome to the About Page! Here we talk about the Family Fridge project.
      </p>
      <button
        onClick={onBack}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Back to Fridge
      </button>
    </div>
  );
};

export default AboutPage;
