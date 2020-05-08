const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var profileSchema = new Schema({
    userid: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },    
    following: {
        type: []
    },
    follower: {
        type: []
    },
    bio:{
        type: String,
    },
    mytwit:{
        type:[]
    }
},{
    timestamps: true
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;