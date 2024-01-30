
const { createOrder, getAllOrder, courseVidesGetById, enrolledCourseExists } = require('../controllers/OrderController');
const isAuth = require('../middleware/isAuth');


const orderRoute = require('express').Router();

orderRoute.post(`/order`, isAuth, createOrder);
orderRoute.get(`/orders`, getAllOrder);
orderRoute.get(`/course-video/:id`, isAuth, courseVidesGetById);
orderRoute.get(`/course-exists`, isAuth, enrolledCourseExists);




module.exports = orderRoute