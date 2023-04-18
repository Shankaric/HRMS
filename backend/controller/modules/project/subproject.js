const Subproject = require('../../../model/modules/project/subproject')
const ErrorHandler = require('../../../utils/errorhandler');
const catchAsyncErrors = require('../../../middleware/catchAsyncError');
// get All Subproject Details => /api/Subprojects
exports.getAllSubproject = catchAsyncErrors(async (req, res, next) => {
    let subprojects;
    try{
        subprojects = await Subproject.find()
    }catch(err){
        console.log(err.message);
    }
    if(!subprojects){
        return next(new ErrorHandler('Subproject details not found', 404));
    }
    return res.status(200).json({
        // count: Subproject.length,
        subprojects
    });
})
// Create new Subproject => /api/subproject/new
exports.addSubproject = catchAsyncErrors(async (req, res, next) =>{
    let checksubproj = await Subproject.findOne({ name: req.body.name });
    if(checksubproj){
        return next(new ErrorHandler('Name already exist!', 400));
    }
    let asubproject = await Subproject.create(req.body);
    return res.status(200).json({ 
        message: 'Successfully added!' 
    });
})
// get Signle Subproject => /api/subproject/:id
exports.getSingleSubproject = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let ssubprojects = await Subproject.findById(id);
    if(!ssubprojects){
        return next(new ErrorHandler('Subproject not found', 404));
    }
    return res.status(200).json({
        ssubprojects
    })
})
// update Subproject by id => /api/subproject/:id
exports.updateSubproject = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    let upsubprojects = await Subproject.findByIdAndUpdate(id, req.body);
    if (!upsubprojects) {
      return next(new ErrorHandler('Subproject Details not found', 404));
    }
    return res.status(200).json({message: 'Updates successfully' });
})


// delete Subproject by id => /api/subproject/:id
exports.deleteSubproject = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let dsubprojects = await Subproject.findByIdAndRemove(id);
    if(!dsubprojects){
        return next(new ErrorHandler('Subproject Details not found', 404));
    }
    return res.status(200).json({message: 'Deleted successfully'});
})