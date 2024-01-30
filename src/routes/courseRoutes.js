const { createNewCourse, getSingleCourseById, updateSingleCourseById,instructorWishCourse, getAllCourse } = require('../controllers/CourseController');
const isAuth = require('../middleware/isAuth');

const courseRoute = require('express').Router();


courseRoute.post(`/course`, isAuth, createNewCourse);
courseRoute.get(`/course/:id`, getSingleCourseById);
courseRoute.patch(`/course/:id`, isAuth, updateSingleCourseById);
courseRoute.get(`/courses`,  getAllCourse);
courseRoute.get(`/instructorys-course/:id`,  instructorWishCourse);



module.exports = courseRoute