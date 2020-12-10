import React, { Fragment, useState, useEffect } from "react";
import { getMarketChartsCrypto } from "../../actions/currencies";
import PositionRoiChartDiagram from "./PositionRoiChartDiagram";

const PositionRoiChart = ({ user, logedin }) => {
  const currency = sessionStorage.getItem("crypto_currency");

  const [marketChart, setMarketChart] = useState([]);

  useEffect(() => {
    const updateState = async () => {
      if (logedin) {
        const chartData = await getMarketChartsCrypto(user, currency);
        setMarketChart(chartData);
      }
    };

    updateState();
  }, [user, logedin]);

  return marketChart.length === 0 ? (
    <div>Loading ...</div>
  ) : (
    <div>
      <Fragment>
        <PositionRoiChartDiagram
          positions={user.positions}
          marketChart={marketChart}
          currency={currency}
        />
      </Fragment>
    </div>
  );
};
export default PositionRoiChart;
