const Designationgroup = require('../../model/modules/Designationgroup');
const ErrorHandler = require('../../utils/errorhandler');
const catchAsyncErrors = require('../../middleware/catchAsyncError');


// get All Designationgroup => /api/Designationgroup
exports.getAllDesiggroup = catchAsyncErrors(async (req, res, next) => {
    let desiggroup;
    try{
        desiggroup = await Designationgroup.find()
    }catch(err){
        console.log(err.message);
    }
    if(!desiggroup){
        return next(new ErrorHandler('Manage not found!', 404));
    }
    return res.status(200).json({
        // count: products.length,
        desiggroup
    });
})

// Create new Designationgroup=> /api/desiggroup/new
exports.adddesiggroup = catchAsyncErrors(async (req, res, next) =>{
   let aproduct = await Designationgroup.create(req.body)

    return res.status(200).json({ 
        message: 'Successfully added!' 
    });
})

// get Signle Designationgroup => /api/desiggroup/:id
exports.getSingledesiggroup = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;

    let sdesiggroup = await Designationgroup.findById(id);

    if(!sdesiggroup){
        return next(new ErrorHandler('desiggroup not found!', 404));
    }
    return res.status(200).json({
        sdesiggroup
    })
})

// update desiggroup by id => /api/desiggroup/:id
exports.updatedesiggroup = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    let udesiggroup = await Designationgroup.findByIdAndUpdate(id, req.body);

    if (!udesiggroup) {
      return next(new ErrorHandler('desiggroup not found!', 404));
    }
    return res.status(200).json({message: 'Updated successfully' });
})

// delete Designationgroup by id => /api/desiggroup/:id
exports.deletedesiggroup = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;

    let ddesiggroup = await Designationgroup.findByIdAndRemove(id);

    if(!ddesiggroup){
        return next(new ErrorHandler('desiggroup not found!', 404));
    }
    return res.status(200).json({message: 'Deleted successfully'});
})
