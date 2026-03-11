const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find({}).populate('instructor', 'name email');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('instructor', 'name email')
            .populate('enrolledStudents', 'name');

        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Instructor
exports.createCourse = async (req, res) => {
    try {
        const { title, description, price, category, thumbnail } = req.body;

        const course = new Course({
            title,
            description,
            price,
            category,
            thumbnail,
            instructor: req.user._id,
            lessons: [],
        });

        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add lesson to a course
// @route   POST /api/courses/:id/lessons
// @access  Private/Instructor
exports.addLesson = async (req, res) => {
    try {
        const { title, videoUrl, textContent } = req.body;
        const course = await Course.findById(req.params.id);

        if (course) {
            // Check if user is instructor or admin
            if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(401).json({ message: 'User not authorized to modify this course' });
            }

            const lesson = {
                title,
                videoUrl,
                textContent,
                order: course.lessons.length + 1
            };

            course.lessons.push(lesson);
            await course.save();

            res.status(201).json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
