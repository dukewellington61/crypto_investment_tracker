import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { getMarketChartsCrypto } from "../../actions/currencies";

function MarketChartPriceRange({ marketChart, amount }) {
  const [chart, setChart] = useState({});

  useEffect(() => {
    const getData = async () => {
      const returnValue = await getMarketChartsCrypto();
      setChart(returnValue);
      // console.log(chart);
    };
    getData();
  }, []);

  const getLabels = () => {
    let timeArr = [];
    if (chart.data) {
      chart.data.prices.forEach((el) => {
        const time = new Date(el[0]);
        timeArr.push(time);
      });
    }

    return timeArr;
  };

  const getData = (arr) => {
    let data = [];
    if (arr.data) {
      arr.data.prices.forEach((el) => data.push(el[1]));
      return data;
    }
  };

  const getPrice = (arr) => {
    const priceArr = getData(arr);
    const calcPricesArr = priceArr.map((el) => el * amount);
    return calcPricesArr;
  };

  return (
    <div>
      <Line
        data={{
          labels: getLabels(),
          datasets: [
            {
              label: "price position",
              data: getPrice(marketChart),
            },
            { label: "price total", data: getData(chart), borderColor: "blue" },
          ],
        }}
        height={400}
        width={600}
      />
    </div>
  );
}

export default MarketChartPriceRange;
