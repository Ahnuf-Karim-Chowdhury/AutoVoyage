import React, { useState } from "react";
import "./EVHub.css"; 

const EVHub = () => {
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [result, setResult] = useState(null);


  const vehicleDetails = {
    "Tesla Model S": "The Tesla Model S is a luxury electric sedan known for its impressive performance and technology. It offers a range of up to 405 miles on a single charge and can accelerate from 0 to 60 mph in as little as 1.99 seconds. The interior features a large 17-inch touchscreen, premium materials, and advanced driver-assistance systems. The starting price is around $90,000.",
    "Nissan Leaf": "The Nissan Leaf is a popular electric compact car with a range of up to 226 miles on a single charge. It offers a comfortable ride, modern technology, and a more affordable price compared to other electric vehicles. The Leaf includes features like Nissan's ProPILOT Assist and a spacious interior with a starting price around $28,000.",
    "Chevrolet Bolt": "The Chevrolet Bolt is an electric hatchback that provides a range of up to 259 miles on a single charge. It is known for its spacious interior, user-friendly tech features, and affordable price. The Bolt offers a quick acceleration and includes features such as Chevy's Safety Assist with a starting price around $26,000.",
    "Audi e-tron": "The Audi e-tron is a luxury electric SUV that combines performance with high-end features. It has a range of up to 222 miles and offers a smooth, quiet ride. The e-tron includes a sophisticated interior with advanced technology, such as virtual cockpit and multiple driver assistance systems, with a starting price around $70,000."
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedVehicle) {
      setResult(vehicleDetails[selectedVehicle] || "Details not available.");
    } else {
      setResult("Please select a vehicle.");
    }
  };

  return (
    <div className="EVHub">
      <h2>Electric Vehicle Hub</h2>
      <form onSubmit={handleSubmit}>
        <div className="question">
          <p>Which electric vehicle are you interested in?</p>
          <select
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
          >
            <option value="">Select a vehicle</option>
            <option value="Tesla Model S">Tesla Model S</option>
            <option value="Nissan Leaf">Nissan Leaf</option>
            <option value="Chevrolet Bolt">Chevrolet Bolt</option>
            <option value="Audi e-tron">Audi e-tron</option>
          </select>
        </div>
        <button type="submit">Find Details</button>
      </form>

      {result && (
        <div className="result">
          <h3>Result</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default EVHub;
