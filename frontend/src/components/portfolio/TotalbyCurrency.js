import React, { Fragment, useState } from "react";

const TotalbyCurrency = ({ user, getCurrentPrice }) => {
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

  const getCurrentValue = (currency) => {
    return getCurrentPrice(currency) * getAmount(currency);
  };

  return (
    <Fragment>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Crypto</th>
              <th scope="col">Amount</th>
              <th scope="col">Total price at date(s) of purchase</th>
              <th scope="col">Fiat</th>
              <th scope="col">Current Value</th>
              <th scope="col">Fiat</th>
            </tr>
          </thead>
          {getCurrencies().map((currency) => (
            <tbody>
              <tr>
                <th scope="row">{currency}</th>
                <td>{getAmount(currency).toFixed(3)}</td>
                <td>{getTotal(currency).toFixed(2)}</td>
                <td>{user.positions[1].fiat_currency}</td>
                <td>{getCurrentValue(currency)}</td>
                <td>{user.positions[1].fiat_currency}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </Fragment>
  );
};

export default TotalbyCurrency;
