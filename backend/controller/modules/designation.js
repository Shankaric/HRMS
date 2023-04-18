const Designation = require('../../model/modules/Designation');
const ErrorHandler = require('../../utils/errorhandler');
const catchAsyncErrors = require('../../middleware/catchAsyncError');

// get All Designation => /api/Designation
exports.getAllDesignation = catchAsyncErrors(async (req, res, next) => {
    let designation;
    try{
        designation = await Designation.find()
    }catch(err){
        console.log(err.message);
    }
    if(!designation){
        return next(new ErrorHandler('Designation not found!', 404));
    }
    return res.status(200).json({
        // count: products.length,
        designation
    });
})

// Create new Designation=> /api/desiggroup/new
exports.adddesignation = catchAsyncErrors(async (req, res, next) =>{
   let aproduct = await Designation.create(req.body)
    return res.status(200).json({ 
        message: 'Successfully added!' 
    });
})

// get Signle Designation => /api/desiggroup/:id
exports.getSingledesignation = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let sdesiggroup = await Designation.findById(id);
    if(!sdesiggroup){
        return next(new ErrorHandler('Designation not found!', 404));
    }
    return res.status(200).json({
        sdesiggroup
    })
})

// update Designation by id => /api/Designation/:id
exports.updatedesignation = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    let udesignation = await Designation.findByIdAndUpdate(id, req.body);
    if (!udesignation) {
      return next(new ErrorHandler('Designation not found!', 404));
    }
    return res.status(200).json({message: 'Updated successfully' });
})

// delete Designation by id => /api/Designation/:id
exports.deletedesignation = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let ddesignation = await Designation.findByIdAndRemove(id);
    if(!ddesignation){
        return next(new ErrorHandler('Designation not found!', 404));
    }
    return res.status(200).json({message: 'Deleted successfully'});
})