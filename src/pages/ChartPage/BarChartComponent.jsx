import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function BarChartComponent({ data, color }) {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(300);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth * 0.2);
      setHeight(window.innerHeight * 0.2);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BarChart
      width={width}
      height={200}
      data={data}
      margin={{
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis dataKey="count" />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill={color} />
    </BarChart>
  );
}