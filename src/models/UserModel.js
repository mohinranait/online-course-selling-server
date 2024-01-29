const {model, Schema} = require('mongoose');


const userSchema = new Schema ({
    name: {
        type: String,
    },
    email: {
        type: String,
        trim:true,
        lowercase: true
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        default: 'user' // user , admin
    },
    password: {
        type: String,
    },
    avater: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    bio: {
        type: String,
    },
    rating: {
        type: Number,
        default:0
    },
},{timestamps:true})

const User = model("User", userSchema)

module.exports  = User;


