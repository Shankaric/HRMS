const Draft = require('../../model/modules/draft');
const ErrorHandler = require('../../utils/errorhandler');
const catchAsyncErrors = require('../../middleware/catchAsyncError');
const bcrypt = require('bcryptjs');
const sendToken = require('../../utils/jwttokentocookie');
const sendEmail = require('../../utils/pwdresetmail');
const crypto = require('crypto');

// get All Draft => /api/drafts
exports.getAllDrafts = catchAsyncErrors(async (req, res, next) => {
    let drafts;

    try{
        drafts = await Draft.find()
    }catch(err){
        console.log(err.message);
    }

    if(!drafts){
        return next(new ErrorHandler('Draft not found', 400));
    }

    return res.status(200).json({drafts});
})

// / register adraft => api/auth/new
exports.regAuth = catchAsyncErrors( async (req, res, next) =>{
    const {prefix, firstname, lastname, legalname, fathername, mothername, gender, maritalstatus, dob,username,password,
                bloodgroup, profileimage, location, email, contactpersonal, contactfamily, emergencyno, doj, dop, name,
            contactno, details, companyname,  pdoorno, pstreet, parea, plandmark, ptaluk, ppos, ppincode, pcountry, pstate
            , pcity, cdoorno, cstreet, carea, clandmark, ctaluk, cpost, cpincode, ccountry,  cstate,ccity, branch, floor, company,
            department,team, designation, shifttiming, reportingto, empcode, remark,accesslocation,files,eduTodo,addAddQuaTodo,workhistTodo} = req.body;
  
    // encrypt password before saving
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)
    const draft = await Draft.create({
        prefix,username,lastname,email,firstname,legalname,fathername, mothername, gender, maritalstatus, dob,
                bloodgroup, profileimage, location, email, contactpersonal, contactfamily, emergencyno, doj, dop, name,
            contactno, details, companyname,  pdoorno, pstreet, parea, plandmark, ptaluk, ppos, ppincode, pcountry, pstate,
            pcity, cdoorno, cstreet, carea, clandmark, ctaluk, cpost, cpincode, ccountry,  cstate,ccity, branch, floor, 
            department,team, designation, shifttiming, reportingto, empcode, remark,accesslocation,files,eduTodo,company,addAddQuaTodo,workhistTodo,
        password: hashPassword,
    })
    return res.status(201).json({
        success: true,
        draft
    })
})

// Login user => api/drafts
exports.loginAuth = catchAsyncErrors(async (req, res, next) =>{
    const { username, password } = req.body;

    // Check if email & password entered by user
    if(!username || !password ){
        return next(new ErrorHandler('Please enter username and password', 400));
    } 

    // Finding if user exists in database
    const draft = await Draft.findOne({ username }).select('+password');

    if(!draft){
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

// get Signle draft => /api/auth/:id
exports.getSingleDraft = catchAsyncErrors(async (req, res, next)=>{

    const sdraft = await Draft.findById(req.params.id);


    if (!sdraft) {
        return next(new ErrorHandler('User not found', 404));
    }

    return res.status(200).json({
        success: true,
        sdraft
    })
})

// update draft by id => /api/auth/:id
exports.updateDraft = catchAsyncErrors(async (req, res, next) => {

    const id = req.params.id;
    const {prefix, firstname, lastname, legalname, fathername, mothername, gender, maritalstatus, dob,username,password,
        bloodgroup, profileimage, location, email, contactpersonal, contactfamily, emergencyno, doj, dop, name,
    contactno, details, companyname,  pdoorno, pstreet, parea, plandmark, ptaluk, ppos, ppincode, pcountry, pstate
    , pcity, cdoorno, cstreet, carea, clandmark, ctaluk, cpost, cpincode, ccountry,  cstate,ccity, branch, floor, company,
    department,team, designation, shifttiming, reportingto, empcode, remark,accesslocation,files,eduTodo,addAddQuaTodo} = req.body;
    

    const updraft = await Draft.findByIdAndUpdate(id, req.body);

    if (!updraft) {
        return next(new ErrorHandler('Draft not found', 404));
    }

    return res.status(200).json({ message: 'Updated successfully!'})
})

// delete draft by id => /api/auth/:id
exports.deleteDraft = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id; 

    const ddraft = await Draft.findByIdAndRemove(id);

    if (!ddraft) {
        return next(new ErrorHandler('Draft not found', 404));
    }

    res.status(200).json({ message: 'Deleted successfully'})
})