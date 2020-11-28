import React, { useState } from "react";
import axios from "axios";
import Total from "../portfolio/Total";
import TotalbyCurrency from "../portfolio/TotalbyCurrency";
import CurrentPrice from "../portfolio/CurrentPrice";

function Landing({ user }) {
  const getCurrentPrice = async (currency) => {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${currency}?localization=false&tickers=true&market_data=false&community_data=false&developer_data=false&sparkline=false`
      );
      let currentPrice = res.data.tickers.find((el) => el.target === "EUR")
        .last;

      return currentPrice;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Total user={user} />
      <TotalbyCurrency user={user} getCurrentPrice={getCurrentPrice} />
      {/* <CurrentPrice user={user} /> */}
    </div>
  );
}

export default Landing;
