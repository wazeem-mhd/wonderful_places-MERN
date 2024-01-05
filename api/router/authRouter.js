import express, { Router } from "express";
import {
  createUser,
  getUser,
  googleUser,
} from "../controller/authController.js";
import User from "../model/userModel.js";
import Token from "../model/token.js";

const router = express.Router();

router.route("/createuser").post(createUser);
router.route("/getuser").post(getUser);
router.route("/googleuser").post(googleUser);
router.get("/:id/verify/:token", async (req, res) => {
  try {
    const req_id = req.params.id;
    const req_token = req.params.token;

    const user = await User.findOne({ _id: req_id });
    const token = await Token.findOne({ userId: user._id, token: req_token });

    if (!user) {
      return res.status(404).send({ isVerified: false });
    }

    if (!token) {
      return res.status(404).send({ isVerified: false });
    }

    await User.updateOne({ _id: user._id }, { verified: true });

    await token.deleteOne();

    res.status(200).send({ isVerified: true });
  } catch (error) {
    console.log(error.message);
    // res.status(500).send({ error_message: "Internal server error" });
  }
});

export default router;
