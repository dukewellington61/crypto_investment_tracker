import React from "react";
import { Line } from "react-chartjs-2";
import { getAmount } from "../../actions/aux";

const PositionRoiChartDiagram = ({
  positions,
  marketChart,
  amount,
  currency,
}) => {
  // console.log(marketChart);

  // console.log(marketChartCopy);

  // const getDates = () => {
  //   let timeArr = [];
  //   if (marketChart.length > 0) {
  //     cumulativeValueInvestment().forEach((el) => timeArr.push(el[2]));
  //     return timeArr;
  //   }
  // };

  // legacy;
  // const getData = () => {
  //   let data = [];
  //   if (marketChart.length > 0) {
  //     cumulativeValueInvestment().forEach((el) => data.push(el[1]));
  //     //   console.log(data);
  //     return data;
  //   }
  // };

  // const getPrice = () => {
  //   const priceArr = getData();
  //   const calcPricesArr = priceArr.map((el) => el * amount);
  //   // console.log(calcPricesArr);
  //   // console.log(amount);
  //   return calcPricesArr;
  // };

  const getAmountAndDate = () => {
    let AmountAndDateArr = [];

    positions.forEach((el) => {
      let arrEl = [];

      if (el.crypto_currency === currency) {
        arrEl[0] = Date.parse(el.date_of_purchase);
        arrEl[1] = parseFloat(el.amount);
        AmountAndDateArr.push(arrEl);
      }
    });

    let sort = AmountAndDateArr.sort(function (a, b) {
      return a[0] - b[0];
    });

    for (const element in sort) {
      element > 0
        ? (sort[element][1] = sort[element][1] + sort[element - 1][1])
        : (sort[element][1] = sort[element][1]);
      // console.log(sort[element]);
    }

    let uniqueElArr = [];
    sort.forEach((el, i, arr) =>
      (i < arr.length - 1 && el[0] != arr[i + 1][0]) ||
      (i > 0 && el[0] != arr[i - 1][0])
        ? uniqueElArr.push(el)
        : null
    );

    return uniqueElArr;

    // sort.filter((el, i, arr) => (i > 0 ? el[0] != arr[i - 1][0] : null));
  };

  console.log(getAmountAndDate());

  let marketChartCopy = JSON.parse(JSON.stringify(marketChart));

  const cumulativeValueInvestment = () => {
    // return marketChartCopy.map((array, i) =>
    //   getAmountAndDate().map((el) => {
    //     if (el[0] > array[0]) return [...marketChartCopy, (array[1] *= el[1])];
    //   })
    // );

    // for (let i = 0; i < marketChartCopy.length; i++) {
    //   for (let j = 0; j < getAmountAndDate().length; j++) {
    //     if (getAmountAndDate()[j][0] > marketChartCopy[i][0]) {
    //       marketChartCopy[i][1] =
    //         marketChartCopy[i][1] * getAmountAndDate()[j][1];
    //     }
    //   }
    // }

    // return marketChartCopy;

    // marketChartCopy.forEach((array, i) =>
    //   getAmountAndDate().forEach((el) =>
    //     el[0] > array[0] ? (marketChartCopy[i][1] = array[1] * el[1]) : null
    //   )
    // );

    getAmountAndDate().forEach((array1) =>
      marketChartCopy.forEach((array2, j) =>
        array1[0] > array2[0]
          ? (marketChartCopy[j][1] = array2[1] * array1[1])
          : null
      )
    );

    // return marketChartCopy;
  };

  cumulativeValueInvestment();

  console.log(marketChartCopy);

  return (
    <div>
      {/* <Line
        data={{
          labels: getDates(),
          datasets: [
            {
              label: currency,
              data: getData(),
            },
          ],
        }}
        height={400}
        width={600}
      /> */}
    </div>
  );
};

export default PositionRoiChartDiagram;
