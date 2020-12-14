import axios from "axios";

export const getCryptoCurriencies = async (currencyNamesArr) => {
  const currencyNamesString = await getNameString(currencyNamesArr);

  const urlString = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${currencyNamesString}b&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

  try {
    const res = await axios.get(urlString);

    return res;
  } catch (err) {
    return err;
  }
};

const getNameString = async (currencyNamesArr) => {
  let nameString = "";

  currencyNamesArr.forEach((el) => (nameString += `${el}%2C%20`));

  return nameString;
};

export const getMarketCharts = async (currency, date_of_purchase) => {
  const from = new Date(date_of_purchase).getTime() / 1000;
  const to = new Date().getTime() / 1000;

  const urlString = `https://api.coingecko.com/api/v3/coins/${currency}/market_chart/range?vs_currency=eur&from=${from}&to=${to}`;

  // console.log(urlString);

  try {
    const res = await axios.get(urlString);

    return res;
  } catch (err) {
    return err;
  }
};

export const getMarketChartsCrypto = async (user, currency, earliestDate) => {
  // CoinGecko API V3 has granularity of Hourly data for duration between 1 day and 90 days - that's too much data
  // in order to get  Daily data the follwing three const from... make sure the duration is always at least 91 days
  // ** temporarily disabled ** temporarily disabled ** temporarily disabled ** temporarily disabled ** temporarily disabled **

  const fromDatePositions = earliestDate
    ? new Date(earliestDate).getTime() / 1000
    : new Date(await getFromDate(user, currency)).getTime() / 1000;

  // const fromDate91DaysBeforeToday =
  //   new Date().getTime() / 1000 - 91 * 24 * 60 * 60;

  // const from =
  //   fromDate91DaysBeforeToday < fromDatePositions
  //     ? fromDate91DaysBeforeToday
  //     : fromDatePositions;

  const from = fromDatePositions;

  const to = new Date().getTime() / 1000;

  const urlString = `https://api.coingecko.com/api/v3/coins/${currency}/market_chart/range?vs_currency=eur&from=${from}&to=${to}`;

  try {
    const res = await axios.get(urlString);

    const resTransformed = await addDateToArr(res.data.prices);

    return resTransformed;
  } catch (err) {
    return err;
  }
};

const getFromDate = (user, currency) => {
  let dates = [];

  currency
    ? user.positions.forEach((position) => {
        if (position.crypto_currency === currency)
          dates.push(position.date_of_purchase);
      })
    : user.positions.forEach((position) =>
        dates.push(position.date_of_purchase)
      );

  let sort = dates.sort(function (a, b) {
    return Date.parse(a) > Date.parse(b);
  });

  // conditionally return because sequence in sort array is beeing turned around on reload (for some reason) sometimes returning the latest, rather than the earliest date
  return sort[0] > sort[sort.length - 1] ? sort[sort.length - 1] : sort[0];
};

const addDateToArr = (arr) =>
  arr.map((el, index) => {
    const date = new Date(el[0]);
    const day =
      date.getDate() < 10 ? "0" + date.getDate() : "" + date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const dateString = `${day}. ${month} ${year}`;
    return [...arr[index], dateString];
  });
