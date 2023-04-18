var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    message:"use below url to access each fields....",
    mentorURL:"/mentor",
    studentURL:"/student",
    createStudentURL:"/student/signup",
    createMentorURL:"/mentor/signup",
    updateStudentMentorURL:"/student/:id",
    studentWithMentorURl:"/student/:mentor",
    studentWithOutMentorURl:"/student/withoutmentor"
  });
});

module.exports = router;
