const express = require('express');
const hrmoduleRoute = express.Router();

// connect Department controller
const { getAllDepartmentDetails,addDepartmentDetails,updateDepartmentDetails,getSingleDepartmentDetails,deleteDepartmentDetails } = require('../controller/modules/department');

hrmoduleRoute.route('/departments').get(getAllDepartmentDetails);
hrmoduleRoute.route('/department/new').post(addDepartmentDetails);
hrmoduleRoute.route('/department/:id').get(getSingleDepartmentDetails).put(updateDepartmentDetails).delete(deleteDepartmentDetails);

// connect designationgroup controller
const { getAllDesiggroup,adddesiggroup,updatedesiggroup,getSingledesiggroup,deletedesiggroup } = require('../controller/modules/designationgroup');

hrmoduleRoute.route('/designationgroup').get(getAllDesiggroup);
hrmoduleRoute.route('/designationgroup/new').post(adddesiggroup);
hrmoduleRoute.route('/designationgroup/:id').get(getSingledesiggroup).put(updatedesiggroup).delete(deletedesiggroup);

// connect designation controller
const { getAllDesignation,adddesignation,updatedesignation,getSingledesignation,deletedesignation } = require('../controller/modules/designation');

hrmoduleRoute.route('/designation').get(getAllDesignation);
hrmoduleRoute.route('/designation/new').post(adddesignation);
hrmoduleRoute.route('/designation/:id').get(getSingledesignation).put(updatedesignation).delete(deletedesignation);


// connect Qualification controller
const { getAllQualificationDetails,addQualificationDetails,updateQualificationDetails,getSingleQualificationDetails,deleteQualificationDetails } = require('../controller/modules/qualification');

hrmoduleRoute.route('/qualifications').get(getAllQualificationDetails);
hrmoduleRoute.route('/qualification/new').post(addQualificationDetails);
hrmoduleRoute.route('/qualification/:id').get(getSingleQualificationDetails).put(updateQualificationDetails).delete(deleteQualificationDetails);

// connect Teams group controller
const { getAllTeamsDetails,addTeamsDetails,updateTeamsDetails,getSingleTeamsDetails,deleteTeamsDetails } = require('../controller/modules/teams');

hrmoduleRoute.route('/teams').get(getAllTeamsDetails);
hrmoduleRoute.route('/team/new').post(addTeamsDetails);
hrmoduleRoute.route('/team/:id').get(getSingleTeamsDetails).put(updateTeamsDetails).delete(deleteTeamsDetails);

// connect Qualification controller
const { getAllEducation,addEducation,updateEducation,getSingleEducation,deleteEducation} = require('../controller/modules/education');

hrmoduleRoute.route('/educations').get(getAllEducation);
hrmoduleRoute.route('/education/new').post(addEducation);
hrmoduleRoute.route('/education/:id').get(getSingleEducation).put(updateEducation).delete(deleteEducation);

// connect Qualification controller
const { getAllCertification,addCertification,updateCertification,getSingleCertification,deleteCertification } = require('../controller/modules/certification');

hrmoduleRoute.route('/certifications').get(getAllCertification);
hrmoduleRoute.route('/certification/new').post(addCertification);
hrmoduleRoute.route('/certification/:id').get(getSingleCertification).put(updateCertification).delete(deleteCertification);

// connect Qualification controller
const { getAllSkillset,addSkillset,updateSkillset,getSingleSkillset,deleteSkillset} = require('../controller/modules/skillset');

hrmoduleRoute.route('/skillsets').get(getAllSkillset);
hrmoduleRoute.route('/skillset/new').post(addSkillset);
hrmoduleRoute.route('/skillset/:id').get(getSingleSkillset).put(updateSkillset).delete(deleteSkillset);

// connect Shift controller..
const { getAllShift,addShift,updateShift,getSingleShift,deleteShift } = require('../controller/modules/Shift');
hrmoduleRoute.route('/shifts').get(getAllShift);
hrmoduleRoute.route('/shift/new').post(addShift);
hrmoduleRoute.route('/shift/:id').get(getSingleShift).put(updateShift).delete(deleteShift);


module.exports = hrmoduleRoute;