const { isObjectIdOrHexString } = require("mongoose");
const Course = require("../models/CourseModal");

// new course
const createNewCourse = async (req, res) => {
    
    const body = req.body;
    console.log(body);

    const tokenId = req.user?.id;
    const userId = req.query?.userId;
    if(tokenId == !userId){
        return res.send({
            message: "Invalid request",
            success:false,
        })
    }

  
    try {
        const course = await Course.create(body);
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

// get single course by ID
const getSingleCourseById = async (req, res) => {  
    const id = req.params?.id;
    try {
        const course = await Course.findById(id).populate('author');
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


// Update single course by ID
const updateSingleCourseById = async (req, res) => {  

    const tokenId = req.user?.id;
    const userId = req.query?.userId;
    if(tokenId == !userId){
        return res.send({
            message: "Invalid request",
            success:false,
        })
    }

    const id = req.params?.id;

   
    try {
        const isExists = await Course.findById(id).populate("author");
        if( !isExists ){
            return res.send({
                message: "Notfound",
                success:false,
            })
        }
      

        // if( isExists.author !== userId ){
        //     return res.send({
        //         message: "Invalid access",
        //         success:false,
        //     })
        // }
        console.log('body ',req.body);
        const body = req.body;
        const course = await Course.findByIdAndUpdate(id , body , {
            new:true,
            runValidators:true
        })

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

// all course
const getAllCourse = async (req, res) => {  
    try {

        const authorRequest = req.query?.author

        let query = {}
        
        if(authorRequest){
            query.author= authorRequest
        }
        const courses = await Course.find(query);

        res.send({
            success:true,
            courses,
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message,
        })
    }
}


module.exports = {
    createNewCourse,
    getSingleCourseById,
    updateSingleCourseById,
    getAllCourse,
}