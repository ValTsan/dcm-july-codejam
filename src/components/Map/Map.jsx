import "./Map.css";
import DefaultMap from "../DefaultMap/DefaultMap";
import CustomDSMap from "../CustomDSMap/CustomDSMap";

function Map() {
  const MapToRender = DefaultMap || CustomDSMap;

  return (
    <section className="map">
      <h2 className="map__title">Explore the Route</h2>
      <MapToRender filter="all" sort="popularity" />
    </section>
  );
}

export default Map;
