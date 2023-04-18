const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const projectSchema = new Schema({
    name:{
        type: String,
        required: false,
    },
    estimation:{
        type: String,
        required: false,
    },
    estimationtime:{
        type: String,
        required: false,
    },
    uploads:{
        type: String,
        required: false,
    },
    files:[
        {  
    base64: {
        type: String,
        required: false
    },
    name:{
        type: String,
        required: false
    },  
    preview:{
        type: String,
        required: false
    },
    size:{
         type: String,
        required: false
    },
    type:{
        type: String,
        required: false
    },
        }
    ],
    addedby:[
        {
        name:{
            type: String,
            required: false,
        },
        date:{
            type: String,
            required: false,
        },
    
    }],
    updatedby:[
        {
        name:{
            type: String,
            required: false,
        },
        date:{
            type: String,
            required: false,
        },
    
    }],
    createdAt:{
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Project',projectSchema);