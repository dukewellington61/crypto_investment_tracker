import React, { Fragment } from "react";

const Total = ({ user }) => {
  const totalPurchase = () => {
    let sum = 0;

    if (user.positions)
      user.positions.forEach((position) => (sum += position.price));

    return sum;
  };

  return (
    <Fragment>
      <h3>total crypto purchase</h3>
      {/* <div>
        {user.positions.map((position) => (
          <div>{position.price}</div>
        ))}
      </div> */}
      <div>{totalPurchase()}</div>
    </Fragment>
  );
};

export default Total;
