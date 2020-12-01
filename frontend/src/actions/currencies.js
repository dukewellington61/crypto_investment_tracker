import axios from "axios";
import { getUser } from "./user";

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

export const getMarketCharts = async (currency) => {
  const user = await getUser();
  const fromDate = await getFromDate(user);
  const from = new Date(fromDate).getTime() / 1000;
  const to = new Date().getTime() / 1000;

  const urlString = `https://api.coingecko.com/api/v3/coins/${currency}/market_chart/range?vs_currency=eur&from=${from}&to=${to}`;

  try {
    const res = await axios.get(urlString);

    return res;
  } catch (err) {
    return err;
  }
};

const getFromDate = (user) => {
  let dates = [];

  user.positions.forEach((position) => dates.push(position.date_of_purchase));

  let oldestDate = dates.sort(function (a, b) {
    return Date.parse(a) > Date.parse(b);
  })[0];

  return oldestDate;
};
