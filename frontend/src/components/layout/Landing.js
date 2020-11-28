import React, { useState, useEffect } from "react";
import Total from "../portfolio/Total";
import TotalbyCurrency from "../portfolio/TotalbyCurrency";
import { getCryptoCurriencies } from "../../actions/currencies";

function Landing({ user }) {
  const [cryptoCurrencies, setCryptpCurrencies] = useState({});
  useEffect(() => {
    async function updateState() {
      setCryptpCurrencies(await getCryptoCurriencies());
    }
    updateState();
  }, []);
  return (
    <div>
      <Total user={user} />
      <TotalbyCurrency user={user} cryptoCurrencies={cryptoCurrencies} />
      {/* <CurrentPrice user={user} /> */}
    </div>
  );
}

export default Landing;
