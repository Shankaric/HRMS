const Department = require('../../model/modules/department')
const ErrorHandler = require('../../utils/errorhandler');
const catchAsyncErrors = require('../../middleware/catchAsyncError');


// get All Department Details => /api/Departments

exports.getAllDepartmentDetails = catchAsyncErrors(async (req, res, next) => {
    let departmentdetails;

    try{
        departmentdetails = await Department.find()
    }catch(err){
        console.log(err.message);
    }

    if(!departmentdetails){
        return next(new ErrorHandler('Department details not found', 404));
    }

    return res.status(200).json({
        // count: Departments.length,
        departmentdetails
    });
})

// Create new Department => /api/department/new
exports.addDepartmentDetails = catchAsyncErrors(async (req, res, next) =>{
    let checkloc = await Department.findOne({ deptname: req.body.deptname });

    if(checkloc){
        return next(new ErrorHandler('Department name already exist!', 400));
    }

    let adepartmentdetails = await Department.create(req.body);

    return res.status(200).json({ 
        message: 'Successfully added!' 
    });
})

// get Signle Department => /api/department/:id

exports.getSingleDepartmentDetails = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;

    let sdepartmentdetails = await Department.findById(id);

    if(!sdepartmentdetails){
        return next(new ErrorHandler('Department not found', 404));
    }

    return res.status(200).json({
        sdepartmentdetails
    })
})

// update Department by id => /api/customer/:id

exports.updateDepartmentDetails = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    let updepartmentdetails = await Department.findByIdAndUpdate(id, req.body);

    if (!updepartmentdetails) {
      return next(new ErrorHandler('Department Details not found', 404));
    }
    
    return res.status(200).json({message: 'Updates successfully' });
})

// delete Department by id => /api/customer/:id

exports.deleteDepartmentDetails = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let ddepartmentdetails = await Department.findByIdAndRemove(id);

    if(!ddepartmentdetails){
        return next(new ErrorHandler('Department Details not found', 404));
    }
    
    return res.status(200).json({message: 'Deleted successfully'});
})