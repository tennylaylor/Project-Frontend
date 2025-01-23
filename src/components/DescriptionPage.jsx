import React from "react";

const DescriptionPage = ({ onBack }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Description Page</h2>
      <p>
        This page provides a detailed description of the Family Fridge features.
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

export default DescriptionPage;
