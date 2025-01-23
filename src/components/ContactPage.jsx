import React from "react";

const ContactPage = ({ onBack }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Contact Page</h2>
      <p>If you have questions, feel free to contact us!</p>
      <button
        onClick={onBack}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Back to Fridge
      </button>
    </div>
  );
};

export default ContactPage;
