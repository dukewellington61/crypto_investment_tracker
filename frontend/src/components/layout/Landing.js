import React, { useState, useEffect } from "react";
import Total from "../portfolio/Total";
import { getCurrenciesNames } from "../../actions/aux";
import { getCryptoCurriencies } from "../../actions/currencies";
import Overview from "../portfolio/Overview";

function Landing({ user }) {
  const [cryptoCurrencies, setCryptpCurrencies] = useState({});

  useEffect(() => {
    async function updateState() {
      if (user._id) {
        const currencyNames = getCurrenciesNames(user);

        const crypto = await getCryptoCurriencies(currencyNames);

        setCryptpCurrencies(crypto);
      }
    }
    updateState();
  }, [user]);

  useEffect(() => {
    async function updateState() {
      if (user) {
      }
    }
    updateState();
  }, []);
  return (
    <div>
      <Total user={user} />
      <Overview user={user} cryptoCurrencies={cryptoCurrencies} />
      {/* <CurrentPrice user={user} /> */}
    </div>
  );
}

export default Landing;
