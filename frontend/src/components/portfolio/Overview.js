import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getNamesAndValues } from "../../aux/auxCryptoData";
import { getAmount } from "../../aux/auxCryptoData";
import { getCurrentPrice } from "../../aux/auxCryptoData";
import { getCurrentValue } from "../../aux/auxCryptoData";

const Overview = ({
  user,
  cryptoCurrencies,
  logedin,
  toggleView,
  renderOverview,
  updateOriginState,
}) => {
  const [currencyNamesAndValues, setCurrencyNamesAndValues] = useState([]);

  const [currentValueTotal, setCurrentValueTotal] = useState(0);

  const [totalPurchase, setTotalPurchase] = useState(0);

  useEffect(() => {
    const namesAndValuesArr = getNamesAndValues(user, cryptoCurrencies);

    setCurrencyNamesAndValues(namesAndValuesArr);

    const totalsArray = namesAndValuesArr.map((el) =>
      getCurrentValue(user, cryptoCurrencies, el[0])
    );

    setCurrentValueTotal(totalsArray.reduce((a, b) => a + b, 0));

    setTotalPurchase(getTotalPurchase());
  }, [user, cryptoCurrencies, logedin, renderOverview]);

  const getTotal = (currency) => {
    let sum = 0;
    user.positions.map((position) => {
      if (position.crypto_currency === currency) {
        sum += position.price;
      }
    });
    return sum;
  };

  const getTotalPurchase = () => {
    let sum = 0;
    if (logedin) user.positions.forEach((position) => (sum += position.price));
    return sum;
  };

  const getBalance = (currency) =>
    getCurrentValue(user, cryptoCurrencies, currency) - getTotal(currency);

  const setCurrency = (currency) => {
    if (sessionStorage.getItem("crypto_currency")) {
      sessionStorage.removeItem("crypto_currency");
      sessionStorage.setItem("crypto_currency", currency);
    } else {
      sessionStorage.setItem("crypto_currency", currency);
    }
  };

  const handleClick = (val) => {
    toggleView();
    updateOriginState(val);
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
            currencyNamesAndValues.map((el) => (
              <tr>
                <Link
                  to={{
                    pathname: "/position",
                    current_price: getCurrentPrice(cryptoCurrencies, el[0]),
                    state: {
                      currency: el[0],
                      user: user,
                    },
                  }}
                >
                  <th scope="row">{el[0]}</th>
                </Link>
                <td onClick={handleClick}>
                  {getAmount(user, el[0]).toFixed(3)}
                </td>
                <td onClick={handleClick}>
                  {getTotal(el[0]).toFixed(2)}&euro;
                </td>
                <td onClick={handleClick}>
                  {getCurrentValue(user, cryptoCurrencies, el[0]).toFixed(2)}
                  &euro;
                </td>
                <td onClick={handleClick}>
                  {getBalance(el[0]).toFixed(2)}&euro;
                </td>
                <td onClick={handleClick}>
                  {(
                    (getCurrentValue(user, cryptoCurrencies, el[0]) * 100) /
                      getTotal(el[0]) -
                    100
                  ).toFixed(0)}
                  %
                </td>
              </tr>
            ))}
        </tbody>
        <tr>
          <th scope="row"></th>
          <td></td>
          <td onClick={() => handleClick("total_initial_value")}>
            {totalPurchase.toFixed(2)}&euro;
          </td>
          <td onClick={() => handleClick("total_current_value")}>
            {currentValueTotal.toFixed(2)}&euro;
          </td>
          <td onClick={() => handleClick("total_balance")}>
            {(currentValueTotal - totalPurchase).toFixed(2)}&euro;
          </td>
          <td onClick={() => handleClick("total_roi")}>
            {((currentValueTotal * 100) / totalPurchase - 100).toFixed(0)}%
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Overview;
