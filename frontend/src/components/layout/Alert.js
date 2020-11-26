import React from "react";

const Alert = ({ alert }) => {
  return (
    <div id="alert" className={`alert alert-${alert.type}`} role="alert">
      {alert.message}
    </div>
  );
};

export default Alert;
