const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const excel = new Schema({
    // priority:{
    //     type: String,
    //     required: true,
    // },
    // customer:{
    //     type: String,
    //     required: false,
    // },
   
    // process:{
    //     type: String,
    //     required: false,
    // },
    // count:{
    //     type: String,
    //     required: false,
    // },
    // tat:{
    //     type: String,
    //     required: false
    // },
    // duration:{
    //     type: String,
    //     required: false
    // },
    // created:{
    //     type: String,
    //     required: false
    // },
    exceldata:[
        {
        customer:{
            type: String,
            required: false,
        },
    
        process:{
            type: String,
            required: false,
        },
        count:{
            type: String,
            required: false,
        },
        tat:{
            type: String,
            required: false
        },
        created:{
            type: String,
            required: false
        }, 
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now,
    },
})
module.exports = mongoose.model('Excel', excel);