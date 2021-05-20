import React, { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

export default function Chart(props) {
  const database = firebase.database();
  const [collectedData, setCollectedData] = useState([]);
  const accelRef = database.ref(`${props.type}`);

  useEffect(() => {
    accelRef.limitToLast(30).on("value", (snapshot) => {
      const data = [];
      const values = snapshot.val();
      for (var log in values) {
        data.push(values[log]);
      }
      setCollectedData(data);
    }, (error) => {
      console.log("The read failed: " + error.code);
    });
  }, [])

  return (
    <LineChart width={450} height={300} data={collectedData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="data" stroke="#8884d8" />
      <CartesianGrid stroke="#CCC" strokeDasharray="5 5" />
      <XAxis dataKey="timestamp" fontFamily={'Roboto, sans-serif'} fontSize="12px" />
      <YAxis dataKey="data" fontFamily={'Roboto, sans-serif'} fontSize="12px" />
      <Tooltip />
    </LineChart>
  );
}