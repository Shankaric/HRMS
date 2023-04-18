const Priority = require('../../../model/modules/project/priority');
const ErrorHandler = require('../../../utils/errorhandler');
const catchAsyncErrors = require('../../../middleware/catchAsyncError');

//get All Priority =>/api/prioritys
exports.getAllPriority = catchAsyncErrors(async (req, res, next) => {
    let priorities;
    try {
        priorities = await Priority.find()
    } catch (err) {
        console.log(err.message);
    }
    if (!priorities) {
        return next(new ErrorHandler('Priority not found!', 404));
    }
    return res.status(200).json({
        priorities
    });
})

//create new Priority => /api/Priority/new
exports.addpriority = catchAsyncErrors(async (req, res, next) => {
    let checkmain = await Priority.findOne({ name: req.body.name });
    if(checkmain){
        return next(new ErrorHandler('Name already exist!', 400));
    }
    let apriority = await Priority.create(req.body);
    return res.status(200).json({
        message: 'Successfully added!'
    });
})

// get Single priority => /api/priority/:id
exports.getSinglePriority = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    let spriority = await Priority.findById(id);
    if (!spriority) {
        return next(new ErrorHandler('Priority not found', 404));
    }
    return res.status(200).json({
        spriority
    })
})

//update priority by id => /api/priority/:id
exports.updatePriority = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    let upriority = await Priority.findByIdAndUpdate(id, req.body);
    if (!upriority) {
        return next(new ErrorHandler('Priority not found', 404));
    }

    return res.status(200).json({ message: 'Updated successfully' });
})

//delete priority by id => /api/priority/:id
exports.deletePriority = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    let dpriority = await Priority.findByIdAndRemove(id);
    if (!dpriority) {
        return next(new ErrorHandler('Priority not found', 404));
    }

    return res.status(200).json({ message: 'Deleted successfully' });
})