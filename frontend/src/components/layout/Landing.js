import React, { useState, useEffect } from "react";
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
      <Overview user={user} cryptoCurrencies={cryptoCurrencies} />
    </div>
  );
}

export default Landing;
