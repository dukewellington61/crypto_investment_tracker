export const getCurrenciesNames = (user) => {
  let currencyArr = [];
  if (user.positions) {
    user.positions.map((position) =>
      currencyArr.push(position.crypto_currency)
    );
  }

  // techsith's recommended way to remove duplicates from array (https://www.youtube.com/watch?v=dvPybpgk5Y4)

  return [...new Set(currencyArr)];
};

export const getCurrencyPositions = (user, currency) => {
  if (user.positions) {
    return user.positions.filter(
      (position) => position.crypto_currency === currency
    );
  }
};

export const getAmount = (user, currency) => {
  let sum = 0;
  if (user.positions) {
    user.positions.map((position) => {
      if (position.crypto_currency === currency) {
        sum += parseFloat(position.amount);
      }
    });
  }

  return sum;
};

const getAmountAndDate = (positions, currency) => {
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
  return sort;
};

export const cumulativeValueInvestment = (positions, marketChart, currency) => {
  // console.log("HERE:");
  // console.log(marketChart);
  let resultObject = {};
  let valueArr = [];
  let timeStampArr = [];
  const duration = marketChart
    ? (marketChart[marketChart.length - 1][0] - marketChart[0][0]) /
      1000 /
      (24 * 60 * 60)
    : null;

  getAmountAndDate(positions, currency).forEach((array1) => {
    marketChart.forEach((array2, index) => {
      if (array1[0] <= array2[0]) {
        valueArr[index] = array2[1] * array1[1];
        if (index === 0 || duration < 90 ? index % 10 === 0 : index % 5 === 0) {
          timeStampArr[index] = array2[2];
        } else {
          timeStampArr[index] = " ";
        }
      }
    });
  });

  resultObject.valueArray = valueArr;
  resultObject.timeStampArray = timeStampArr;

  return resultObject;
};
