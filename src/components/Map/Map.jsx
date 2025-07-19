import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";

function Map({ filter, sort }) {
  const mapContainer = useRef(null);

  useEffect(() => {
    // mapboxgl.setTelemetryEnabled(false);
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
      //   center: [-119.4179, 36.7783],
      center: [-95.7129, 37.0902],
      zoom: 3.5,
      pitch: 0,
    });

    //10 selected national parks (can change later on)
    const landmarks = [
      {
        name: "Yosemite",
        coords: [-119.5383, 37.8651],
        type: "nature",
        popularity: 90,
        time: "4h",
        icon: "🏞️",
      },
      {
        name: "Grand Canyon",
        coords: [-112.0866, 36.0575],
        type: "nature",
        popularity: 92,
        time: "5h",
        icon: "🏜️",
      },
      {
        name: "Yellowstone",
        coords: [-110.5885, 44.428],
        type: "nature",
        popularity: 88,
        time: "6h",
        icon: "🌄",
      },
      {
        name: "Zion",
        coords: [-113.0263, 37.2982],
        type: "nature",
        popularity: 85,
        time: "3.5h",
        icon: "🏔️",
      },
      {
        name: "Rocky Mountain",
        coords: [-105.6836, 40.3402],
        type: "nature",
        popularity: 87,
        time: "4h",
        icon: "☘️",
      },
      {
        name: "Great Smoky Mountains",
        coords: [-83.4987, 35.6118],
        type: "nature",
        popularity: 89,
        time: "4.5h",
        icon: "🗻",
      },
      {
        name: "Acadia",
        coords: [-68.2427, 44.3753],
        type: "nature",
        popularity: 83,
        time: "3h",
        icon: "🌅",
      },
      {
        name: "Olympic",
        coords: [-123.6842, 47.7806],
        type: "nature",
        popularity: 84,
        time: "4h",
        icon: "🌅",
      },
      {
        name: "Glacier",
        coords: [-113.787, 48.7596],
        type: "nature",
        popularity: 86,
        time: "5h",
        icon: "👾",
      },
      {
        name: "Everglades",
        coords: [-80.8874, 25.2866],
        type: "nature",
        popularity: 82,
        time: "3.5h",
        icon: "🏔️",
      },
    ];

    const filteredLandmarks = landmarks.filter(
      (landmark) => filter === "all" || landmark.type === filter
    );
    const sortedLandmarks = [...filteredLandmarks].sort((a, b) =>
      sort === "popularity"
        ? b.popularity - a.popularity
        : a.time.localeCompare(b.time)
    );

    sortedLandmarks.forEach((landmark) => {
      const el = document.createElement("div");
      el.className = "retro-marker";
      el.innerHTML = landmark.icon;
      new mapboxgl.Marker({ element: el })
        .setLngLat(landmark.coords)
        .addTo(map);
    });

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
        paint: { "line-color": "#ffcc00", "line-width": 4 },
      });
    });
    // locations.forEach((loc) => {
    //   new mapboxgl.Marker({ element: createRetroMarker(loc.icon) })
    //     .setLngLat(loc.coords)
    //     .addTo(map);
    // });

    return () => map.remove();
  }, []);

  // const createRetroMarker = (icon) => {
  //   const el = document.createElement("div");
  //   el.className = "retro-marker";
  //   el.innerHTML = icon;
  //   return el;
  // };

  return <div ref={mapContainer} className="map-container"></div>;
}

export default Map;
