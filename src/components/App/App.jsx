import { useState } from "react";
import React, { Suspense } from "react";
import mapboxgl from "mapbox-gl";

import "../App/App.css";
import Modal from "../Modal/Modal";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Map from "../Map/Map";
import LandmarkList from "../LandmarkList/LandmarkList";
// import LandmarkCard from "../LandmarkCard/LandmarkCard";
import DistanceBarChart from "../DistanceBarChart/DistanceBarChart";
import Footer from "../Footer/Footer";
import landmarks from "../../utils/landmarks";

// finalize app
// clean up code

// filter logic? keep working or just make is static due to deadline?
// ds wants to add more graphs and charts
// landmark cards rendering 2, which one you want up or down?
// modals for login and sign up finalize
// your trip summary - hard code entries?
// footer finalize
//

function App() {
  const [filters, setFilters] = useState("all");
  const [sort, setSort] = useState("popularity");
  const [tripLandmarks, setTripLandmarks] = useState([]);
  const [modalType, setModalType] = useState(null);

  return (
    <div className="container">
      <Header setModalType={setModalType} />
      <Modal modalType={modalType} setModalType={setModalType} />
      <Main />
      <Map
        filter={filters}
        setFilters={setFilters}
        sort={sort}
        setSort={setSort}
      />
      <LandmarkList
        filter={filters}
        setFilters={setFilters}
        sort={sort}
        setSort={setSort}
        landmarks={landmarks}
        tripLandmarks={tripLandmarks}
        setTripLandmarks={setTripLandmarks}
        // onAddToTrip={handleAddToTrip}
      />
      <DistanceBarChart />
      <Footer />
    </div>
  );
}

export default App;
