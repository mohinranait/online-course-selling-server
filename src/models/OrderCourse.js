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

   
},{timestamps:true})

const Order = model("Order", orderSchema)

module.exports  = Order;


