import React from "react";
import { Line } from "react-chartjs-2";

function PositionRoiChartDiagram({ marketChart, amount, currency }) {
  //   console.log(marketChart);
  const getDates = () => {
    let timeArr = [];
    if (marketChart.length > 0) {
      marketChart.forEach((el) => timeArr.push(el[2]));
      return timeArr;
    }
  };

  //legacy
  const getData = () => {
    let data = [];
    if (marketChart.length > 0) {
      marketChart.forEach((el) => data.push(el[1]));
      //   console.log(data);
      return data;
    }
  };

  const getPrice = () => {
    const priceArr = getData();
    const calcPricesArr = priceArr.map((el) => el * amount);
    console.log(calcPricesArr);
    console.log(amount);
    return calcPricesArr;
  };

  return (
    <div>
      <Line
        data={{
          labels: getDates(),
          datasets: [
            {
              label: currency,
              data: getPrice(marketChart),
            },
          ],
        }}
        height={400}
        width={600}
      />
    </div>
  );
}

export default PositionRoiChartDiagram;
