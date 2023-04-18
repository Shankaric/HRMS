const SubModule = require('../../../model/modules/project/submodule');
const ErrorHandler = require('../../../utils/errorhandler');
const catchAsyncErrors = require('../../../middleware/catchAsyncError');

//get All SubModule =>/api/submodules
exports.getAllSubModule = catchAsyncErrors(async (req, res, next) => {
    let submodules;
    try{
        submodules = await SubModule.find()
    }catch(err){
        console.log(err.message);
    }
    if(!submodules){
        return next(new ErrorHandler('SubModule not found!', 404));
    }
    return res.status(200).json({
        submodules
    });
})
//create new submodule => /api/submodule/new
exports.addSubModule = catchAsyncErrors(async (req, res, next) =>{
    let checksubproj = await SubModule.findOne({ name: req.body.name });
    if(checksubproj){
        return next(new ErrorHandler('Name already exist!', 400));
    }
    let asubmodule = await SubModule.create(req.body);
    return res.status(200).json({ 
        message: 'Successfully added!' 
    });
})
// get Single submodule => /api/submodule/:id
exports.getSingleSubModule = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let ssubmodule = await SubModule.findById(id);
    if(!ssubmodule){
        return next(new ErrorHandler('SubModule not found', 404));
    }
    return res.status(200).json({
        ssubmodule
    })
})

//update submodule by id => /api/submodule/:id
exports.updateSubModule = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    let usubmodule = await SubModule.findByIdAndUpdate(id, req.body);
    if (!usubmodule) {
      return next(new ErrorHandler('SubModule not found', 404));
    }
    
    return res.status(200).json({message: 'Updated successfully' });
})
//delete submodule by id => /api/submodule/:id
exports.deleteSubModule = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let dsubmodule = await SubModule.findByIdAndRemove(id);
    if(!dsubmodule){
        return next(new ErrorHandler('SubModule not found', 404));
    }
    
    return res.status(200).json({message: 'Deleted successfully'});
})