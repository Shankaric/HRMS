const AddEmployee= require('../../model/modules/employee');
const ErrorHandler = require('../../utils/errorhandler');
const catchAsyncErrors = require('../../middleware/catchAsyncError');
//get All AddEmployee =>/api/addemployees
exports.getAllAddEmployee = catchAsyncErrors(async (req, res, next) => {
    let addemployees;
    try{
        addemployees = await AddEmployee.find()
    }catch(err){
        console.log(err.message);
    }
    if(!addemployees){
        return next(new ErrorHandler('AddEmployee  not found!', 404));
    }
    return res.status(200).json({
        addemployees
    });
})
//create new addemployee => /api/addemployee/new
exports.addEmployee = catchAsyncErrors(async (req, res, next) =>{
    let aaddemployee= await AddEmployee.create(req.body);
    return res.status(200).json({ 
        message: 'Successfully added!' 
    });
})
// get Single addemployee => /api/addemployee/:id
exports.getSingleAddEmployee= catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let saddemployee = await AddEmployee.findById(id);
    if(!saddemployee){
        return next(new ErrorHandler('AddEmployee not found', 404));
    }
    return res.status(200).json({
        saddemployee
    })
})
//update addemployee by id => /api/addempoyee/:id
exports.updateAddEmployee = catchAsyncErrors(async (req, res, next) =>  {
    const id = req.params.id;
    let uaddemployee = await AddEmployee.findByIdAndUpdate(id, req.body);
    if (!uaddemployee) {
      return next(new ErrorHandler('AddEmployee not found', 404));
    }
    
    return res.status(200).json({message: 'Updated successfully' });
})
//delete addemployee by id => /api/addem[ployee/:id
exports.deleteAddEmployee = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let daddemployee = await AddEmployee.findByIdAndRemove(id);
    if(!daddemployee){
        return next(new ErrorHandler('AddEmployee not found', 404));
    }
    
    return res.status(200).json({message: 'Deleted successfully'});
})