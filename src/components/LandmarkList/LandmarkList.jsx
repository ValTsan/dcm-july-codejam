import LandmarkCard from "../LandmarkCard/LandmarkCard";
import "./LandmarkList.css";

function LandmarkList({ filter, setFilter, sort, setSort }) {
  const landmarks = [
    {
      name: "Grand Canyon National Park",
      coords: [-112.0866, 36.0575],
      type: "national park",
      state: "California",
      popularity: 92,
      time: "5h",
      icon: "🏜️",
    },
    {
      name: "Yosemite National Park",
      coords: [-119.5383, 37.8651],
      type: "national park",
      state: "Arizona",
      popularity: 90,
      time: "4h",
      icon: "🏞️",
    },

    {
      name: "Yellowstone National Park",
      coords: [-110.5885, 44.428],
      type: "national park",
      state: "Wyoming",
      popularity: 88,
      time: "6h",
      icon: "🌄",
    },
    {
      name: "Zion National Park",
      coords: [-113.0263, 37.2982],
      type: "national park",
      state: "Utah",
      popularity: 85,
      time: "3.5h",
      icon: "🏔️",
    },
    {
      name: "Mount Rushmore",
      coords: [-103.4538, 43.8803],
      type: "monument",
      state: "South Dakota",
      popularity: 87,
      time: "4h",
      icon: "☘️",
    },
    {
      name: "Great Smoky Mountains",
      coords: [-83.4987, 35.6118],
      type: "natural wonder",
      state: "Tennessee",
      popularity: 89,
      time: "4.5h",
      icon: "🗻",
    },
    {
      name: "Statue of Liberty",
      coords: [-74.0445, 40.6892],
      type: "historic landmark",
      state: "New York",
      popularity: 83,
      time: "3h",
      icon: "🗽",
    },
    {
      name: "Arches National Park",
      coords: [-109.5746, 38.7328],
      type: "national park",
      state: "Utah",
      popularity: 84,
      time: "4h",
      icon: "🌅",
    },
    {
      name: "Niagara Falls",
      coords: [-79.0377, 43.0962],
      type: "natural wonder",
      state: "New York",
      popularity: 86,
      time: "5h",
      icon: "👾",
    },
    {
      name: "Golden Gate Bridge",
      coords: [-80.8874, 25.2866],
      type: "landmark",
      state: "California",
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
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
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
    </div>
  );
}

export default LandmarkList;
