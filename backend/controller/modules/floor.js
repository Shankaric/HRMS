const Floor = require('../../model/modules/floor');
const ErrorHandler = require('../../utils/errorhandler');
const catchAsyncErrors = require('../../middleware/catchAsyncError');
//get All Floor =>/api/floors
exports.getAllFloor = catchAsyncErrors(async (req, res, next) => {
    let floors;
    try{
       floors = await Floor.find()
    }catch(err){
        console.log(err.message);
    }
    if(!floors){
        return next(new ErrorHandler('Floor not found!', 404));
    }
    return res.status(200).json({
        floors
    });
})
//create new floor => /api/floor/new
exports.addFloor = catchAsyncErrors(async (req, res, next) =>{
    let checkloc = await Floor.findOne({ code: req.body.code });

   if(checkloc){
       return next(new ErrorHandler('Code already exist!', 400));
   }
    let afloor = await Floor.create(req.body);
    return res.status(200).json({ 
        message: 'Successfully added!' 
    });
})
// get Single floor => /api/floor/:id
exports.getSingleFloor = catchAsyncErrors(async (req, res, next)=>{
    
    const id = req.params.id;
    let sfloor = await Floor.findById(id);
    if(!sfloor){
        return next(new ErrorHandler('Floor not found', 404));
    }
    return res.status(200).json({
        sfloor
    })
})
//update floor by id => /api/floor/:id
exports.updateFloor = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    let ufloor = await Floor.findByIdAndUpdate(id, req.body);
    if (!ufloor) {
      return next(new ErrorHandler('Floor not found', 404));
    }
    
    return res.status(200).json({message: 'Updated successfully' });
})
//delete floor by id => /api/floor/:id
exports.deleteFloor = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let dfloor = await Floor.findByIdAndRemove(id);
    if(!dfloor){
        return next(new ErrorHandler('Floor not found', 404));
    }
    
    return res.status(200).json({message: 'Deleted successfully'});
})