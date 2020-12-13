import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { cumulativeValueInvestment } from "../../actions/aux";

function TotalChartDiagramm({ positions, marketCharts }) {
  // console.log(marketCharts);

  const [resultArray, setResultArray] = useState([]);

  const [timeStampArray, setTimeStampArray] = useState([]);

  useEffect(() => {
    const currenciesTotalObjectsArray = [];

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

    currenciesTotalObjectsArray.forEach((obj) => {
      obj.timeStampArray.forEach((el, index) => (timeStamps[index] = el));
    });

    const resArray = new Array(timeStamps.length).fill(0);

    currenciesTotalObjectsArray.forEach((obj) => {
      obj.valueArray.forEach((el, index) => (resArray[index] += el));
    });

    setResultArray(resArray);
    console.log(resArray);
    setTimeStampArray(timeStamps);
  }, []);

  return (
    <div>
      <Line
        data={{
          labels: timeStampArray,
          datasets: [
            {
              label: "EUR",
              data: resultArray,
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
