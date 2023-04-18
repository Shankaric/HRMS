const Shift = require('../../model/modules/shift');
const ErrorHandler = require('../../utils/errorhandler');
const catchAsyncErrors = require('../../middleware/catchAsyncError');
//get All Shifts =>/api/shifts
exports.getAllShift = catchAsyncErrors(async (req, res, next) => {
    let shifts;
    try{
        shifts = await Shift.find()
    }catch(err){
        console.log(err.message);
    }
    if(!shifts){
        return next(new ErrorHandler('Shift not found!', 404));
    }
    return res.status(200).json({
        shifts
    });
})
//create new shift => /api/shift/new
exports.addShift = catchAsyncErrors(async (req, res, next) =>{
    let ashift = await Shift.create(req.body);
    return res.status(200).json({ 
        message: 'Successfully added!' 
    });
})
// get Single shift=> /api/shift/:id
exports.getSingleShift = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let sshift = await Shift.findById(id);
    if(!sshift){
        return next(new ErrorHandler('Shift not found', 404));
    }
    return res.status(200).json({
        sshift
    })
})
//update shift by id => /api/shift/:id
exports.updateShift = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    let ushift = await Shift.findByIdAndUpdate(id, req.body);
    if (!ushift) {
      return next(new ErrorHandler('Shift not found', 404));
    }
    
    return res.status(200).json({message: 'Updated successfully' });
})
//delete shift by id => /api/shift/:id
exports.deleteShift = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let dshift = await Shift.findByIdAndRemove(id);
    if(!dshift){
        return next(new ErrorHandler('Shift not found', 404));
    }
    
    return res.status(200).json({message: 'Deleted successfully'});
})