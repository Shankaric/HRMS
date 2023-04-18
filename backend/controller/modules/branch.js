const Branch = require('../../model/modules/branch');
const ErrorHandler = require('../../utils/errorhandler');
const catchAsyncErrors = require('../../middleware/catchAsyncError');

// get All branch => /api/branches
exports.getAllBranch = catchAsyncErrors(async (req, res, next) => {
    let branch;
    try{
        branch = await Branch.find()
    }catch(err){
        console.log(err.message);
    }
    if(!branch){
        return next(new ErrorHandler('Branch not found!', 404));
    }
    return res.status(200).json({
        branch
    });
})

// Create new branch => /api/branch/new
exports.addBranch = catchAsyncErrors(async (req, res, next) =>{

    let checkloc = await Branch.findOne({ code: req.body.code });

    if(checkloc){
        return next(new ErrorHandler('Code already exist!', 400));
    }

   let abranch = await Branch.create(req.body)

    return res.status(200).json({ 
        message: 'Successfully added!' 
    });
})

// get Single Branch => /api/branch/:id
exports.getSingleBranch = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;

    let sbranch = await Branch.findById(id);

    if(!sbranch){
        return next(new ErrorHandler('Branch not found!', 404));
    }
    return res.status(200).json({
        sbranch
    })
})
// update branch by id => /api/branch/:id
exports.updateBranch = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    let ubranch = await Branch.findByIdAndUpdate(id, req.body);

    if (!ubranch) {
      return next(new ErrorHandler('Branch not found!', 404));
    }
    return res.status(200).json({message: 'Updated successfully' });
})
// delete branch by id => /api/branch/:id
exports.deleteBranch = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let dbranch = await Branch.findByIdAndRemove(id);

    if(!dreturn){
        return next(new ErrorHandler('Branch not found!', 404));
    }
    return res.status(200).json({message: 'Deleted successfully'});
})