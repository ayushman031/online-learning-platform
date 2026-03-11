const express = require('express');
const router = express.Router();
const { getCourses, getCourseById, createCourse, addLesson } = require('../controllers/courseController');
const { protect, instructor } = require('../middlewares/authMiddleware');

router.route('/')
    .get(getCourses)
    .post(protect, instructor, createCourse);

router.route('/:id')
    .get(getCourseById);

router.route('/:id/lessons')
    .post(protect, instructor, addLesson);

module.exports = router;
