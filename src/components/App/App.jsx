import { useState } from "react";
import mapboxgl from "mapbox-gl";

import "../App/App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Map from "../Map/Map";
import LandmarkList from "../LandmarkList/LandmarkList";
import LandmarkCard from "../LandmarkCard/LandmarkCard";
import Footer from "../Footer/Footer";
import landmarks from "../../utils/landmarks";
import Modals from "../../components/Modal";

function App() {
  const [startPark, setStartPark] = useState("");
  const [filters, setFilters] = useState("all");
  const [sort, setSort] = useState("popularity");
  const [selectedLandmark, setSelectedLandmark] = useState(landmarks[0]);

  return (
    <div className="container">
      <Header />
      <Main />
      <Map
        filter={filters}
        setFilters={setFilters}
        sort={sort}
        setSort={setSort}
      />
      <LandmarkList
        startPark={startPark}
        filter={filters}
        setFilters={setFilters}
        sort={sort}
        setSort={setSort}
        landmarks={landmarks}
        onClick={setSelectedLandmark}
      />
      <Footer />
      <Modals modalType={modalType} setModalType={setModalType} />
    </div>
  );
}

export default App;
