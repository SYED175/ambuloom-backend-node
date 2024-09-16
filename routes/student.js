import express from "express";
import {
  allStudents,
  getStudentsByPagination,
  registerStudent,
} from "../controllers/student.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", registerStudent);
router.get("/all", isAuthenticated, allStudents);
router.get("/paginStudents", isAuthenticated, getStudentsByPagination);

export default router;
