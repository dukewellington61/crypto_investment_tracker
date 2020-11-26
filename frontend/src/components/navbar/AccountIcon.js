import React, { Fragment } from "react";
import Menu from "./Menu";

const AccountIcon = ({ signout, logedin }) => {
  return (
    <div id="account_nav_item">
      account
      <div id="menu">
        <Menu signout={signout} logedin={logedin} />
      </div>
    </div>
  );
};

export default AccountIcon;
