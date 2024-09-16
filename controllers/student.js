import { Student } from "../models/student.js";

export const registerStudent = async (req, res) => {
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
  await Student.create({
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
    message: "Student added successfully",
  });
};

export const allStudents = async (req, res) => {
  try {
    let students = await Student.find({});

    if (!students)
      return res.status(404).json({
        success: false,
      });

    res.json({
      success: true,
      students,
    });
  } catch (error) {}
};

export const getStudentsByPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const students = await Student.find({}).limit(limit).skip(skip);

    if (!students || students.length === 0)
      return res.status(404).json({
        success: false,
        message: `No students were found on page:${page}`,
      });
    const totalStudents = await Student.countDocuments({});
    res.status(200).json({
      sucess: true,
      students,
      itemsPerPage: limit,
      page,
      totalStudents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * 
 * {
    "studentName": "Syed",  
    "age": 12, "gender": "Male",
    "education": "Master's Degree"

    "parentName": "Nasreen Begum",
    "country": "IN","city": "Bangalore",

   
    "email": "syedismail@gmail.com",
    
    
    "phoneNumber": "919538202240",
    "studentPhoto": {},

}
    
 */
