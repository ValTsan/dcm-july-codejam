import "./Main.css";

function Main({}) {
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
              <p className="main__trip-summar-label">Total Distance</p>
              <p className="main__trip-summar-value">1,250 miles</p>
            </div>
            <div className="main__trip-summary-box">
              <p className="main__trip-summar-label">Number of Stops</p>
              <p className="main__trip-summar-value">8</p>
            </div>
            <div className="main__trip-summary-box">
              <p className="main__trip-summar-label">Total Duration</p>
              <p className="main__trip-summar-value">7 days</p>
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
              <select className="main__filters-select">
                <option>Popularity</option>
                <option>Rating</option>
                <option>Alphabetical</option>
              </select>
            </div>

            <div>
              <label className="main__filters-label">Time Required</label>
              <select className="main__filters-select">
                <option>Any Duration</option>
                <option>&gt; 1 Hour</option>
                <option>1–3 Hours</option>
                <option>&lt; 3 Hours</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Main;
