const Excel = require('../../model/modules/excel');
const ErrorHandler = require('../../utils/errorhandler');
const catchAsyncErrors = require('../../middleware/catchAsyncError');

// get All excel => /api/excel
exports.getAllExcel = catchAsyncErrors(async (req, res, next) => {
    let excel;
    try{
        excel = await Excel.find()
    }catch(err){
        console.log(err.message);
    }
    if(!excel){
        return next(new ErrorHandler('excel not found!', 404));
    }
    return res.status(200).json({
        excel
    });
})
// Create new excel => /api/excel/new
exports.addExcel = catchAsyncErrors(async (req, res, next) =>{
   let aproduct = await Excel.create(req.body)

    return res.status(200).json({ 
        message: 'Successfully added!' 
    });
})
// get Single excel => /api/excel/:id
exports.getSingleExcel = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;

    let sexcel = await Excel.findById(id);

    if(!sexcel){
        return next(new ErrorHandler('Excel not found!', 404));
    }
    return res.status(200).json({
        sexcel
    })
})
// update excel by id => /api/excel/:id
exports.updateExcel = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    let uexcel = await Excel.findByIdAndUpdate(id, req.body);

    if (!uexcel) {
      return next(new ErrorHandler('Excel not found!', 404));
    }
    return res.status(200).json({message: 'Updated successfully' });
})
// delete excel by id => /api/excel/:id
exports.deleteExcel = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let dexcel = await Excel.findByIdAndRemove(id);

    if(!dexcel){
        return next(new ErrorHandler('Excel not found!', 404));
    }
    return res.status(200).json({message: 'Deleted successfully'});
})