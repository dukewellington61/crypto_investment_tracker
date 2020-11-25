const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");

// @route   POST api/positions
// @desc    Create a position
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    // Denormalization
    // stores positions objects in users collection
    const position = {
      currency: req.body.currency,
      amount: req.body.amount,
      price_usd: req.body.price_usd,
      price_eur: req.body.price_eur,
    };

    user.positions.unshift(position);

    await user.save();

    res.json(position);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
