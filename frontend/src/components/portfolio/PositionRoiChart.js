import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getMarketChartsCrypto } from "../../actions/currencies";
import { getAmount } from "../../actions/aux";
import PositionRoiChartDiagram from "./PositionRoiChartDiagram";

const PositionRoiChart = ({ user, logedin }) => {
  let data = useLocation();

  const [marketChart, setMarketChart] = useState([]);

  useEffect(() => {
    const updateState = async () => {
      if (logedin) {
        const chartData = await getMarketChartsCrypto(
          user,
          data.state.currency
        );
        setMarketChart(chartData);
        console.log(marketChart);
      }
    };

    updateState();
  }, []);

  return marketChart.length === 0 ? (
    <div>Loading ...</div>
  ) : (
    <div>
      <Fragment>
        <PositionRoiChartDiagram
          marketChart={marketChart}
          amount={getAmount(user, data.state.currency)}
          currency={data.state.currency}
        />
      </Fragment>
    </div>
  );
};
export default PositionRoiChart;
