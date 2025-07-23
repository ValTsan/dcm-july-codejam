import { useState } from "react";

import React from "react";
import "./LandmarkList.css";
import LandmarkCard from "../LandmarkCard/LandmarkCard";

function LandmarkList({
  filter,
  sort,
  landmarks,
  tripLandmarks,
  setTripLandmarks,
  onAddToTrip,
}) {
  const [selectedLandmark, setSelectedLandmark] = useState(null);

  //sort landmarks
  const sortedLandmarks = [...landmarks].sort((a, b) => {
    if (sort === "popularity" || sort === "rating")
      return b.popularity - a.popularity;
    if (sort === "rating") return b.popularity - a.popularity;
    if (sort === "alphabetical") return a.name.localeCompare(b.name);
    return 0;
  });

  const handleCardClick = (landmark) => {
    setSelectedLandmark(landmark);
    const detailedCard = document.getElementById(`detailed-${landmark.name}`);
    if (detailedCard) detailedCard.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="landmark-list" id="trails">
      <h2 className="landmark-list__title">Landmarks</h2>
      <p className="landmark-list__subtitle">
        Click on a landmark to see details
      </p>

      <div className="landmark-list__card-scroll">
        {sortedLandmarks.map((landmark, index) => (
          <div
            key={index}
            className={`landmark-list__card ${
              selectedLandmark?.name === landmark.name ? "selected" : ""
            }`}
            onClick={() => setSelectedLandmark(landmark)}
          >
            <img
              src={landmark.image}
              alt={landmark.name}
              className="landmark-list__image"
            />

            <div className="landmark-list__info" id="trails">
              <h3 className="landmark-list__name">{landmark.name}</h3>
              <p className="landmark-list__rating">
                ⭐ {landmark.popularity.toLocaleString()}
              </p>
              <span className="landmark-list__tag">{landmark.type}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedLandmark &&
        ((landmark) => (
          <LandmarkCard
            landmark={selectedLandmark}
            onClose={() => setSelectedLandmark(null)}
            tripLandmarks={tripLandmarks}
            setTripLandmarks={setTripLandmarks}
            onAddToTrip={onAddToTrip}
          />
        ))()}
    </div>
  );
}

export default LandmarkList;
