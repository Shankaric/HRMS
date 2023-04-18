const Company = require('../../../model/modules/setup/company');
const ErrorHandler = require('../../../utils/errorhandler');
const catchAsyncErrors = require('../../../middleware/catchAsyncError');
//get All company =>/api/companys
exports.getAllCompany = catchAsyncErrors(async (req, res, next) => {
    let companies;
    try{
        companies = await Company.find()
    }catch(err){
        console.log(err.message);
    }
    if(!companies){
        return next(new ErrorHandler('company not found!', 404));
    }
    return res.status(200).json({
        companies
    });
})

//create new company => /api/company/new
exports.addCompany = catchAsyncErrors(async (req, res, next) =>{
    let checkloc = await Company.findOne({ code: req.body.code });

    if(checkloc){
        return next(new ErrorHandler('Code already exist!', 400));
    }
    let acompany = await Company.create(req.body);
    return res.status(200).json({ 
        message: 'Successfully added!' 
    });

})

// get Single company => /api/company/:id
exports.getSingleCompany = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let scompany = await Company.findById(id);
    if(!scompany){
        return next(new ErrorHandler('company not found', 404));
    }
    return res.status(200).json({
        scompany
    })
})
//update company by id => /api/company/:id
exports.updateCompany = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    let ucompany = await Company.findByIdAndUpdate(id, req.body);
    if (!ucompany) {
      return next(new ErrorHandler('company not found', 404));
    }
    
    return res.status(200).json({message: 'Updated successfully',ucompany });
})
//delete company by id => /api/company/:id
exports.deleteCompany = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let dcompany = await Company.findByIdAndRemove(id);
    if(!dcompany){
        return next(new ErrorHandler('company not found', 404));
    }
    
    return res.status(200).json({message: 'Deleted successfully'});
})