const express = require("express");
const router = express.Router();
// const auth = require("../../middleware/auth");

// const User = require("../../models/User");

// @route   POST api/position
// @desc    Create Position
// @access  Private
// router.post(
//   "/position",

//   async (req, res) => {
//     try {
//       // const user = await User.findById(req.user.id);
//       //   await position.save();
//       //   res.json(product);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
//     }
//   }
// );

// @route   POST api/position
// @desc    Get Position
// @access  Private
router.get(
  "/",

  async (req, res) => {
    try {
      // const user = await User.findById(req.user.id);
      //   res.json(product);
      res.send("position route");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
