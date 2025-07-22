import React from "react";
import "./Map.css";
import DefaultMap from "../DefaultMap/DefaultMap";

function Map() {
  const MapToRender = DefaultMap;

  return (
    <section className="map">
      <h2 className="map__title">Explore the Route</h2>
      <MapToRender filter="all" sort="popularity" />
    </section>
  );
}

export default Map;
