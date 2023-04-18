const express = require('express');
const companyRoute = express.Router();
// connect company controller..
const { getAllCompany,addCompany,updateCompany,getSingleCompany,deleteCompany } = require('../../backend/controller/modules/setup/company');
companyRoute.route('/companies').get(getAllCompany);
companyRoute.route('/company/new').post(addCompany);
companyRoute.route('/company/:id').get(getSingleCompany).put(updateCompany).delete(deleteCompany);

module.exports = companyRoute;