import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { cumulativeValueInvestment } from "../../actions/aux";

function TotalChartDiagramm({ positions, marketCharts, fiat, origin }) {
  const [nameArray, setNameArray] = useState("");

  const [labelStr, setLabelStr] = useState("");

  const [resultArray, setResultArray] = useState([]);

  const [timeStampArray, setTimeStampArray] = useState([]);

  useEffect(() => {
    switch (origin) {
      case "total_initial_value":
        setNameArray("initialValueArray");
        setLabelStr(`Price in ${fiat}`);
        break;
      case "total_current_value":
        setNameArray("currentValueArray");
        setLabelStr(`Price in ${fiat}`);
        break;
      case "total_balance":
        setNameArray("balanceArray");
        setLabelStr(`Price in ${fiat}`);
        break;
      case "total_roi":
        setNameArray("roiArray");
        setLabelStr(`ROI in %`);
        break;
    }
  }, []);

  useEffect(() => {
    const currenciesTotalObjectsArray = [];

    const timeStamps = [];

    const currencyArr = Object.keys(marketCharts);

    const totalValueInvestment = (obj) => {
      currenciesTotalObjectsArray.push(obj);
    };

    currencyArr.forEach((currency) =>
      totalValueInvestment(
        cumulativeValueInvestment(positions, marketCharts[currency], currency)
      )
    );

    currenciesTotalObjectsArray.forEach((obj) => {
      obj.timeStampArray.forEach((el, index) => (timeStamps[index] = el));
    });

    const resArray = new Array(timeStamps.length).fill(0);

    if (nameArray)
      currenciesTotalObjectsArray.forEach((obj) => {
        obj[nameArray].forEach((el, index) => (resArray[index] += el));
      });

    setResultArray(resArray);

    setTimeStampArray(timeStamps);
  }, [nameArray]);

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
                  labelString: labelStr,
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
