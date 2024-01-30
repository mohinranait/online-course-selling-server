const { isObjectIdOrHexString } = require("mongoose");
const Course = require("../models/CourseModal");
const User = require("../models/UserModel");

// new course
const createNewCourse = async (req, res) => {
    
    const body = req.body;


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
        const category = req.query?.cat;
        const language = req.query?.lan;
        const skills = req.query?.skil;
        const search = req.query?.search;
        const sortFiled = req.query?.filed || 'createdAt';
        const sortOrder = req.query?.order || 'desc';

        let query = {}
        
        if(authorRequest){
            query.author= authorRequest
        }
        
        if(category && category != 'null'){
            query.category = category            
        }

        if(language && language != 'null'){
            query.language = language            
        }

        if(skills && skills != 'null'){
            query.courseLevel = skills            
        }


        const searchRegExp = new RegExp(".*"+search+".*",'i')

        if(search && search !== 'null'){
            query.$or = [
                {name : {$regex: searchRegExp}},
                {instructorName: {$regex: searchRegExp}}
            ]
        }

        const courses = await Course.find(query)
        .sort({[sortFiled]: sortOrder });

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

// all course
const instructorWishCourse = async (req, res) => {  
    try {

        const category = req.query?.cat;
        const skills = req.query?.skil;
        const search = req.query?.search;
        const sortFiled = req.query?.filed || 'createdAt';
        const sortOrder = req.query?.order || 'desc';

        const instructorId = req.params?.id;

        let query = {
            author : instructorId
        }
        
        
        if(category && category != 'null'){
            query.category = category            
        }

        if(skills && skills != 'null'){
            query.courseLevel = skills            
        }


        const searchRegExp = new RegExp(".*"+search+".*",'i')

        if(search && search !== 'null'){
            query.$or = [
                {name : {$regex: searchRegExp}},
                {instructorName: {$regex: searchRegExp}}
            ]
        }

        const courses = await Course.find(query)
        .sort({[sortFiled]: sortOrder });
        const instructor = await User.findById({_id: instructorId}).select("-password") 

        res.send({
            success:true,
            courses,
            instructor
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
    instructorWishCourse
}