
const express = require('express');
const excelRoute = express.Router();
// connect Branch controller
const { getAllExcel,addExcel,updateExcel,getSingleExcel,deleteExcel } = require('../controller/modules/excel');

excelRoute.route('/excels').get(getAllExcel);
excelRoute.route('/excel/new').post(addExcel);
excelRoute.route('/excel/:id').get(getSingleExcel).put(updateExcel).delete(deleteExcel);

module.exports = excelRoute;