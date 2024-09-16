import { Admin } from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookies } from "../utils/features.js";

export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let admin = await Admin.findOne({ email });
    if (admin)
      return res.status(404).json({
        success: false,
        message: "Admin already exists!",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    admin = await Admin.create({ name, email, password: hashedPassword });
    // sendCookies(admin, 200, "Admin registered successfully", res);
    res.status(200).json({
      success: true,
      message: "Admin registered succesfully",
    });
    req.admin = admin;
  } catch (error) {
    next(error);
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let admin = await Admin.findOne({ email }).select("+password");
    if (!admin)
      return res.status(404).json({
        success: false,
        message: "Email or password is incorrect",
      });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.json({
        success: false,
        message: "Email or password in incorrect",
      });

    req.admin = admin;
    sendCookies(admin, 200, admin.name, res);
  } catch (error) {
    next("Email or password is incorrect");
  }
};

export const adminLogout = (req, res) => {
  return res
    .status(200)
    .cookie("token", "", {
      maxAge: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged out succesfully",
    });
};

export const getMyProfile = async (req, res, next) => {
  return res.json({
    success: true,
    admin: req.admin,
  });
};
