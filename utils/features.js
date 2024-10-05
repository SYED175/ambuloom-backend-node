import jwt from "jsonwebtoken";

export const sendCookies = (admin, statusCode, message, res) => {
  const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);
  const adminInfo = {
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    // Add any other non-sensitive fields you want to include
  };
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
      admin: adminInfo,
    });
};
