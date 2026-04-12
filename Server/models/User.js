import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['user' , 'admin'],
        default : 'user'
    }
}, {timestamps : true})

const User = mongoose.model("User" , userschema)

export default User