import React, { useState, useEffect } from "react";
import { getMarketChartsCrypto } from "../../actions/currencies";
import { getCurrenciesNames } from "../../actions/aux";
import TotalChartDiagramm from "./TotalChartDiagramm";

function TotalChart({ user, logedin }) {
  const [marketCharts, setMarketCharts] = useState({});

  useEffect(() => {
    const updateState = async () => {
      if (logedin) {
        const currenciesObject = {};

        const earliestDate = getEarliestPurchaseDate();
        const currencyNamesArr = getCurrenciesNames(user);
        currencyNamesArr.forEach(async (currencyName) => {
          const res = await getMarketChartsCrypto(
            user,
            currencyName,
            earliestDate
          );
          return {
            ...currenciesObject,
            ...(currenciesObject[currencyName] = res),
          };
        });
        setMarketCharts(currenciesObject);
        // console.log(marketCharts);
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

  // console.log("test");

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  return isEmpty(marketCharts) ? (
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
