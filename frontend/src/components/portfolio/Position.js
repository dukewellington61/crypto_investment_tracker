import React from "react";
import { getCurrencyPositions } from "../../actions/aux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Position() {
  const data = useLocation();

  return (
    <div className="row">
      {getCurrencyPositions(data.state.user, data.state.currency).map(
        (position) => {
          return (
            <Link
              id="position"
              to={{
                pathname: "/charts",
                state: {
                  currency: position.crypto_currency,
                  date_of_purchase: position.date_of_purchase,
                  amount: position.amount,
                },
              }}
            >
              <div className="col">amount: {position.amount}</div>
              <div className="col">
                purchase date:{" "}
                {position.date_of_purchase.split("T").slice(0, 1).join("")}
              </div>
              <div className="col">
                price:
                {position.price}
                {position.fiat_currency}
              </div>
            </Link>
          );
        }
      )}
    </div>
  );
}

export default Position;
