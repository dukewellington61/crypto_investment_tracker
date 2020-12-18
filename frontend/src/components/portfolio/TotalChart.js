import React, { useState, useEffect } from "react";
import { getMarketChartsCrypto } from "../../actions/currencies";
import { getCurrenciesNames } from "../../actions/aux";
import TotalChartDiagramm from "./TotalChartDiagramm";
import { useLocation } from "react-router-dom";

function TotalChart({ user, cryptoCurrencies, logedin }) {
  const data = useLocation();

  const [marketCharts, setMarketCharts] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const updateState = async () => {
      if (logedin && cryptoCurrencies.data) {
        let currenciesObject = {};

        // getCryptoCurrentDataObj() retrieves currency object from props.cryptoCurrencies
        // the price attribute in this object is passed as parameter to getMarketChartsCrypto()
        const getCryptoCurrentDataObj = (currency) => {
          let currencyObj = {};
          cryptoCurrencies.data.forEach((obj) => {
            if (obj.id === currency) currencyObj = obj;
          });
          return currencyObj;
        };

        const earliestDate = getEarliestPurchaseDate();
        const currencyNamesArr = getCurrenciesNames(user);
        currencyNamesArr.forEach(async (currencyName) => {
          const res = await getMarketChartsCrypto(
            user,
            currencyName,
            getCryptoCurrentDataObj(currencyName).current_price,
            earliestDate
          );
          currenciesObject[currencyName] = res;

          if (
            Object.keys(currenciesObject).length === currencyNamesArr.length
          ) {
            setMarketCharts(currenciesObject);
            setLoaded(true);
          }
        });
      }
    };

    const getEarliestPurchaseDate = () => {
      const res = user.positions.sort(
        (a, b) =>
          Date.parse(a.date_of_purchase) - Date.parse(b.date_of_purchase)
      );

      return res[0].date_of_purchase;
    };

    updateState();
  }, [user, cryptoCurrencies, logedin]);

  return !loaded ? (
    <div>Loading ...</div>
  ) : (
    <div>
      {
        <TotalChartDiagramm
          marketCharts={marketCharts}
          positions={user.positions}
          fiat={user.positions[0].fiat_currency}
          origin={data.state.origin}
        />
      }
    </div>
  );
}

export default TotalChart;
