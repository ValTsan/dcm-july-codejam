import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";

function Map() {
  const mapContainer = useRef(null);

  useEffect(() => {
    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
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
      center: [-119.4179, 36.7783],
      zoom: 5,
    });

    //Static retro-style marker (placeholder) -- or is sportsMarker better??
    const locations = [
      {
        name: "Santa Cruz",
        coords: [-122.0308, 36.9741],
        icon: "🏄",
      },
      { name: "Moab", coords: [-109.5498, 38.5733], icon: "🚴" },
      { name: "Yosemite", coords: [-119.5383, 37.8651], icon: "🥾" },
    ];

    locations.forEach((loc) => {
      new mapboxgl.Marker({ element: createRetroMarker(loc.icon) })
        .setLngLat(loc.coords)
        .addTo(map);
    });

    return () => map.remove();
  }, []);

  const createRetroMarker = (icon) => {
    const el = document.createElement("div");
    el.className = "retro-marker";
    el.innerHTML = icon;
    return el;
  };

  return <div ref={mapContainer} className="map-container"></div>;
}

export default Map;
