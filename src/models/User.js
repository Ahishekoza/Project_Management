import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    contactNumber:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    address:{
        type:String
    },
    role:{
        type:String,
        enum:["admin","client","vendor"],
        default:"client"        
    }
},{
    timestamps:true
})


export const UserSchema = mongoose.models.User || mongoose.model("User", userSchema);
