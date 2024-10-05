import express from "express";
import {
  confirmStudentRegistration,
  getStudentsByPagination,
} from "../controllers/confirmedStudent.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, confirmStudentRegistration);

router.get("/paginStudents", isAuthenticated, getStudentsByPagination);

export default router;
