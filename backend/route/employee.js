const express = require('express');
const addemployeeRoute = express.Router();
// connect AddEmployee controller..

const { getAllAddEmployee,addEmployee,updateAddEmployee,getSingleAddEmployee,deleteAddEmployee } = require('../../backend/controller/modules/employee');
addemployeeRoute.route('/addemployees').get(getAllAddEmployee);
addemployeeRoute.route('/addemployee/new').post(addEmployee);
addemployeeRoute.route('/addemployee/:id').get(getSingleAddEmployee).put(updateAddEmployee).delete(deleteAddEmployee);


module.exports = addemployeeRoute;