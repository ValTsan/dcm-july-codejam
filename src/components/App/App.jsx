import { useState } from "react";
import mapboxgl from "mapbox-gl";

import "../App/App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Map from "../Map/Map";
import LandmarkList from "../LandmarkList/LandmarkList";
import Footer from "../Footer/Footer";

function App() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("popularity");

  //adding location data sets (from ds)
  //depends on what the team choose 1 or 2?
  //decide on the fonts
  //feels ui/ux - retro? old school game feel? modern sleek?
  //cards needs polishing - need cards
  //needs checkboxes or is it dropdown to choose sports/activities? UI
  //goal overall UI/UX friendly
  //remember only MVP
  //filtering / sorting logic?

  return (
    <div className="container">
      <Header />
      <Map
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />
      <LandmarkList
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
