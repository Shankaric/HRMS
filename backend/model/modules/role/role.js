const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const roleSchema = new Schema({
    name:{
        type: String,
        required: false,
    },
    projectall:{
        type: Boolean,
        required: false,
    },
    addedby:{
        type: String,
        required: false,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Role',roleSchema);