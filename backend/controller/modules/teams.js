const Teams = require('../../model/modules/teams')
const ErrorHandler = require('../../utils/errorhandler');
const catchAsyncErrors = require('../../middleware/catchAsyncError');


// get All Teams Details => /api/teams

exports.getAllTeamsDetails = catchAsyncErrors(async (req, res, next) => {
    let teamsdetails;

    try{
        teamsdetails = await Teams.find()
    }catch(err){
        console.log(err.message);
    }

    if(!teamsdetails){
        return next(new ErrorHandler('Teams details not found', 404));
    }

    return res.status(200).json({
        // count: teams.length,
        teamsdetails
    });
})

// Create new Teams => /api/team/new
exports.addTeamsDetails = catchAsyncErrors(async (req, res, next) =>{

    let ateamsdetails = await Teams.create(req.body);

    return res.status(200).json({ 
        message: 'Successfully added!' 
    });
})

// get Signle Teams => /api/team/:id

exports.getSingleTeamsDetails = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;

    let steamsdetails = await Teams.findById(id);

    if(!steamsdetails){
        return next(new ErrorHandler('Teams not found', 404));
    }

    return res.status(200).json({
        steamsdetails
    })
})

// update Teams by id => /api/Qualification/:id

exports.updateTeamsDetails = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    let upteamsdetails = await Teams.findByIdAndUpdate(id, req.body);

    if (!upteamsdetails) {
      return next(new ErrorHandler('Teams Details not found', 404));
    }
    
    return res.status(200).json({message: 'Updates successfully' });
})

// delete Teams by id => /api/Qualification/:id

exports.deleteTeamsDetails = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;
    let dteamsdetails = await Teams.findByIdAndRemove(id);

    if(!dteamsdetails){
        return next(new ErrorHandler('Teams Details not found', 404));
    }
    
    return res.status(200).json({message: 'Deleted successfully'});
})