import React, { Fragment, useState, useEffect } from "react";
import { getMarketChartsCrypto } from "../../actions/currencies";
import { cumulativeValueInvestment } from "../../actions/aux";
import CurrencyTotalChartDiagram from "./CurrencyTotalChartDiagram";
import { useLocation } from "react-router-dom";

const CurrencyTotalChart = ({ user, logedin }) => {
  const currency = sessionStorage.getItem("crypto_currency");

  const data = useLocation();

  const [marketChart, setMarketChart] = useState([]);

  const [currencyTotal, setCurrencyTotal] = useState({});

  useEffect(() => {
    const updateState = async () => {
      if (logedin) {
        const chartData = await getMarketChartsCrypto(user, currency);
        setMarketChart(chartData);

        setCurrencyTotal(
          cumulativeValueInvestment(user.positions, chartData, currency)
        );
      }
    };

    updateState();
  }, [user, logedin]);

  useEffect(() => {}, [marketChart]);

  return marketChart.length === 0 ? (
    <div>Loading ...</div>
  ) : (
    <div>
      <Fragment>
        <CurrencyTotalChartDiagram
          currencyTotal={currencyTotal}
          currency={currency}
          fiat={user.positions[0].fiat_currency}
          origin={data.state.origin}
        />
      </Fragment>
    </div>
  );
};
export default CurrencyTotalChart;
