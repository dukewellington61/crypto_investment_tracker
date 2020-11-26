const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  positions: [
    {
      currency: {
        type: String,
        requires: true,
      },
      amount: {
        type: String,
        requires: true,
      },
      price_usd: {
        type: Number,
        required: true,
      },
      price_eur: {
        type: Number,
        required: true,
      },
      date_of_purchase: {
        type: Date,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
