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
