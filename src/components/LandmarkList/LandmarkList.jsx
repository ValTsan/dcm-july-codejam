import LandmarkCard from "../LandmarkCard/LandmarkCard";
import "./LandmarkList.css";

function LandmarkList({ filter, setFilter, sort, setSort }) {
  const landmarks = [
    {
      name: "Yosemite",
      coords: [-119.5383, 37.8651],
      type: "nature",
      popularity: 90,
      time: "4h",
      icon: "🏞️",
    },
    {
      name: "Grand Canyon",
      coords: [-112.0866, 36.0575],
      type: "nature",
      popularity: 92,
      time: "5h",
      icon: "🏜️",
    },
    {
      name: "Yellowstone",
      coords: [-110.5885, 44.428],
      type: "nature",
      popularity: 88,
      time: "6h",
      icon: "🌄",
    },
    {
      name: "Zion",
      coords: [-113.0263, 37.2982],
      type: "nature",
      popularity: 85,
      time: "3.5h",
      icon: "🏔️",
    },
    {
      name: "Rocky Mountain",
      coords: [-105.6836, 40.3402],
      type: "nature",
      popularity: 87,
      time: "4h",
      icon: "☘️",
    },
    {
      name: "Great Smoky Mountains",
      coords: [-83.4987, 35.6118],
      type: "nature",
      popularity: 89,
      time: "4.5h",
      icon: "🗻",
    },
    {
      name: "Acadia",
      coords: [-68.2427, 44.3753],
      type: "nature",
      popularity: 83,
      time: "3h",
      icon: "🌅",
    },
    {
      name: "Olympic",
      coords: [-123.6842, 47.7806],
      type: "nature",
      popularity: 84,
      time: "4h",
      icon: "🌅",
    },
    {
      name: "Glacier",
      coords: [-113.787, 48.7596],
      type: "nature",
      popularity: 86,
      time: "5h",
      icon: "👾",
    },
    {
      name: "Everglades",
      coords: [-80.8874, 25.2866],
      type: "nature",
      popularity: 82,
      time: "3.5h",
      icon: "🏔️",
    },
  ];

  const filteredLandmarks = landmarks.filter(
    (landmark) => filter === "all" || landmark.type === filter
  );
  const sortedLandmarks = [...filteredLandmarks].sort((a, b) =>
    sort === "popularity"
      ? b.popularity - a.popularity
      : a.time.localeCompare(b.time)
  );

  const totalDistance = 2500; //needs to change? what's the basis? from and to?
  const totalStops = sortedLandmarks.length; // starting point??

  return (
    <div className="landmark-list">
      <div className="landmark-list__controls">
        <select
          className="landmark-list__filter"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option value="all">All Types</option>
          <option value="nature">Nature</option>
        </select>
        <select onChange={(e) => setSort(e.target.value)} value={sort}>
          <option value="popularity">Popularity</option>
          <option value="time">Time Required</option>
        </select>
      </div>
      <div className="landmark-list__card-scroll">
        {sortedLandmarks.map((landmark, index) => (
          <LandmarkCard key={index} landmark={landmark} />
        ))}
      </div>
      <div className="landmark-list__trip-summary">
        <p>Total Distance: {totalDistance} miles</p>
        <p>Number of Stops: {totalStops}</p>
      </div>
    </div>
  );
}

export default LandmarkList;
