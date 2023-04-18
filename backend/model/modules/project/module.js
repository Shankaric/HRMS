const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ModuleSchema = new Schema({
    project:{
        type: String,
        required: false,
    },
    subproject:{
        type: String,
        required: false,
    },
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
module.exports = mongoose.model('Module',ModuleSchema);