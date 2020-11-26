import React from "react";
import { Link } from "react-router-dom";
import AccountIcon from "./AccountIcon";

const Navbar = ({ signout, logedin }) => {
  return (
    <nav id="navbar">
      <div id="brand_container">
        <Link
          id="brand"
          className="nav-link active"
          to="/"
          style={{ fontWeight: "bold" }}
        >
          Crypto Investment Tracker
        </Link>
      </div>

      <div id="nav_item_container">
        {logedin && (
          <Link className="nav_items" to="/positions">
            positions
          </Link>
        )}

        <Link className="nav_items" to="#">
          <AccountIcon signout={signout} logedin={logedin} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
