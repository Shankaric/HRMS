const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ShiftSchema = new Schema({
    branch:{
        type: String,
        required: false,
    },
    name:{
        type: String,
        required: false,
    },
    fromhour:{
        type: String,
        required: false,
    },
    tohour:{
        type: String,
        require: false,
    },
    frommin:{
        type: String,
        required: false,
    },
    tomin:{
        type: String,
        require: false,
    },
    fromtime:{
        type: String,
        required: false,
    },
    totime:{
        type: String,
        require: false,
    },
    payhours:{
        type: Number,
        require: false,
    },
    breakhours:{
        type: Number,
        require: false,
    },
    isallowance:{
        type: String,
        require: false,
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
module.exports = mongoose.model('Shift',ShiftSchema);