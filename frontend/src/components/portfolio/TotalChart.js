import React, { Fragment, useState, useEffect } from "react";
import { getMarketChartsCrypto } from "../../actions/currencies";
import { getCurrenciesNames } from "../../actions/aux";
import TotalChartDiagramm from "./TotalChartDiagramm";
import { useLocation } from "react-router-dom";

function TotalChart({ user, cryptoCurrencies, logedin, triggerAlert }) {
  const data = useLocation();

  const [marketCharts, setMarketCharts] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [duration, setDuration] = useState("all_total");

  useEffect(() => {
    let currenciesObject = {};
    const currencyNamesArr = getCurrenciesNames(user);

    currencyNamesArr.forEach(async (currencyName) => {
      const res = await getMarketChartsCrypto(
        user,
        currencyName,
        marketCharts.current_price,
        duration
      );
      if (res instanceof Error) {
        console.log(res.response.data);
        // const msg = "api call failed";
        triggerAlert(res.response.data);
      } else {
        currenciesObject[currencyName] = res;
      }

      // if (Object.keys(currenciesObject).length === currencyNamesArr.length) {
      setMarketCharts(currenciesObject);
      setLoaded(true);
      // }
    });
  }, [user, cryptoCurrencies, logedin]);

  const setDurationState = (val) => {
    // console.log(marketCharts);
    setDuration(val);
  };

  return !loaded ? (
    <div>Loading ...</div>
  ) : (
    <Fragment>
      <div id="durations_container">
        <div
          id={duration === "day" && "duration"}
          className="durations"
          onClick={() => setDurationState("day")}
        >
          day
        </div>
        <div
          id={duration === "week" && "duration"}
          className="durations"
          onClick={() => setDurationState("week")}
        >
          week
        </div>
        <div
          id={duration === "month" && "duration"}
          className="durations"
          onClick={() => setDurationState("month")}
        >
          month
        </div>
        <div
          id={duration === "all_total" && "duration"}
          className="durations"
          onClick={() => setDurationState("all_total")}
        >
          all
        </div>
      </div>
      <div>
        <TotalChartDiagramm
          marketCharts={marketCharts}
          positions={user.positions}
          fiat={user.positions[0].fiat_currency}
          origin={data.state.origin}
          duration={duration}
        />
      </div>
    </Fragment>
  );
}

export default TotalChart;
