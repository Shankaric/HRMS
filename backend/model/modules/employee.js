const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AddEmployeeSchema = new Schema({

    //personal information
    firstname:{
        type: String,
        required: false,
    },
    lastname:{
        type: String,
        required: false,
    },
    legalname:{
        type: String,
        required: false,
    },
    fathername:{
        type: String,
        required: false,
    },

    mothername:{
        type: String,
        required: false,
    },
    gender:{
        type: String,
        required: false,
    },
    maritalstatus:{
        type: String,
        required: false,
    },
    dob:{
        type: String,
        required: false,
    },
    bloodgroup:{
        type: String,
        required: false,
    },
    profileimage:  {
        type: String,
        required: false
    },
    location:{
        type: String,
        required: false,
    },
    email:{
        type: String,
        required: false,
    },
    contactpersonal:{
        type: String,
        required: false,
    },
    contactfamily:{
        type: String,
        required: false,
    },
    emergencyno:{
        type: String,
        required: false,
    },
    doj:{
        type: String,
        required: false,
    },
    dop:{
        type: String,
        required: false,
    },
    //reference details...
    name:{
        type: String,
        required: false,
    },
    contactno:{
        type: String,
        required: false,
    },
    details:{
        type: String,
        required: false,
    },
    //login details....
    loginname:{
        type: String,
        required: false,
    },
    password:{
        type: String,
        required: false,
    },
    companyname:{
        type: String,
        required: false,
    },
    //Permanenent Address
    doorno:{
        type: String,
        required: false,
    },
    street:{
        type: String,
        require: false,
    },
    area:{
        type: String,
        require: false,
    },
    landmark:{
        type: String,
        require: false,
    },
    thaluka:{
        type: String,
        require: false,
    },
    post:{
        type: String,
        require: false,
    },
    pincode:{
        type: String,
        require: false,
    },
    country:{
        type: String,
        require: false,
    },
    state:{
        type: String,
        require: false,
    },
    city:{
        type: String,
        require: false,
    },
    //Available
    companyname:{
        type: String,
        require: false,
    },
    //Boarding inforamtion
    branch:{
        type: String,
        require: false,
    },
    floor:{
        type: String,
        require: false,
    },
    department:{
        type: String,
        require: false,
    },
    team:{
        type: String,
        require: false,
    },
    designation:{
        type: String,
        require: false,
    },
    shifttiming:{
        type: String,
        require: false,
    },
    reportingto:{
        type: String,
        require: false,
    },
    empcode:{
        type: String,
        require: false,
    },
    //upload
    remark:{
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
    },
})
module.exports = mongoose.model('AddEmployee',AddEmployeeSchema);