export const getCurrenciesNames = (user) => {
  let currencyArr = [];
  if (user.positions) {
    user.positions.map((position) =>
      currencyArr.push(position.crypto_currency)
    );
  }

  // techsith's recommended way to remove duplicates from array (https://www.youtube.com/watch?v=dvPybpgk5Y4)

  return [...new Set(currencyArr)];
};

export const getCurrencyPositions = (user, currency) => {
  if (user.positions) {
    return user.positions.filter(
      (position) => position.crypto_currency === currency
    );
  }
};
