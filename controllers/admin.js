import { Admin } from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookies } from "../utils/features.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let admin = await Admin.findOne({ email });
    if (admin) return next(new ErrorHandler("Admin already exists!", 409));

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
      return next(new ErrorHandler("Email or password is incorrect", 401));

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return next(new ErrorHandler("Email or password is incorrect", 401));

    req.admin = admin;
    sendCookies(admin, 200, `Welcome back ${admin.name}`, res);
  } catch (error) {
    next(error);
  }
};

export const adminLogout = (req, res) => {
  return res
    .status(200)
    .cookie("token", "", {
      maxAge: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "Logged out succesfully",
    });
};

export const getMyProfile = (req, res, next) => {
  return res.json({
    success: true,
    admin: req.admin,
  });
};
