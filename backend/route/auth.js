const express = require('express');
const authRoute = express.Router();

//authorized route
const { isAuthorized } = require('../middleware/routeauthorised');

// connect customer group controller
const { getAllUsers, regAuth, loginAuth, loginOut, forgotPassword, resetPassword, getSingleUser, updateUser, deleteUser,updateUserPwd } = require('../controller/login/auth');

authRoute.route('/users').get(getAllUsers); // this is for get all users
authRoute.route('/auth/new').post(regAuth); // this is for signup create
// authRoute.route('/password/forgot').post(forgotPassword);
// authRoute.route('/password/reset/:token').put(resetPassword);
authRoute.route('/auth/:id').get(getSingleUser).put(updateUser).delete(deleteUser);
authRoute.route('/userpw/:id').put(updateUserPwd);
authRoute.route('/authlog').post(loginAuth);
authRoute.route('/authout').get(loginOut);

module.exports = authRoute;
