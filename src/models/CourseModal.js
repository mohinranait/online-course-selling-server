const {model, Schema, Types} = require('mongoose');


const courseModule = new Schema ({
    name: {
        type: String,
    },
    slug: {
        type: String,
        trim:true,
        lowercase: true
    },
    author: {
        type: Types.ObjectId,
        ref: "User"
    },
    image: {
        type: String,
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
    instructorName: {
        type: String,
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
    schedule: {
        type: String,
    },
    modules : [
        {
            weeklySyllabus: Number,
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
    },
    location: {
        type: String,
        default: 'Online' // Online, Offline
    },
    prerequisites: {
        type: Array
    },
    syllabus: [
        {
            week: Number,
            topic: String,
            content: String,
        }
    ],
    enrollmentStatus: {
        type: String,
        default:"Open",
    }
   
},{timestamps:true})

const Course = model("Course", courseModule)

module.exports  = Course;


