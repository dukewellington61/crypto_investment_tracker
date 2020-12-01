import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getMarketCharts } from "../../actions/currencies";

const Charts = () => {
  let data = useLocation();

  const [marketChart, setMarketChart] = useState({});

  useEffect(() => {
    const updateMarketChart = async () => {
      const chartData = await getMarketCharts(data.state.currency);
      setMarketChart(chartData);
    };

    updateMarketChart();
  }, []);

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  return isEmpty(marketChart) ? (
    <div>Loading ...</div>
  ) : (
    <div>
      {!isEmpty(marketChart) &&
        marketChart.data.prices.map((el) => (
          <div style={{ display: "flex" }}>
            <p>{el[0]}</p>
            <p>{el[1]}</p>
          </div>
        ))}
    </div>
  );
};

export default Charts;
