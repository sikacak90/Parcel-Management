import express from "express";
import User from "../models/User.js";

let router = express.Router();

//Adding new user
router.route("/add").post(async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const resetPasswordToken = "";
  const resetPasswordExpires = "";

  const newUser = await User.create({
    name,
    email,
    password,
    resetPasswordToken,
    resetPasswordExpires,
  });

  console.log("User set. Saving..");

  newUser
    .save()
    .then(() => res.json("New User Added"))
    .catch((err) => res.status(400).json("error: " + err));
});

//Getting all users
router.route("/getUser").get(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

export default router;
