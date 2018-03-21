const router = require("express").Router();
const fileController = require("./controllers/file.controller");
const userController = require("./controllers/user.controller");
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

module.exports = router;
