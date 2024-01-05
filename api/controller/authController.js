import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import Token from "../model/token.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  console.log(req.body);

  try {
    const user = await User.findOne({ email });

    if (user !== null) {
      return res
        .status(404)
        .json({ error_message: "User already exist", isSuccess: false });
    }

    // if (password !== confirmPassword) {
    //   return res.status(404).json({ message: "Password does not match" });
    // }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email: email,
      password: hashPassword,
      userName: `${firstName} ${lastName}`,
    });

    const newToken = await new Token({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}/${newUser._id}/verify/${newToken.token}`;

    await sendEmail(newUser.email, "Verify email", url);

    return res.status(201).json({
      verify_message: "An emil sent to your account please verify",
      isSuccess: true,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error_message: "Server cann't access your request" });
  }
};

export const getUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);

  try {
    const existUser = await User.findOne({ email: email });

    if (existUser === null) {
      return res.json({ message: "User not exist" });
    }
    if (!existUser?.password) {
      return res.json({ message: "Invalid User" });
    }
    const verify_password = await bcrypt.compare(password, existUser.password);

    if (!verify_password) {
      return res.json({ message: "Invalid User" });
    }

    // verify email address
    if (!existUser.verified) {
      const token = await Token.findOne({ userId: existUser._id });

      if (!token) {
        const newToken = await new Token({
          userId: newUser._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();

        const url = `${process.env.BASE_URL}/${existUser._id}/verify/${newToken}`;

        await sendEmail(existUser.email, "Verify email", url);
      }

      return res.status(201).json({
        message: "the verification link share with your email please verify",
      });
    }

    const jwt_token = await jwt.sign(
      {
        id: existUser._id,
        email: existUser.email,
        userName: existUser.userName,
      },
      "Wzm998@.com",
      { expiresIn: "1h" }
    );
    // console.log(jwt_token);
    return res.status(200).json({
      token: jwt_token,
      user: {
        _id: existUser._id,
        userName: existUser.userName,
        picture: existUser.picture,
      },
    });
  } catch (error) {
    // res.status(500).json({ errorMessage: error.message });
    console.log(error.message);
  }
};

export const googleUser = async (req, res) => {
  const { access_token } = req.query;
  // console.log(access_token);
  try {
    // const user = await fetch(
    //   `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    // );

    // user.json().then(res=>console.log(res.name))

    const result = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    ).then((res) => {
      return res.json();
    });

    // console.log(result.name);
    // console.log(result.sub);
    const existUser = await User.findOne({ email: result.email });

    if (existUser !== null) {
      const token = await jwt.sign(
        { id: newUser._id, email: newUser.email, userName: newUser.userName },
        "Wzm998@.com",
        { expiresIn: "1h" }
      );
      return res.status(200).json({ token: token, user: existUser });
    } else {
      const newUser = await User.create({
        userName: result.name,
        email: result.email,
        picture: result.picture,
        password: "",
      });
      // console.log(newUser);
      const token = await jwt.sign(
        {
          id: newUser._id,
          email: newUser.email,
          userName: newUser.userName,
        },
        "Wzm998@.com",
        { expiresIn: "1h" }
      );
      return res.status(200).json({ token: token, user: existUser });
    }
  } catch (error) {
    console.log(error.message);
  }
};
