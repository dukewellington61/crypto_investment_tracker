import React from "react";
import { Link } from "react-router-dom";
import { getCurrenciesNames } from "../../actions/aux";
import { getAmount } from "../../actions/aux";

const Overview = ({ user, cryptoCurrencies, logedin }) => {
  const getTotal = (currency) => {
    let sum = 0;
    user.positions.map((position) => {
      if (position.crypto_currency === currency) {
        sum += position.price;
      }
    });
    return sum;
  };

  const getCurrentPrice = (currency) => {
    if (cryptoCurrencies.data) {
      return cryptoCurrencies.data.find((el) => el.id === currency)
        .current_price;
    }
  };

  let currentValueTotal = 0;

  const getCurrentValue = (currency) => {
    const res = getCurrentPrice(currency) * getAmount(user, currency);
    currentValueTotal += res;
    return res;
  };

  const getBalance = (currency) =>
    getCurrentValue(currency) - getTotal(currency);

  const getTotalPurchase = () => {
    let sum = 0;

    if (logedin) user.positions.forEach((position) => (sum += position.price));

    return sum;
  };

  const setCurrency = (currency) => {
    if (sessionStorage.getItem("crypto_currency")) {
      sessionStorage.removeItem("crypto_currency");
      sessionStorage.setItem("crypto_currency", currency);
    } else {
      sessionStorage.setItem("crypto_currency", currency);
    }
  };
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Crypto</th>
            <th scope="col">Amount</th>
            <th scope="col">Purchased for</th>
            <th scope="col">Current Value</th>
            <th scope="col">Balance</th>
            <th scope="col">ROI</th>
          </tr>
        </thead>
        <tbody>
          {logedin &&
            getCurrenciesNames(user).map((currency) => (
              <tr>
                <Link
                  to={{
                    pathname: "/position",
                    current_price: getCurrentPrice(currency),
                    state: {
                      currency: currency,
                      user: user,
                    },
                  }}
                >
                  <th scope="row">{currency}</th>
                </Link>

                <td>{getAmount(user, currency).toFixed(3)}</td>
                <td>{getTotal(currency).toFixed(2)}&euro;</td>
                <td>{getCurrentValue(currency).toFixed(2)}&euro;</td>
                <td>{getBalance(currency).toFixed(2)}&euro;</td>
                <td>
                  <Link
                    to={{
                      pathname: "/position_roi_chart",
                    }}
                    onClick={() => setCurrency(currency)}
                  >
                    {(
                      (getCurrentValue(currency) * 100) / getTotal(currency) -
                      100
                    ).toFixed(0)}
                    %
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
        <tr>
          <th scope="row"></th>
          <td></td>
          <td>{getTotalPurchase().toFixed(2)}&euro;</td>
          <td>{(currentValueTotal / 3).toFixed(2)}&euro;</td>
          <td>
            {(currentValueTotal / 3 - getTotalPurchase()).toFixed(2)}&euro;
          </td>
          <td>
            {(
              ((currentValueTotal / 3) * 100) / getTotalPurchase() -
              100
            ).toFixed(0)}
            %
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Overview;
