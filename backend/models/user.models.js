const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        required: 'Enter Username',
        unique:true,
        trim: true
    },
    firstname:{
        type: String,
        required:'Enter your Firstname',
        trim:true
    },
    lastname:{
        type: String,
        required:'Enter your Lastname',
        trim:true
    },
    email: {
        type: String,
        unique:true,
        required: 'Enter Email',
        trim: true,
        lowercase:true,
    },
    password: {
        type: String,
        required: true
    },
    number:{
        type:Number
    },
    dob:{
        type: Date,
        required: true
    },
    logged:{
        type:Boolean
    },
    resetPasswordToken:String,
    resetPasswordExpires:Date,
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;