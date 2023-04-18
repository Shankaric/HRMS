const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const draftSchema = new Schema({

    username:{
        type: String,
        required: false,
    },
    password:{
        type: String,
        required:false,
        
    },
    prefix:{
        type: String,
        required: false,
    },
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
  
    companyname:{
        type: String,
        required: false,
    },
    //Permanenent Address
    pdoorno:{
        type: String,
        require: false,
    }, 
    pstreet:{
        type: String,
        require: false,
    }, 
    parea:{
        type: String,
        require: false,
    },
    plandmark:{
        type: String,
        require: false,
    },
    ptaluk:{
        type: String,
        require: false,
    }, 
    ppost:{
        type: String,
        require: false,
    }, 
    ppincode:{
        type: String,
        require: false,
    }, 
    pcountry:{
        type: String,
        require: false,
    }, 
    pstate:{
        type: String,
        require: false,
    }, 
    pcity:{
        type: String,
        require: false,
    },
    cdoorno:{
        type: String,
        require: false,
    }, 
    cstreet:{
        type: String,
        require: false,
    }, 
    carea:{
        type: String,
        require: false,
    }, 
    clandmark:{
        type: String,
        require: false,
    }, 
    ctaluk:{
        type: String,
        require: false,
    },
    cpost:{
        type: String,
        require: false,
    }, 
    cpincode:{
        type: String,
        require: false,
    }, 
    ccountry:{
        type: String,
        require: false,
    },
    cstate:{
        type: String,
        require: false,
    },
    ccity:{
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
    // files:{
    //     type: [String],
    //     require: false,
    // },
    // accesslocation:{
    //     type: [String],
    //     require: false,
    // },
    acceslocation: [{
        companyname: {
            type: String,
            required: false,
        },
        branch: {
            type: [String],
            required: false,
        },
        unit: {
            type: [String],
            required: false,
        }
    }],
    addAddQuaTodo:[
        {
    addQual: {
        type: String,
        required: false
    },
    addInst:{
        type: String,
        required: false
    },
    duration:{
        type: String,
        required: false
    },
    remarks:{
        type: String,
        required: false
    },
        }
    ],

    files:[
        {  
    data: {
        type: String,
        required: false
    },
    name:{
        type: String,
        required: false
    },
    remark:{
        type: String,
        required: false
    }, 
  
        }
    ],
    eduTodo:[
        {
    qualification: {
        type: String,
        required: false
    },
     institution:{
        type: String,
        required: false
    },
    passedyear:{
        type: String,
        required: false
    },
    cgpa:{
        type: String,
        required: false
    },
        }
    ],
    aadhar:{
        type: String,
        required: false
    },
    panno:{
        type: String,
        required: false
    },

    workhistTodo:[
        {
    empNameTodo: {
        type: String,
        required: false
    },
    desigTodo:{
        type: String,
        required: false
    },
    joindateTodo:{
        type: String,
        required: false
    },
    leavedateTodo:{
        type: String,
        required: false
    },
    dutiesTodo:{ 
            type: String,
            required: false
        },
    reasonTodo:{
            type: String,
            required: false
        },
        }
    ],

    company:{
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



module.exports = mongoose.model('Draft', draftSchema);