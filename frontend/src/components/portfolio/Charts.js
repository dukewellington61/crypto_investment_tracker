import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getMarketCharts } from "../../actions/currencies";
import MarketChartPriceRange from "./MarketChartPriceRange";

const Charts = () => {
  let data = useLocation();

  const [marketChart, setMarketChart] = useState({});

  // const [positions, setPostions] = useState([{}]);

  useEffect(() => {
    const updateStates = async () => {
      console.log(data.state.currency);
      const chartData = await getMarketCharts(
        data.state.currency,
        data.state.date_of_purchase
      );
      setMarketChart(chartData);
      // let positions = getCurrencyPositions(
      //   data.state.user,
      //   data.state.currency
      // );

      // setPostions(positions);
    };

    updateStates();
  }, []);

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  return isEmpty(marketChart) ? (
    <div>Loading ...</div>
  ) : (
    <div>
      <Fragment>
        <MarketChartPriceRange
          marketChart={marketChart}
          amount={data.state.amount}
        />
      </Fragment>
    </div>
  );
};

export default Charts;
