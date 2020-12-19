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
    if (duration) {
      currencyNamesArr.forEach(async (currencyName) => {
        const res = await getMarketChartsCrypto(
          user,
          currencyName,
          getCryptoCurrentDataObj(currencyName).current_price,
          duration
        );
        if (res instanceof Error) {
          const msg = "api call failed";
          triggerAlert(msg);
        } else {
          currenciesObject[currencyName] = res;
        }

        if (Object.keys(currenciesObject).length === currencyNamesArr.length) {
          setMarketCharts(currenciesObject);
          setLoaded(true);
        }
      });
    }
  }, [user, cryptoCurrencies, logedin, duration]);

  // getCryptoCurrentDataObj() retrieves currency object from props.cryptoCurrencies
  // the price attribute in this object is passed as parameter to getMarketChartsCrypto()
  const getCryptoCurrentDataObj = (currency) => {
    let currencyObj = {};
    if (cryptoCurrencies) {
      cryptoCurrencies.data.forEach((obj) => {
        if (obj.id === currency) currencyObj = obj;
      });
      return currencyObj;
    }
  };

  const setDurationState = (val) => {
    setDuration(val);
  };

  return !loaded ? (
    <div>Loading ...</div>
  ) : (
    <Fragment>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div onClick={() => setDurationState("day")}>day</div>
        <div onClick={() => setDurationState("week")}>week</div>
        <div onClick={() => setDurationState("month")}>month</div>
        <div onClick={() => setDurationState("all_total")}>all</div>
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
