import { useState } from "react";
import React, { Suspense } from "react";
import mapboxgl from "mapbox-gl";

import "../App/App.css";
import Modal from "../Modal/Modal";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Map from "../Map/Map";
import LandmarkList from "../LandmarkList/LandmarkList";
import LandmarkCard from "../LandmarkCard/LandmarkCard";
import DistanceBarChart from "../DistanceBarChart/DistanceBarChart";
import Footer from "../Footer/Footer";
import landmarks from "../../utils/landmarks";

function App() {
  const [filters, setFilters] = useState("all");
  const [sort, setSort] = useState("popularity");
  const [tripLandmarks, setTripLandmarks] = useState([]);
  const [modalType, setModalType] = useState(null);
  const onAddToTrip = (landmark) => {
    if (!tripLandmarks.find((l) => l.name === landmark.name)) {
      setTripLandmarks([...tripLandmarks, landmark]);
    }
  };

  return (
    <div className="container">
      <Header setModalType={setModalType} />
      <Main />
      <Map
        filter={filters}
        setFilters={setFilters}
        sort={sort}
        setSort={setSort}
      />
      <DistanceBarChart tripLandmarks={tripLandmarks} />
      <Footer />
      <Modal modalType={modalType} setModalType={setModalType} />
    </div>
  );
}

export default App;
