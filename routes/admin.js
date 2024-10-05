import express from "express";
import {
  adminLogin,
  adminLogout,
  registerAdmin,
  getMyProfile,
} from "../controllers/admin.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, registerAdmin);
router.post("/login", adminLogin);
router.get("/logout", isAuthenticated, adminLogout);
router.get("/me", isAuthenticated, getMyProfile);

export default router;
