import React, { useState, useEffect } from "react";
import { getMarketChartsCrypto } from "../../actions/currencies";
import { getCurrenciesNames } from "../../actions/aux";

function TotalChart({ user, logedin }) {
  const [marketCharts, setMarketCharts] = useState([]);

  useEffect(() => {
    const updateState = async () => {
      if (logedin) {
        let resArr = [];
        const earliestDate = getEarliestPurchaseDate();
        const currencyNamesArr = getCurrenciesNames(user);
        currencyNamesArr.forEach(async (currencyName) => {
          const res = await getMarketChartsCrypto(
            user,
            currencyName,
            earliestDate
          );

          const obj = {};

          obj[currencyName] = res;

          resArr.push(obj);

          setMarketCharts(resArr);
          return res;
        });
        marketCharts.forEach((obj) => (obj.bitcoin ? console.log(obj) : null));
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
  return <div></div>;
}

export default TotalChart;
