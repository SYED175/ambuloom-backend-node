import mongoose from "mongoose";


const schema = new mongoose.Schema({
    studentName:{
        type:String,
        required:true
    },
    age:{},
    email:{
        type: String,
        required: true,
        unique: true,
      },
    gender:{
        type:String,
        required:true
    },
    parentName:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    education:{
        type:String,
    },
})

export const Student = mongoose.model("Student",schema);