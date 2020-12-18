import React, { useState, useEffect } from "react";
import Overview from "../portfolio/Overview";

function Landing({ user, cryptoCurrencies, logedin }) {
  const [re_render, setRe_render] = useState(false);

  useEffect(() => {
    setRe_render(!re_render);
  }, [user, cryptoCurrencies, logedin]);

  return (
    <div>
      <Overview
        user={user}
        cryptoCurrencies={cryptoCurrencies}
        logedin={logedin}
        re_render={re_render}
      />
    </div>
  );
}

export default Landing;
