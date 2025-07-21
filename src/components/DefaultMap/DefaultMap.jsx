import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./DefaultMap.css";
import landmarks from "../../utils/landmarks";

function DefaultMap({ startPark, filter, sort }) {
  const mapContainer = useRef(null);

  useEffect(() => {
    const mapboxToken =
      "pk.eyJ1IjoidmFsdHNhbiIsImEiOiJjbWQ5NHJkdTIwNDFlMmtvZG9saDJlc3Y0In0.l01AoUmEDFryNDuGnfiZXg";
    if (!mapboxToken) {
      console.error("Mapbox token is not set.");
      return;
    }

    if (!mapContainer.current) {
      console.error("Map container is not available!");
      return;
    }

    mapboxgl.accessToken = mapboxToken;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-95.7129, 37.0902],
      zoom: 3.5,
      pitch: 0,
    });

    const filteredLandmarks = landmarks.filter(
      (landmark) => filter === "all" || landmark.type === filter
    );
    const sortedLandmarks = [...filteredLandmarks].sort((a, b) =>
      sort === "popularity"
        ? b.popularity - a.popularity
        : a.time.localeCompare(b.time)
    );

    map.on("load", () => {
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: landmarks.map((landmark) => landmark.coords),
          },
        },
      });

      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#0c0c0bff", "line-width": 5 },
      });

      //emoji markers
      sortedLandmarks.forEach((landmark) => {
        const el = document.createElement("div");
        el.className = "retro-marker";
        el.innerHTML = landmark.image;
        new mapboxgl.Marker({ element: el })
          .setLngLat(landmark.coords)
          .addTo(map);
      });
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} className="map-container"></div>;
}

export default DefaultMap;
