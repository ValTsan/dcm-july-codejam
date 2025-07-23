import React from "react";

import "./DistanceBarChart.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import legDistance from "../../utils/leg-distance";

function DistanceBarChart({ tripLandmarks }) {
  if (!tripLandmarks || tripLandmarks.length === 0)
    return (
      <div className="barchart__container">
        <h2 className="barchart__title">Distance per Leg</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={legDistance}
            margin={{ top: 30, right: 30, left: 20, bottom: 200 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="leg"
              angle={-45}
              textAnchor="end"
              interval={0}
              tickFormatter={(value) => {
                const words = value.split("→");
                return words.length > 1 ? `${words[0].trim()} → ...` : value;
              }}
            />
            <YAxis
              label={{
                value: "Distance (km)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Bar dataKey="distance_km" fill="#ff6600" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
}

export default DistanceBarChart;
