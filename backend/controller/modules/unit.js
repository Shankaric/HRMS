const Unit = require('../../model/modules/unit');
const ErrorHandler = require('../../utils/errorhandler');
const catchAsyncErrors = require('../../middleware/catchAsyncError');

// get All unit => /api/units
exports.getAllUnit = catchAsyncErrors(async (req, res, next) => {
    let units;
    try{
        units = await Unit.find()
    }catch(err){
        console.log(err.message);
    }
    if(!units){
        return next(new ErrorHandler('Unit not found!', 404));
    }
    return res.status(200).json({
        units
    });
})
// Create new unit => /api/unit/new
exports.addUnit = catchAsyncErrors(async (req, res, next) =>{

   let checkloc = await Unit.findOne({ code: req.body.code });

   if(checkloc){
       return next(new ErrorHandler('Code already exist!', 400));
   }
   
   let aproduct = await Unit.create(req.body)

    return res.status(200).json({ 
        message: 'Successfully added!' 
    });
})
// get Single unit => /api/unit/:id
exports.getSingleUnit = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;

    let sunit = await Unit.findById(id);

    if(!sunit){
        return next(new ErrorHandler('Unit not found!', 404));
    }
    return res.status(200).json({
        sunit
    })
})
// update unit by id => /api/unit/:id
exports.updateUnit = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    let uunit = await Unit.findByIdAndUpdate(id, req.body);

    if (!uunit) {
      return next(new ErrorHandler('Unit not found!', 404));
    }
    return res.status(200).json({message: 'Updated successfully' });
})
// delete unit by id => /api/unit/:id
exports.deleteUnit = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let dunit = await Unit.findByIdAndRemove(id);

    if(!dunit){
        return next(new ErrorHandler('Unit not found!', 404));
    }
    return res.status(200).json({message: 'Deleted successfully'});
})