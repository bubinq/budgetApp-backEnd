import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("Your E-mail/Password is wrong!");
    const matchingPass = await bcrypt.compare(req.body.password, user.password);
    if (!matchingPass) throw new Error("Your E-mail/Password is wrong!");

    const { password, ...details } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
    res
      .status(200)
      .cookie("accessToken", token, { httpOnly: true })
      .json(details);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(req.body.password, salt);
  try {
    if (req.body.password !== req.body.repass) {
      throw new Error("Passwords must match!");
    }

    const newUser = new User({
      ...req.body,
      password: hash,
    });
    const savedUser = await newUser.save();
    const { password, ...details } = savedUser._doc;
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_KEY);
    res.cookie("accessToken", token, { httpOnly: true });
    res.status(201).json(details);
  } catch (error) {
    if (error.code === 11000) {
      const keyVal = error.keyValue;
      res.status(400).json({
        message: `${
          keyVal.hasOwnProperty("email") ? "E-mail" : "Name"
        } is already taken!`,
      });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("accessToken", "none", {
      expires: new Date(Date.now() + 3 * 1000),
      httpOnly: true
    });
    res.status(200).json("Successfully logout");
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
