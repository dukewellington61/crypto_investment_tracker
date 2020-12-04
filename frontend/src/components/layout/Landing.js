import React, { useState, useEffect } from "react";
import { getCurrenciesNames } from "../../actions/aux";
import { getCryptoCurriencies } from "../../actions/currencies";
import Overview from "../portfolio/Overview";

function Landing({ user, logedin }) {
  const [cryptoCurrencies, setCryptoCurrencies] = useState({});

  useEffect(() => {
    async function updateState() {
      if (logedin) {
        const currencyNames = getCurrenciesNames(user);

        const crypto = await getCryptoCurriencies(currencyNames);

        setCryptoCurrencies(crypto);
      }
    }
    updateState();
  }, [user, logedin]);

  return (
    <div>
      <Overview
        user={user}
        cryptoCurrencies={cryptoCurrencies}
        logedin={logedin}
      />
    </div>
  );
}

export default Landing;
