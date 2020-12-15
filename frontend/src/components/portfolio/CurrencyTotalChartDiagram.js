import React from "react";
import { Line } from "react-chartjs-2";
import { cumulativeValueInvestment } from "../../actions/aux";

const CurrencyTotalChartDiagram = ({ positions, marketChart, currency }) => {
  return (
    <div>
      <Line
        data={{
          labels: cumulativeValueInvestment(positions, marketChart, currency)
            .timeStampArray,
          datasets: [
            {
              label: currency,
              data: cumulativeValueInvestment(positions, marketChart, currency)
                .valueArray,
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
                  labelString: `Price in ${positions[0].fiat_currency}`,
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
