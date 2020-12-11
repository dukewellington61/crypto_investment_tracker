import React from "react";
import { Line } from "react-chartjs-2";

const CurrencyTotalChartDiagram = ({ positions, marketChart, currency }) => {
  // console.log(marketChart);

  // const getData = () => {
  //   let data = [];
  //   if (marketChart.length > 0) {
  //     cumulativeValueInvestment().forEach((el) => data.push(el[1]));

  //     return data;
  //   }
  // };

  const getAmountAndDate = () => {
    // extracts amount of coins and date of purchase
    let AmountAndDateArr = [];

    positions.forEach((el) => {
      let arrEl = [];

      if (el.crypto_currency === currency) {
        arrEl[0] = Date.parse(el.date_of_purchase);
        arrEl[1] = parseFloat(el.amount);
        AmountAndDateArr.push(arrEl);
      }
    });

    // sorts AmountAndDateArr by purchase date beginning with the oldest
    let sort = AmountAndDateArr.sort(function (a, b) {
      return a[0] - b[0];
    });

    // adds amount of coins in array so that each amount is the sum of itself + the previous amount
    for (const element in sort) {
      element > 0
        ? (sort[element][1] = sort[element][1] + sort[element - 1][1])
        : (sort[element][1] = sort[element][1]);
    }

    // removes elements from array which's purchase date is the same like the purchase date of the following element
    // if (sort.length > 1) {
    //   let uniqueElArr = [];
    //   sort.forEach((el, i, arr) =>
    //     (uniqueElArr.length > 1 &&
    //       i < arr.length - 1 &&
    //       el[0] != arr[i + 1][0]) ||
    //     (i > 0 && el[0] != arr[i - 1][0])
    //       ? uniqueElArr.push(el)
    //       : null
    //   );

    //   // return uniqueElArr;
    //   return sort;
    // } else {
    //   return sort;
    // }
    return sort;
  };

  let marketChartCopy = JSON.parse(JSON.stringify(marketChart));

  let valueArr = [];
  let timeStampArr = [];

  // console.log(marketChartCopy.length);

  const cumulativeValueInvestment = () => {
    const duration =
      (marketChartCopy[marketChartCopy.length - 1][0] - marketChartCopy[0][0]) /
      1000 /
      (24 * 60 * 60);

    getAmountAndDate().forEach((array1) => {
      marketChartCopy.forEach((array2, index) => {
        if (array1[0] <= array2[0]) {
          valueArr[index] = array2[1] * array1[1];
          if (
            index === 0 || duration < 90 ? index % 10 === 0 : index % 5 === 0
          ) {
            timeStampArr[index] = array2[2];
          } else {
            timeStampArr[index] = " ";
          }

          // timeStampArr[index] = array2[2];

          // console.log(
          //   // array2[2] +
          //   //   "**" +
          //   //   array2[1] * array1[1] +
          //   //   "**" +
          //   //   array2[1] +
          //   //   "**" +
          //   //   array1[1]

          // );

          // console.log(timeStampArr);
        }
      });
    });

    // console.log(marketChart);

    return marketChartCopy;
  };

  cumulativeValueInvestment();

  // console.log(marketChartCopy);
  // console.log(valueArr);
  // console.log(timeStampArr);

  // const getDates = () => {
  //   let timeArr = [];
  //   marketChartCopy.forEach((el) => timeArr.push(el[0]));
  //   return timeArr;
  // };

  return (
    <div>
      <Line
        data={{
          labels: timeStampArr,
          datasets: [
            {
              label: currency,
              data: valueArr,
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
