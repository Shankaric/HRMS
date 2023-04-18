const Module = require('../../../model/modules/project/module');
const ErrorHandler = require('../../../utils/errorhandler');
const catchAsyncErrors = require('../../../middleware/catchAsyncError');
//get All Module =>/api/modules
exports.getAllModule = catchAsyncErrors(async (req, res, next) => {
    let modules;
    try{
        modules = await Module.find()
    }catch(err){
        console.log(err.message);
    }
    if(!modules){
        return next(new ErrorHandler('Module not found!', 404));
    }
    return res.status(200).json({
        modules
    });
})
//create new module => /api/module/new
exports.addModule = catchAsyncErrors(async (req, res, next) =>{
    let checkmain = await Module.findOne({ name: req.body.name });
    if(checkmain){
        return next(new ErrorHandler('Name already exist!', 400));
    }
    let amodule = await Module.create(req.body);
    return res.status(200).json({ 
        message: 'Successfully added!' 
    });
})
// get Single module => /api/module/:id
exports.getSingleModule = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let smodule = await Module.findById(id);
    if(!smodule){
        return next(new ErrorHandler('Module not found', 404));
    }
    return res.status(200).json({
        smodule
    })
})

//update module by id => /api/module/:id
exports.updateModule = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    let umodule = await Module.findByIdAndUpdate(id, req.body);
    if (!umodule) {
      return next(new ErrorHandler('Module not found', 404));
    }
    
    return res.status(200).json({message: 'Updated successfully' });
})
//delete module by id => /api/module/:id
exports.deleteModule = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let dmodule = await Module.findByIdAndRemove(id);
    if(!dmodule){
        return next(new ErrorHandler('Module not found', 404));
    }
    
    return res.status(200).json({message: 'Deleted successfully'});
})