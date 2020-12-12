import React from "react";
import { Line } from "react-chartjs-2";
import { cumulativeValueInvestment } from "../../actions/aux";

function TotalChartDiagramm({ positions, marketCharts }) {
  const currenciesTotalObjectsArray = [];

  const resArray = new Array(93).fill(0);

  const timeStamps = [];

  const totalValueInvestment = (arr) => {
    currenciesTotalObjectsArray.push(arr);
  };

  const currencyArr = Object.keys(marketCharts);

  currencyArr.forEach((currency) =>
    totalValueInvestment(
      cumulativeValueInvestment(positions, marketCharts[currency], currency)
    )
  );

  // console.log(currenciesTotalObjectsArray);

  currenciesTotalObjectsArray.forEach((obj) => {
    obj.valueArray.forEach((el, index) => (resArray[index] += el));
    obj.timeStampArray.forEach((el, index) => (timeStamps[index] = el));
  });

  console.log(resArray);

  return (
    <div>
      <Line
        data={{
          labels: timeStamps,
          datasets: [
            {
              label: "EUR",
              data: resArray,
            },
          ],
        }}
        // width={500}
        height={500}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Price",
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}

export default TotalChartDiagramm;
