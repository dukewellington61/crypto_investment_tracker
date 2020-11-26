import React, { useState } from "react";

const Positions = ({ makePosition }) => {
  const [formData, setFormData] = useState({
    currency: "",
    amount: "",
    price_usd: "",
    price_eur: "",
    date_of_purchase: "",
  });

  const { currency, amount, price_usd, price_eur, date_of_purchase } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    makePosition(formData);
  };

  return (
    <div className="form_container">
      <h3 className="large text-primary">Crypto Position</h3>
      <p className="lead">
        <i className="fa fa-user auth_fa-user"></i> Create new Crypto Position
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            className="form-control input_field"
            type="text"
            placeholder="Currency"
            name="currency"
            value={currency}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control input_field"
            type="number"
            placeholder="Amount"
            name="amount"
            value={amount}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control input_field"
            type="number"
            min="1"
            step="any"
            placeholder="Price in USD"
            name="price_usd"
            value={price_usd}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control input_field"
            type="number"
            min="1"
            step="any"
            placeholder="Price in EUR"
            name="price_eur"
            value={price_eur}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control input_field"
            type="date"
            name="date_of_purchase"
            value={date_of_purchase}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          value="Submit Position"
        />
      </form>
    </div>
  );
};

export default Positions;
