import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.js";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Not logged in" });

  const { _id } = jwt.verify(token, process.env.JWT_SECRET);

  const admin = await Admin.findById({ _id });
  req.admin = admin;
  next();
};
