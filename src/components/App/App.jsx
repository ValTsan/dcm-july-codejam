import { useState } from "react";
import mapboxgl from "mapbox-gl";

import "../App/App.css";
import Header from "../Header/Header";
import Map from "../Map/Map";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function App() {
  //adding location data sets (from ds)
  //depends on what the team choose 1 or 2?
  //decide on the fonts
  //feels ui/ux - retro? old school game feel? modern sleek?
  //cards needs polishing - need cards
  //needs checkboxes or is it dropdown to choose sports/activities? UI
  //goal overall UI/UX friendly
  //remember only MVP

  return (
    <div className="container">
      <p className="title">ULTIMATE SUMMER SPORTS ADVENTURE </p>
      <Header />
      <Map
      //Itinerary can be added here later on with data from ds
      />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
