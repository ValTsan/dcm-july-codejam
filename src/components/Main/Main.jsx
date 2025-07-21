import { useState } from "react";
import Select from "react-select";
import "./Main.css";
import LandmarkList from "../LandmarkList/LandmarkList";
import landmarks from "../../utils/landmarks";

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

  // let filteredLandmarks = landmarks.filter((lm) => {
  //   // type filter
  //   const matchesType =
  //     filters.type === "" ||
  //     lm.type.toLowerCase() === filters.type.toLowerCase();

  //   // time filter
  //   const timeNum = parseFloat(lm.time);
  //   let matchesTime = true;
  //   if (filters.time === "gt1") matchesTime = timeNum > 1;
  //   else if (filters.time === "1to3")
  //     matchesTime = timeNum >= 1 && timeNum <= 3;
  //   else if (filters.time === "lt3") matchesTime = timeNum < 3;

  //   return matchesType && matchesTime;
  // });

  const filteredLandmarks = landmarks.filter((lm) => {
    const timeMatch =
      filters.type === "all" ||
      (filters.type === "gt1" && parseInt(lm.time) > 1) ||
      (filters.type === "1to3" &&
        parseInt(lm.time) >= 1 &&
        parseInt(lm.time) <= 3) ||
      (filters.type === "lt3" && parseInt(lm.time) < 3) ||
      lm.type === filters.type;
    return (
      timeMatch &&
      (filters.state === "" || lm.state === filters.state) &&
      lm.popularity >= filters.minPopularity
    );
  });

  // sorting logic
  if (sort === "popularity") {
    filteredLandmarks.sort((a, b) => b.popularity - a.popularity);
  } else if (sort === "alphabetical") {
    filteredLandmarks.sort((a, b) => a.name.localeCompare(b.name));
  }

  const totalDistance = tripLandmarks.length > 0 ? 1250 : 0;
  const totalStops = tripLandmarks.length;
  const totalDuration = tripLandmarks.length > 0 ? "7 days" : "0 days";

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
              <p className="main__trip-summary-label">Total Distance</p>
              <p className="main__trip-summary-value">{totalDistance} miles</p>
            </div>
            <div className="main__trip-summary-box">
              <p className="main__trip-summary-label">Number of Stops</p>
              <p className="main__trip-summary-value">{totalStops}</p>
            </div>
            <div className="main__trip-summary-box">
              <p className="main__trip-summary-label">Total Duration</p>
              <p className="main__trip-summary-value">{totalDuration}</p>
            </div>
          </div>
        </section>

        <section className="main__filters">
          <h2 className="main__filters-title">Filter Attractions</h2>

          <div className="main__filters-tags">
            <button
              className={`main__filters-tag ${
                filters.type === "all" ? "main__filters-tag--active" : ""
              }`}
              onClick={() =>
                setFilters((prev) => ({ ...filters, type: "all" }))
              }
            >
              All
            </button>
            <button
              className={`main__filters-tag ${
                filters.type === "national park"
                  ? "main__filters-tag--active"
                  : ""
              }`}
              onClick={() =>
                setFilters((prev) => ({ ...prev, type: "national park" }))
              }
            >
              National Park
            </button>
            <button
              className={`main__filters-tag ${
                filters.type === "natural wonder"
                  ? "main__filters-tag--active"
                  : ""
              }`}
              onClick={() =>
                setFilters((prev) => ({ ...prev, type: "national wonder" }))
              }
            >
              Natural Wonder
            </button>
            <button
              className={`main__filters-tag ${
                filters.type === "historic landmark"
                  ? "main__filters-tag--active"
                  : ""
              }`}
              onClick={() =>
                setFilters((prev) => ({ ...prev, type: "historic landmark" }))
              }
            >
              Historic Landmark
            </button>
            <button
              className={`main__filters-tag ${
                filters.type === "monument" ? "main__filters-tag--active" : ""
              }`}
              onClick={() =>
                setFilters((prev) => ({ ...prev, type: "monument" }))
              }
            >
              Monument
            </button>
            <button
              className={`main__filters-tag ${
                filters.type === "hidden" ? "main__filters-tag--active" : ""
              }`}
              onClick={() =>
                setFilters((prev) => ({ ...prev, type: "monument" }))
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
          landmarks={filteredLandmarks}
          sort={sort}
          tripLandmarks={tripLandmarks}
          setTripLandmarks={setTripLandmarks}
          onAddToTrip={handleAddToTrip}
        />
      </div>
    </div>
  );
}

export default Main;
