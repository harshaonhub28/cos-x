const router = require("express").Router();
const fileController = require("./controllers/file.controller");
const userController = require("./controllers/user.controller");
const studentController = require("./controllers/student.controller");
const teacherController = require("./controllers/teacher.controller");
const standardController = require("./controllers/standard.controller");
const logger = require("./config/logger");

/* everything will go at /api/route */
//health check url
router.get("/health", (req, res) => {
  res.send("OK");
});

//api to upload reports
router.post("/upload/report", fileController.uploadReport);
//api to retrieve reports
router.get("/get/report/:studentId", fileController.getReport);
//api to delete reports
router.delete("/delete/report/:studentId", fileController.discardReport);
//api to signup
router.post("/signup", userController.signup);
//api to login
router.post("/login", userController.login);
//api to upload students data
router.post("/upload/students", studentController.uploadStudents);
//api to upload teachers data
router.post("/upload/teachers", teacherController.uploadTeachers);
//api to get teachers data
router.get("/get/teachers/:schoolId", teacherController.getTeachers);
//api to assign teacher to a standard
router.post("/assign-teacher", teacherController.assignTeacher);
//api to upload standards for a school
router.post("/upload/standards", standardController.uploadStandards);

module.exports = router;
