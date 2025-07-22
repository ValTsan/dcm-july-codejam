import { useState } from "react";

import "./LandmarkList.css";
import LandmarkCard from "../LandmarkCard/LandmarkCard";
import landmarks from "../../utils/landmarks";

function LandmarkList({
  filter,
  sort,
  tripLandmarks,
  setTripLandmarks,
  onAddToTrip,
}) {
  const [selectedLandmark, setSelectedLandmark] = useState(null);

  const filteredLandmarks = landmarks.filter((landmark) => {
    const timeMatch =
      filter === "all" ||
      (filter === "gt1" && parseInt(landmark.time) > 1) ||
      (filter === "1to3" &&
        parseInt(landmark.time) >= 1 &&
        parseInt(landmark.time) <= 3) ||
      (filter === "lt3" && parseInt(landmark.time) < 3) ||
      landmark.type === filter;
    return timeMatch;
  });

  const sortedLandmarks = [...filteredLandmarks].sort((a, b) => {
    if (sort === "popularity") return b.popularity - a.popularity;
    if (sort === "rating") return b.popularity - a.popularity;
    if (sort === "alphabetical") return a.name.localeCompare(b.name);
    return 0;
  });

  const handleCardClick = (landmark) => {
    const detailedCard = document.getElementById(`detailed-${landmark.name}`);
    if (detailedCard) detailedCard.scrollIntoView({ behavior: "smooth" });
  };

  // const [tripLandmarks, setTripLandmarks] = useState([]);
  // const [filter, setFilter] = useState("all");
  // const [sort, setSort] = useState("popularity");

  // const filteredLandmarks = landmarks.filter(
  //   (l) => filter === "all" || l.type === filter
  // );

  // const sortedLandmarks = [...filteredLandmarks].sort((a, b) =>
  //   sort === "popularity"
  //     ? b.popularity - a.popularity
  //     : a.time.localeCompare(b.time)
  // );

  // const handleCardClick = (landmark) => {
  //   setSelectedLandmark(landmark);
  //   const detailedCard = document.getElementById(`detailed-${landmark.name}`);
  //   if (detailedCard) detailedCard.scrollIntoView({ behavior: "smooth" });
  // };

  // const handleAddToTrip = (landmark) => {
  //   if (!tripLandmarks.find((l) => l.name === landmark.name)) {
  //     setTripLandmarks([...tripLandmarks, landmark]);
  //   }
  // };

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

      {/* {sortedLandmarks.map((landmark) => (
        <LandmarkCard
          landmark={selectedLandmark}
          onClose={() => setSelectedLandmark(null)}
          tripLandmarks={tripLandmarks}
          setTripLandmarks={setTripLandmarks}
          onAddToTrip={onAddToTrip}
        />
      ))()} */}
    </div>
  );
}

export default LandmarkList;
