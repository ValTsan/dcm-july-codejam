import React from "react";
import Plot from "react-plotly.js";
import legDistance from "../../utils/leg-distance";

function BarChart() {
  return (
    <div className="barchart__container">
      <Plot
        data={[
          {
            x: legDistance.map((d) => d.leg),
            y: legDistance.map((d) => d.distance_km),
            type: "bar",
            marker: { color: "#ff6600" },
          },
        ]}
        layout={{
          title: "Optimized Route: Distance per Leg (km)",
          margin: { t: 50, b: 120, r: 40, l: 60 },
          xaxis: { tickangle: -45, automargin: true },
          yaxis: { title: "Distance (km)", automargin: true },
          autosize: true,
          responsive: true,
        }}
      />
    </div>
  );
}

export default BarChart;
