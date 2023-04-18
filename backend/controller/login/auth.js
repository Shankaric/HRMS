const User = require('../../model/login/auth');
const ErrorHandler = require('../../utils/errorhandler');
const catchAsyncErrors = require('../../middleware/catchAsyncError');
const bcrypt = require('bcryptjs');
const { decryptPassword } = require('./decryptPassword');
const sendToken = require('../../utils/jwttokentocookie');
const sendEmail = require('../../utils/pwdresetmail');
const crypto = require('crypto');

// get All user => /api/users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    let users;

    try{
        users = await User.find()
    }catch(err){
        console.log(err.message);
    }

    if(!users){
        return next(new ErrorHandler('Users not found', 400));
    }

    return res.status(200).json({users});
})

// / register auser => api/auth/new
exports.regAuth = catchAsyncErrors( async (req, res, next) =>{
    const {prefix, firstname, lastname, legalname, fathername, mothername, gender, maritalstatus, dob,username,password,status,percentage,
                bloodgroup, profileimage, location, email, contactpersonal, contactfamily, emergencyno, doj, dot, referencename,
            contactno, details, companyname,  pdoorno, pstreet, parea, plandmark, ptaluk, ppos, ppincode, pcountry, pstate,aadhar,panno,
            pcity, cdoorno, cstreet, carea, clandmark, ctaluk, cpost, cpincode, ccountry,  cstate,ccity, branch, floor, company,experience,
            department,team, designation, shifttiming, reportingto, empcode, remark,accesslocation,files,eduTodo,addAddQuaTodo,workhistTodo,draft} = req.body;
    if(!username || !password){
        return next(new ErrorHandler('Please fill all fields', 400));
    }
    // encrypt password before saving
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
        prefix,username,lastname,email,firstname,legalname,fathername, mothername, gender, maritalstatus, dob,draft,status,percentage,
                bloodgroup, profileimage, location, email, contactpersonal, contactfamily, emergencyno, doj, dot, referencename,
            contactno, details, companyname,  pdoorno, pstreet, parea, plandmark, ptaluk, ppos, ppincode, pcountry, pstate,aadhar,panno,
            pcity, cdoorno, cstreet, carea, clandmark, ctaluk, cpost, cpincode, ccountry,  cstate,ccity, branch, floor, experience,
            department,team,draft, designation, shifttiming, reportingto, empcode, remark,accesslocation,files,eduTodo,company,addAddQuaTodo,workhistTodo,
        password: hashPassword,
    })
    return res.status(201).json({
        success: true,
        user
    })
})

// Login user => api/users
exports.loginAuth = catchAsyncErrors(async (req, res, next) =>{
    const { username, password } = req.body;

    // Check if email & password entered by user
    if(!username || !password ){
        return next(new ErrorHandler('Please enter username and password', 400));
    }

    // Finding if user exists in database
    const user = await User.findOne({ username }).select('+password');
    if(!user){
        return next(new ErrorHandler('Invalid Username or Password', 401));
    }

    // If checks password is correct or not
    const isPwdMatched = await bcrypt.compare(password, user.password);

    if(!isPwdMatched){
        return next(new ErrorHandler('Invalid Password', 401));
    }

    sendToken(user, 200, res);
})



// Logout user => api/authout
exports.loginOut = catchAsyncErrors(async (req, res, next) =>{

    res.cookie('token', null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out!'
    })

});

// get Signle user => /api/auth/:id
exports.getSingleUser = catchAsyncErrors(async (req, res, next)=>{


      const suser = await User.findById(req.params.id);
    //   const decryptedPassword = decryptPassword(suser.password, suser.salt);
    //   suser.password = decryptedPassword;
    //   res.json(suser);

    if (!suser) {
        return next(new ErrorHandler('User not found', 404));
    }

    return res.status(200).json({
        success: true,
        suser
    })
})

// update user by id => /api/user/:id
exports.updateUserPwd = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    const upuserone = await User.findByIdAndUpdate(id, req.body);

    if (!upuserone) {
        return next(new ErrorHandler('User not found', 404));
    }

    return res.status(200).json({ message: 'Updated successfully!'})
    
})

// update user by id => /api/auth/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {

    const {prefix, firstname, lastname, legalname, fathername, mothername, gender, maritalstatus, dob,username,password,status,percentage,
        bloodgroup, profileimage, location, email, contactpersonal, contactfamily, emergencyno, doj, dot, referencename,
    contactno, details, companyname,  pdoorno, pstreet, parea, plandmark, ptaluk, ppost, ppincode, pcountry, pstate,unit,aadhar,panno,
     pcity, cdoorno, cstreet, carea, clandmark, ctaluk, cpost, cpincode, ccountry,  cstate,ccity, branch, floor, company,experience,
    department,team, designation, shifttiming,draft, reportingto, empcode, remark,accesslocation,files,eduTodo,addAddQuaTodo,workhistTodo} = req.body;
       // encrypt password before saving
       const salt = await bcrypt.genSalt(10);
       const hashPassword = await bcrypt.hash(password, salt)
  
       const id = req.params.id;

    const upuser = await User.findByIdAndUpdate(id,{prefix,username,lastname,email,firstname,legalname,fathername, mothername, gender, maritalstatus, dob,
        bloodgroup, profileimage, location, email, contactpersonal, contactfamily, emergencyno, doj, dot, referencename,status,percentage,
    contactno, details, companyname,  pdoorno, pstreet, parea, plandmark, ptaluk, ppost, ppincode, pcountry, pstate,aadhar,panno,
    pcity, cdoorno, cstreet, carea, clandmark, ctaluk, cpost, cpincode, ccountry,  cstate,ccity, branch, floor,experience, unit,
    department,team, designation, shifttiming, reportingto, draft,empcode, remark,accesslocation,files,eduTodo,company,addAddQuaTodo,workhistTodo,
password: hashPassword});


    if (!upuser) {
        return next(new ErrorHandler('User not found', 404));
    }

    return res.status(200).json({ message: 'Updated successfully!',upuser})
})

// delete user by id => /api/auth/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;

    const duser = await User.findByIdAndRemove(id);

    if (!duser) {
        return next(new ErrorHandler('User not found', 404));
    }

    res.status(200).json({ message: 'Deleted successfully'})
})