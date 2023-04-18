const Skillset = require('../../model/modules/skillset');
const ErrorHandler = require('../../utils/errorhandler');
const catchAsyncErrors = require('../../middleware/catchAsyncError');

// get All Skillset => /api/Skillsets
exports.getAllSkillset = catchAsyncErrors(async (req, res, next) => {
    let skillsets;
    try{
        skillsets = await Skillset.find()
    }catch(err){
        console.log(err.message);
    }
    if(!skillsets){
        return next(new ErrorHandler('Skillset not found!', 404));
    }
    return res.status(200).json({
        skillsets
    });
})
// Create new Skillset => /api/Skillset/new
exports.addSkillset = catchAsyncErrors(async (req, res, next) =>{

   let checkloc = await Skillset.findOne({ name: req.body.name });

   if(checkloc){
       return next(new ErrorHandler('Name already exist!', 400));
   }
   
   let askillset = await Skillset.create(req.body)

    return res.status(200).json({ 
        message: 'Successfully added!' 
    });
})
// get Single Skillset => /api/Skillset/:id
exports.getSingleSkillset = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;

    let sskillset = await Skillset.findById(id);

    if(!sskillset){
        return next(new ErrorHandler('Skillset not found!', 404));
    }
    return res.status(200).json({
        sskillset
    })
})
// update Skillset by id => /api/Skillset/:id
exports.updateSkillset = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    let uskillset = await Skillset.findByIdAndUpdate(id, req.body);

    if (!uskillset) {
      return next(new ErrorHandler('Skillset not found!', 404));
    }
    return res.status(200).json({message: 'Updated successfully' });
})
// delete Skillset by id => /api/Skillset/:id
exports.deleteSkillset = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let dskillset = await Skillset.findByIdAndRemove(id);

    if(!dskillset){
        return next(new ErrorHandler('Skillset not found!', 404));
    }
    return res.status(200).json({message: 'Deleted successfully'});
})