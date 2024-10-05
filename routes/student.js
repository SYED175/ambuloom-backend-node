import express from "express";
import {
  allStudents,
  deleteStudentById,
  getStudentsByPagination,
  registerStudent,
} from "../controllers/student.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", registerStudent);
router.get("/all", isAuthenticated, allStudents);
router.get("/paginStudents", isAuthenticated, getStudentsByPagination);
router.delete("/:id", isAuthenticated, deleteStudentById);

export default router;
