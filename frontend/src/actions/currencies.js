import axios from "axios";

export const getCryptoCurriencies = async () => {
  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=ethereum%2C%20bitcoin%2C%20chainlink%2C%20algorand%2C%20cardano&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );

    return res;
  } catch (err) {
    console.log(err);
  }
};
