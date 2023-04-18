const Area = require('../../../model/modules/role/role');
const ErrorHandler = require('../../../utils/errorhandler');
const catchAsyncErrors = require('../../../middleware/catchAsyncError');

//get All Area =>/api/areas
exports.getAllRole = catchAsyncErrors(async (req, res, next) => {
    let roles;
    try{
        roles = await Area.find()
    }catch(err){
        console.log(err.message);
    }
    if(!roles){
        return next(new ErrorHandler('Area not found!', 404));
    }
    return res.status(200).json({
        roles
    });
})

//create new area => /api/area/new
exports.addRole = catchAsyncErrors(async (req, res, next) =>{
    let checkloc = await Area.findOne({ name: req.body.name });

    if(checkloc){
        return next(new ErrorHandler('Code already exist!', 400));
    }
    let arole = await Area.create(req.body);
    return res.status(200).json({ 
        message: 'Successfully added!' 
    });

})

// get Single area => /api/area/:id
exports.getSingleRole = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let srole = await Area.findById(id);
    if(!srole){
        return next(new ErrorHandler('Area not found', 404));
    }
    return res.status(200).json({
        srole
    })
})
//update area by id => /api/area/:id
exports.updateRole = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    let urole = await Area.findByIdAndUpdate(id, req.body);
    if (!urole) {
      return next(new ErrorHandler('Area not found', 404));
    }
    
    return res.status(200).json({message: 'Updated successfully' });
})
//delete area by id => /api/area/:id
exports.deleteRole = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let drole = await Area.findByIdAndRemove(id);
    if(!drole){
        return next(new ErrorHandler('Area not found', 404));
    }
    
    return res.status(200).json({message: 'Deleted successfully'});
})