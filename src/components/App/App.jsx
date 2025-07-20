import { useState } from "react";
import mapboxgl from "mapbox-gl";

import "../App/App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import DefaultMap from "../DefaultMap/DefaultMap";
import CustomDSMap from "../CustomDSMap/CustomDSMap";
import LandmarkList from "../LandmarkList/LandmarkList";
import Footer from "../Footer/Footer";

function App() {
  const [startPark, setStartPark] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("popularity");

  return (
    <div className="container">
      <Header />
      <Main />
      <DefaultMap
        startPark={startPark}
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />
      <CustomDSMap />
      <LandmarkList
        startPark={startPark}
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />

      <Footer />
    </div>
  );
}

export default App;
