import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./DefaultMap.css";
import landmarks from "../../utils/landmarks";

function DefaultMap({ filter, sort }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

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

    mapRef.current = map;
    return () => map.remove();
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // remove existing layers
    if (map.getLayer("route")) map.removeLayer("route");
    if (map.getSource("route")) map.removeSource("route");

    // clear existing markers
    const markerEls = document.querySelectorAll(".custom-marker");
    markerEls.forEach((el) => el.remove());

    // filter landmarks
    const filteredLandmarks = landmarks.filter((landmark) => {
      return filter === "all" || landmark.type === filter;
    });

    // sort landmarks
    const sortedLandmarks = [...filteredLandmarks].sort((a, b) => {
      if (sort === "popularity") {
        return b.popularity - a.popularity;
      } else if (sort === "alphabetical") {
        return a.name.localeCompare(b.name);
      } else {
        return parseFloat(a.time) - parseFloat(b.time);
      }
    });

    // draw route
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
        paint: { "line-color": "#ff6a00", "line-width": 5 },
      });
    });

    // image markers
    sortedLandmarks.forEach((landmark) => {
      const el = document.createElement("div");
      el.className = "custom-marker";

      const img = document.createElement("img");
      img.src = landmark.image;
      img.alt = landmark.name;
      img.style.width = "50px";
      img.style.height = "50px";
      img.style.borderRadius = "50%";
      img.style.objectFit = "cover";
      img.style.border = "3px solid #ffff";
      img.style.boxShadow = "0 0 6px rgba(0, 0, 0, 0.3)";

      el.appendChild(img);

      new mapboxgl.Marker({ element: el })
        .setLngLat(landmark.coords)
        .addTo(map);
    });
  }, [filter, sort]);

  return <div ref={mapContainer} className="map-container"></div>;
}

export default DefaultMap;
