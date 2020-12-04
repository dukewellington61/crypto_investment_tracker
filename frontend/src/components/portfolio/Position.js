import React, { useEffect, Fragment } from "react";
import { getCurrencyPositions } from "../../actions/aux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Position() {
  const data = useLocation();

  useEffect(() => {
    if (data.current_price != undefined) {
      sessionStorage.setItem("crypto_inv_current_price", data.current_price);
    }
  }, []);

  return (
    <Fragment>
      <div>
        current price per coin:
        {data.current_price ||
          sessionStorage.getItem("crypto_inv_current_price")}{" "}
        {data.state.user.positions[0].fiat_currency}
      </div>
      <div className="row">
        {getCurrencyPositions(data.state.user, data.state.currency).map(
          (position) => {
            return (
              <Link
                id="position"
                to={{
                  pathname: "/position_chart",
                  state: {
                    currency: position.crypto_currency,
                    date_of_purchase: position.date_of_purchase,
                    amount: position.amount,
                  },
                }}
              >
                <div className="col">amount: {position.amount}</div>
                <div className="col">
                  price per coin at time of purchase:
                  {(position.price / position.amount).toFixed(2)}
                </div>
                <div className="col">
                  purchase date:
                  {position.date_of_purchase.split("T").slice(0, 1).join("")}
                </div>
                <div className="col">
                  initial value:
                  {position.price}
                  {position.fiat_currency}
                </div>
                <div className="col">
                  current value:
                  {data.current_price === undefined
                    ? (
                        sessionStorage.getItem("crypto_inv_current_price") *
                        position.amount
                      ).toFixed(2)
                    : (data.current_price * position.amount).toFixed(2)}
                  {position.fiat_currency}
                </div>

                <div className="col">
                  balance:
                  {data.current_price === undefined
                    ? (
                        sessionStorage.getItem("crypto_inv_current_price") *
                          position.amount -
                        position.price
                      ).toFixed(2)
                    : (
                        data.current_price * position.amount -
                        position.price
                      ).toFixed(2)}
                  {position.fiat_currency}
                </div>
              </Link>
            );
          }
        )}
      </div>
    </Fragment>
  );
}

export default Position;
