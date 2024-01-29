const {model, Schema, Types} = require('mongoose');


const orderSchema = new Schema ({

    course: {
        type: Types.ObjectId,
        ref: "Course"
    },
    courseAuthor: {
        type: Types.ObjectId,
        ref: "User"
    },
    courseReciver: {
        type: Types.ObjectId,
        ref: "User"
    },
    prograss: {
        type: Number,
        default:0
    },
    descripton: {
        type: String,
    },
    totalRating: {
        type: Number,
        default:0
    },
    courseLevel: {
        type: String,
        default: "Intermediate"
    },
    totalStudents: {
        type: Array,
    },

    lesson: {
        type: Number,
        default:0
    },
    price: {
        type: Number,
        default:0
    },
    category: {
        type: String,
    },
    totalDuration: {
        type: Number,
        default:0
    },
    status: {
        type: String,
        default: 'InActive' , // Active, InActive
    },
    modules : [
        {
            name: {type:String},
            duration: {type:Number},
            isLock: {type:Boolean}, // true, false
            video: {type:String}, 
        }
    ],
    certificate: {
        type: Boolean,
        default: true
    },
    language: {
        type: String,
        default: 'English'
    }
   
},{timestamps:true})

const Course = model("Course", courseModule)

module.exports  = Course;


