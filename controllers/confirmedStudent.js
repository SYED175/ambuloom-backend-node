import { ConfirmedStudent } from "../models/confirmedStudent.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const confirmStudentRegistration = async (req, res, next) => {
  try {
    const {
      studentName,
      age,
      city,
      country,
      education,
      email,
      gender,
      parentName,
      phoneNumber,
    } = req.body;

    const confirmedStudent = await ConfirmedStudent.findOne({ email });
    if (confirmedStudent)
      return next(new ErrorHandler("Student already confirmed", 409));

    await ConfirmedStudent.create({
      studentName,
      age,
      city,
      country,
      education,
      email,
      gender,
      parentName,
      phoneNumber,
    });

    res.status(201).json({
      success: true,
      message: "Student is now confirmed successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const fetchAllConfirmedStudents = async (req, res, next) => {
  try {
    const confirmedStudents = await ConfirmedStudent.find({});
    if (!confirmedStudents)
      return next(new ErrorHandler("No students found!", 404));

    res.status(200).json({
      success: true,
      confirmedStudents,
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentsByPagination = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const students = await ConfirmedStudent.find({}).limit(limit).skip(skip);

    if (!students) {
      if (students.length === 0) {
        return res.status(404).json({
          message: "No students were found",
          students,
        });
      }
      next(new ErrorHandler(`No students were found on page:${page}`, 404));
    }

    const totalStudents = await ConfirmedStudent.countDocuments({});
    const totalPages = Math.ceil(totalStudents / limit);
    res.status(200).json({
      success: true,
      students,
      itemsPerPage: limit,
      page,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
//delete student by id
//fetch student by id
