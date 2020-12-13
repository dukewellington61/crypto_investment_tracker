import React, { useState, useEffect } from "react";
import { getMarketChartsCrypto } from "../../actions/currencies";
import { getCurrenciesNames } from "../../actions/aux";
import TotalChartDiagramm from "./TotalChartDiagramm";

function TotalChart({ user, logedin }) {
  const [marketCharts, setMarketCharts] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const updateState = async () => {
      if (logedin) {
        let currenciesObject = {};

        const earliestDate = getEarliestPurchaseDate();
        const currencyNamesArr = getCurrenciesNames(user);
        currencyNamesArr.forEach(async (currencyName) => {
          const res = await getMarketChartsCrypto(
            user,
            currencyName,
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
  }, [user, logedin]);

  console.log("test");

  return !loaded ? (
    <div>Loading ...</div>
  ) : (
    <div>
      {
        <TotalChartDiagramm
          marketCharts={marketCharts}
          positions={user.positions}
        />
      }
    </div>
  );
}

export default TotalChart;
