const express = require('express');
const roleRoute = express.Router();
// connect AddEmployee controller..

const { getAllRole,addRole,updateRole,getSingleRole,deleteRole } = require('../../backend/controller/modules/role/role');
roleRoute.route('/roles').get(getAllRole);
roleRoute.route('/role/new').post(addRole);
roleRoute.route('/role/:id').get(getSingleRole).put(updateRole).delete(deleteRole);


module.exports = roleRoute;