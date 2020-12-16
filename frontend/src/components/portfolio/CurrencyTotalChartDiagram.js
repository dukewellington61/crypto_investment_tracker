import React from "react";
import { Line } from "react-chartjs-2";

const CurrencyTotalChartDiagram = ({ currencyTotal, currency, fiat }) => {
  return (
    <div>
      <Line
        data={{
          labels: currencyTotal.timeStampArray,
          datasets: [
            {
              label: currency,
              data: currencyTotal.valueArray,
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
                  labelString: `Price in ${fiat}`,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default CurrencyTotalChartDiagram;
