import React, { useState } from "react";

const TotalbyCurrency = ({ user, cryptoCurrencies }) => {
  console.log(cryptoCurrencies);
  const getCurrencies = () => {
    let currencyArr = [];
    if (user.positions) {
      user.positions.map((position) =>
        currencyArr.push(position.crypto_currency)
      );
    }

    // techsith's recommended way to remove duplicates from array (https://www.youtube.com/watch?v=dvPybpgk5Y4)
    return [...new Set(currencyArr)];
  };

  const getTotal = (currency) => {
    let sum = 0;
    user.positions.map((position) => {
      if (position.crypto_currency === currency) {
        sum += position.price;
      }
    });
    return sum;
  };

  const getAmount = (currency) => {
    let sum = 0;
    user.positions.map((position) => {
      if (position.crypto_currency === currency) {
        sum += parseFloat(position.amount);
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
    const res = getCurrentPrice(currency) * getAmount(currency);
    currentValueTotal += res;
    return res;
  };

  const getBalance = (currency) =>
    getCurrentValue(currency) - getTotal(currency);

  const getTotalPurchase = () => {
    let sum = 0;

    if (user.positions)
      user.positions.forEach((position) => (sum += position.price));

    return sum;
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
          </tr>
        </thead>
        {getCurrencies().map((currency) => (
          <tbody>
            <tr>
              <th scope="row">{currency}</th>
              <td>{getAmount(currency).toFixed(3)}</td>
              <td>{getTotal(currency).toFixed(2)}&euro;</td>
              <td>{getCurrentValue(currency).toFixed(2)}&euro;</td>
              <td>{getBalance(currency).toFixed(2)}&euro;</td>
            </tr>
          </tbody>
        ))}
        <tr>
          <th scope="row"></th>
          <td></td>
          <td>{getTotalPurchase().toFixed(2)}&euro;</td>
          <td>{(currentValueTotal / 2).toFixed(2)}&euro;</td>
          <td>
            {(currentValueTotal / 2 - getTotalPurchase()).toFixed(2)}&euro;
          </td>
        </tr>
      </table>
    </div>
  );
};

export default TotalbyCurrency;
