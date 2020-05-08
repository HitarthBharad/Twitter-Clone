const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var twitSchema = new Schema({
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
    content:{
        type: String,
        required:true,
    },
    like:{
        type:[{
            name:String,
        }],
        unique:true
    },
    comment:{
        type:[{
            id: String,
            name: String,
            content: String
        }]
    }
},{
    timestamps: true
});

const Twit = mongoose.model('Twit', twitSchema);
module.exports = Twit;