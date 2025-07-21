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

    // const landmarks = [
    //   {
    //     name: "Grand Canyon National Park",
    //     coords: [-112.0866, 36.0575],
    //     type: "national park",
    //     state: "California",
    //     popularity: 92,
    //     time: "5h",
    //     icon: "🏜️",
    //   },
    //   {
    //     name: "Yosemite National Park",
    //     coords: [-119.5383, 37.8651],
    //     type: "national park",
    //     state: "Arizona",
    //     popularity: 90,
    //     time: "4h",
    //     icon: "🏞️",
    //   },

    //   {
    //     name: "Yellowstone National Park",
    //     coords: [-110.5885, 44.428],
    //     type: "national park",
    //     state: "Wyoming",
    //     popularity: 88,
    //     time: "6h",
    //     icon: "🌄",
    //   },
    //   {
    //     name: "Zion National Park",
    //     coords: [-113.0263, 37.2982],
    //     type: "national park",
    //     state: "Utah",
    //     popularity: 85,
    //     time: "3.5h",
    //     icon: "🏔️",
    //   },
    //   {
    //     name: "Mount Rushmore",
    //     coords: [-103.4538, 43.8803],
    //     type: "monument",
    //     state: "South Dakota",
    //     popularity: 87,
    //     time: "4h",
    //     icon: "☘️",
    //   },
    //   {
    //     name: "Great Smoky Mountains",
    //     coords: [-83.4987, 35.6118],
    //     type: "natural wonder",
    //     state: "Tennessee",
    //     popularity: 89,
    //     time: "4.5h",
    //     icon: "🗻",
    //   },
    //   {
    //     name: "Statue of Liberty",
    //     coords: [-74.0445, 40.6892],
    //     type: "historic landmark",
    //     state: "New York",
    //     popularity: 83,
    //     time: "3h",
    //     icon: "🗽",
    //   },
    //   {
    //     name: "Arches National Park",
    //     coords: [-109.5746, 38.7328],
    //     type: "national park",
    //     state: "Utah",
    //     popularity: 84,
    //     time: "4h",
    //     icon: "🌅",
    //   },
    //   {
    //     name: "Niagara Falls",
    //     coords: [-79.0377, 43.0962],
    //     type: "natural wonder",
    //     state: "New York",
    //     popularity: 86,
    //     time: "5h",
    //     icon: "👾",
    //   },
    //   {
    //     name: "Golden Gate Bridge",
    //     coords: [-80.8874, 25.2866],
    //     type: "landmark",
    //     state: "California",
    //     popularity: 82,
    //     time: "3.5h",
    //     icon: "🏔️",
    //   },
    // ];

    // const filteredLandmarks = landmarks.filter(
    //   (landmark) => filter === "all" || landmark.type === filter
    // );
    // const sortedLandmarks = [...filteredLandmarks].sort((a, b) =>
    //   sort === "popularity"
    //     ? b.popularity - a.popularity
    //     : a.time.localeCompare(b.time)
    // );

    // if (startPark) {
    //   const startIndex = landmarks.findIndex(
    //     (landmark) => landmark.name === startPark
    //   );
    //   if (startIndex !== -1) {
    //   }

    //   map.on("load", () => {
    //     map.addSource("route", {
    //       type: "geojson",
    //       data: {
    //         type: "Feature",
    //         properties: {},
    //         geometry: {
    //           type: "LineString",
    //           coordinates: landmarks.map((landmark) => landmark.coords),
    //         },
    //       },
    //     });

    //     map.addLayer({
    //       id: "route",
    //       type: "line",
    //       source: "route",
    //       layout: { "line-join": "round", "line-cap": "round" },
    //       paint: { "line-color": "#0c0c0bff", "line-width": 5 },
    //     });

    //     //emoji markers
    //     sortedLandmarks.forEach((landmark) => {
    //       const el = document.createElement("div");
    //       el.className = "retro-marker";
    //       el.innerHTML = landmark.icon;
    //       new mapboxgl.Marker({ element: el })
    //         .setLngLat(landmark.coords)
    //         .addTo(map);
    //     });
    //   });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} className="map-container"></div>;
}

export default DefaultMap;
