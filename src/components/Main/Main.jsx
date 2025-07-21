import { useState } from "react";
import Select from "react-select";
import "./Main.css";

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
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("popularity");

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
              <p className="main__trip-summary-value">1,250 miles</p>
            </div>
            <div className="main__trip-summary-box">
              <p className="main__trip-summary-label">Number of Stops</p>
              <p className="main__trip-summary-value">8</p>
            </div>
            <div className="main__trip-summary-box">
              <p className="main__trip-summary-label">Total Duration</p>
              <p className="main__trip-summary-value">7 days</p>
            </div>
          </div>
        </section>

        <section className="main__filters">
          <h2 className="main__filters-title">Filter Attractions</h2>

          <div className="main__filters-tags">
            <button className="main__filters-tag main__filters-tag--active">
              All
            </button>
            <button className="main__filters-tag">Nature</button>
            <button className="main__filters-tag">Architecture</button>
            <button className="main__filters-tag">Historical</button>
            <button className="main__filters-tag">Cultural</button>
            <button className="main__filters-tag">Hidden Gems</button>
          </div>

          <div className="main__filters-controls">
            <div>
              <label className="main__filters-label">Sort By</label>
              <Select
                className="main__filters-select"
                classNamePrefix="react-select"
                options={sortOptions}
                defaultValue={sortOptions[0]}
              />
            </div>

            <div>
              <label className="main__filters-label">Time Required</label>
              <Select
                className="main__filters-select"
                classNamePrefix="react-select"
                options={timeOptions}
                defaultValue={timeOptions[0]}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Main;
