import { useState } from "react";

import React from "react";
import Select from "react-select";
import "./Main.css";
import LandmarkList from "../LandmarkList/LandmarkList";
import landmarks from "../../utils/landmarks";
import legDistance from "../../utils/leg-distance";

const sortOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "rating", label: "Rating" },
  { value: "alphabetical", label: "Alphabetical" },
];

const timeOptions = [
  { value: "any", label: "Any Duration" },
  { value: "gt1", label: "> 1 Hour" },
  { value: "1to3", label: "1–3 Hours" },
  { value: "lt3", label: "< 3 Hours" },
];

function Main() {
  const [filters, setFilters] = useState({
    type: "",
    time: "any",
  });
  const [sort, setSort] = useState("popularity");
  const [tripLandmarks, setTripLandmarks] = useState([]);

  // add to trip
  const handleAddToTrip = (landmark) => {
    if (!tripLandmarks.find((l) => l.name === landmark.name)) {
      setTripLandmarks([...tripLandmarks, landmark]);
    }
  };

  // filter logic
  const filteredLandmarks = landmarks.filter((lm) => {
    const typeMatch =
      filters.type === "all" || lm.type === filters.type || filters.type === "";

    const timeNum = parseFloat(lm.time);
    let timeMatch = true;
    if (filters.time === "gt1") timeMatch = timeNum > 1;
    else if (filters.time === "1to3") timeMatch = timeNum >= 1 && timeNum <= 3;
    else if (filters.time === "lt3") timeMatch = timeNum < 3;

    return typeMatch && timeMatch;
  });

  // sorting logic
  if (sort === "popularity") {
    filteredLandmarks.sort((a, b) => b.popularity - a.popularity);
  } else if (sort === "alphabetical") {
    filteredLandmarks.sort((a, b) => a.name.localeCompare(b.name));
  }

  // trip summary logic
  const getTripLegs = (tripLandmarks) => {
    const legs = [];

    for (let i = 0; i < tripLandmarks.length - 1; i++) {
      const from = landmarks[i].name;
      const to = landmarks[i + 1].name;
      const legName = `${from} → ${to}`;
      console.log("Generated Leg:", legName);
      legs.push(legName);
    }
    return legs;
  };

  const tripLegs = getTripLegs(tripLandmarks);
  const totalStops = tripLandmarks.length;
  const totalDistance = tripLegs.reduce((sum, legName) => {
    const match = legDistance.find((leg) => leg.leg === legName);
    return sum + (match?.distance_km || 0);
  }, 0);

  return (
    <div className="main">
      <div className="main__content">
        <section className="main__trip-summary">
          <h3 className="main__trip-summary-title">Your Trip Summary</h3>
          <p className="main__trip-summary-subtitle">
            Customize your perfect summer adventure
          </p>

          <div className="main__trip-summary-boxes">
            <div className="main__trip-summary-box">
              <p className="main__trip-summary-label">Landmarks</p>
              <p className="main__trip-summary-value">{tripLegs} miles</p>
            </div>
            <div className="main__trip-summary-box">
              <p className="main__trip-summary-label">Number of Stops</p>
              <p className="main__trip-summary-value">{totalStops}</p>
            </div>
            <div className="main__trip-summary-box">
              <p className="main__trip-summary-label">Total Distance</p>
              <p className="main__trip-summary-value">{totalDistance}</p>
            </div>
          </div>
        </section>

        <section className="main__filters">
          <h2 className="main__filters-title">Filter Attractions</h2>

          <div className="main__filters-tags">
            <button
              className={`main__filters-tag ${
                filters.type === "All" ? "main__filters-tag--active" : ""
              }`}
              onClick={() =>
                setFilters((prev) => ({ ...filters, type: "all" }))
              }
            >
              All
            </button>
            <button
              className={`main__filters-tag ${
                filters.type === "National Park"
                  ? "main__filters-tag--active"
                  : ""
              }`}
              onClick={() =>
                setFilters((prev) => ({ ...prev, type: "National Park" }))
              }
            >
              National Park
            </button>
            <button
              className={`main__filters-tag ${
                filters.type === "Natural Wonder"
                  ? "main__filters-tag--active"
                  : ""
              }`}
              onClick={() =>
                setFilters((prev) => ({ ...prev, type: "Natural Wonder" }))
              }
            >
              Natural Wonder
            </button>
            <button
              className={`main__filters-tag ${
                filters.type === "Historic Landmark"
                  ? "main__filters-tag--active"
                  : ""
              }`}
              onClick={() =>
                setFilters((prev) => ({ ...prev, type: "Historic Landmark" }))
              }
            >
              Historic Landmark
            </button>
            <button
              className={`main__filters-tag ${
                filters.type === "Monument" ? "main__filters-tag--active" : ""
              }`}
              onClick={() =>
                setFilters((prev) => ({ ...prev, type: "Monument" }))
              }
            >
              Monument
            </button>
            <button
              className={`main__filters-tag ${
                filters.type === "Hidden" ? "main__filters-tag--active" : ""
              }`}
              onClick={() =>
                setFilters((prev) => ({ ...prev, type: "Monument" }))
              }
            >
              Hidden Gems
            </button>
          </div>

          <div className="main__filters-controls">
            <div>
              <label className="main__filters-label">Sort By</label>
              <Select
                className="main__filters-select"
                classNamePrefix="react-select"
                options={sortOptions}
                onChange={(option) => setSort(option.value)}
                defaultValue={sortOptions[0]}
              />
            </div>

            <div>
              <label className="main__filters-label">Time Required</label>
              <Select
                className="main__filters-select"
                classNamePrefix="react-select"
                options={timeOptions}
                onChange={(option) =>
                  setFilters((prev) => ({ ...prev, time: option.value }))
                }
                defaultValue={timeOptions[0]}
              />
            </div>
          </div>
        </section>

        <LandmarkList
          filter={filters}
          sort={sort}
          landmarks={filteredLandmarks}
          tripLandmarks={tripLandmarks}
          setTripLandmarks={setTripLandmarks}
          onAddToTrip={handleAddToTrip}
        />
      </div>
    </div>
  );
}

export default Main;
