const Location = require('../../model/modules/location')
const ErrorHandler = require('../../utils/errorhandler');
const catchAsyncErrors = require('../../middleware/catchAsyncError');


// get All Location Details => /api/locations

exports.getAllLocationDetails = catchAsyncErrors(async (req, res, next) => {
    let locationdetails;

    try{
        locationdetails = await Location.find()
    }catch(err){
        console.log(err.message);
    }

    if(!locationdetails){
        return next(new ErrorHandler('Location details not found', 404));
    }

    return res.status(200).json({
        // count: Location.length,
        locationdetails
    });
})

// Create new Location => /api/location/new
exports.addLocationDetails = catchAsyncErrors(async (req, res, next) =>{

    let checkloc = await Location.findOne({ code: req.body.code });

   if(checkloc){
       return next(new ErrorHandler('Code already exist!', 400));
   }

    let alocationdetails = await Location.create(req.body);

    return res.status(200).json({ 
        message: 'Successfully added!' 
    });
})

// get Signle Location => /api/location/:id

exports.getSingleLocationDetails = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;

    let slocationdetails = await Location.findById(id);

    if(!slocationdetails){
        return next(new ErrorHandler('Location not found', 404));
    }

    return res.status(200).json({
        slocationdetails
    })
})

// update Location by id => /api/location/:id

exports.updateLocationDetails = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    let uplocationdetails = await Location.findByIdAndUpdate(id, req.body);

    if (!uplocationdetails) {
      return next(new ErrorHandler('Location Details not found', 404));
    }
    
    return res.status(200).json({message: 'Updates successfully' });
})

// delete Location by id => /api/location/:id

exports.deleteLocationDetails = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let dlocationdetails = await Location.findByIdAndRemove(id);

    if(!dlocationdetails){
        return next(new ErrorHandler('Location Details not found', 404));
    }
    
    return res.status(200).json({message: 'Deleted successfully'});
})