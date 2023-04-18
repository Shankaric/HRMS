const Project = require('../../../model/modules/project/project')
const ErrorHandler = require('../../../utils/errorhandler');
const catchAsyncErrors = require('../../../middleware/catchAsyncError');
// get All Project Details => /api/projects
exports.getAllProject = catchAsyncErrors(async (req, res, next) => {
    let projects;
    try{
        projects = await Project.find()
    }catch(err){
        console.log(err.message);
    }
    if(!projects){
        return next(new ErrorHandler('Project details not found', 404));
    }
    return res.status(200).json({
        // count: Project.length,
        projects
    });
})
// Create new Project => /api/project/new
exports.addProject = catchAsyncErrors(async (req, res, next) =>{
    let checkproj = await Project.findOne({ name: req.body.name });
   if(checkproj){
       return next(new ErrorHandler('Name already exist!', 400));
   }
    let aproject = await Project.create(req.body);
    return res.status(200).json({
        message: 'Successfully added!'
    });
})
// get Signle Project => /api/project/:id
exports.getSingleProject = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let sprojects = await Project.findById(id);
    if(!sprojects){
        return next(new ErrorHandler('Project not found', 404));
    }
    return res.status(200).json({
        sprojects
    })
})
// update Project by id => /api/project/:id
exports.updateProject = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    let upprojects = await Project.findByIdAndUpdate(id, req.body);
    if (!upprojects) {
      return next(new ErrorHandler('Project Details not found', 404));
    }
    return res.status(200).json({message: 'Updates successfully' });
})
// delete Project by id => /api/project/:id
exports.deleteProject = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let dprojects = await Project.findByIdAndRemove(id);
    if(!dprojects){
        return next(new ErrorHandler('Project Details not found', 404));
    }
    return res.status(200).json({message: 'Deleted successfully'});
})