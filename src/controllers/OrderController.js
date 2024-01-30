const Course = require("../models/CourseModal");
const Order = require("../models/OrderCourse");

const createOrder = async (req, res) => {
    const tokenId = req.user?.id;
    const userId = req.query?.userId;
    const body  = req.body;
    const courseId = body?.course;
    if(tokenId == !userId){
        return res.send({
            message: "Invalid request",
            success:false,
        })
    }

    try {
        const order = await Order.create(body);
        const course = await Course.findById({_id:courseId})
        await Course.findByIdAndUpdate({_id:courseId}, {
            totalStudents: [...course.totalStudents, userId ]
        })
        res.send({
            success:true,
            order,
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message,
        })
    }
}

// get all orders
const getAllOrder = async (req, res) => {

    const userId = req.query?.userId;
    const request = req.query?.request;


    let query = {};

    if(request ==='customer'){
        query.courseReciver = userId
    }

    try {
        const orders = await Order.find(query).populate('course');
        res.send({
            success:true,
            orders,
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message,
        })
    }
}


// check already enrolled user
const enrolledCourseExists = async (req,res) => {
    const tokenId = req.user?.id;
    if(!tokenId){
        return res.send({
            message: "Unauthorize",
            success:false,
        })
    }
    const courseId = req.query?.courseId;
    const query = {
        course : courseId,
        courseReciver:  tokenId,
    }
    console.log(query);
    try {
        const find = await Order.findOne(query);
        console.log(find);
        let exists = false;
        if(find){
            console.log('exists');
            exists = true
        }
        console.log(exists);
        res.send({
            success:true,
            exists, 
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message,
        })
    }
}

// get single order 
const courseVidesGetById = async (req,res) => {
    const id = req?.params?.id;
    const tokenId = req.user?.id;
    const userId = req.query?.userId;

    if(tokenId == !userId){
        return res.send({
            message: "Invalid request",
            success:false,
        })
    }

    try {
        const course = await Order.findById(id).populate('course');
        res.send({
            success:true,
            course,
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message,
        })
    }
}

module.exports = {
    createOrder,
    getAllOrder,
    courseVidesGetById,
    enrolledCourseExists
}