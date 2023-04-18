const express = require('express');
const ProjectsRoute = express.Router();

// connect Project controller..
const { getAllProject,addProject,updateProject,getSingleProject,deleteProject } = require('../controller/modules/project/project');
ProjectsRoute.route('/projects').get(getAllProject);
ProjectsRoute.route('/project/new').post(addProject);
ProjectsRoute.route('/project/:id').get(getSingleProject).put(updateProject).delete(deleteProject);

// connect Sub project controller..
const { getAllSubproject,addSubproject,updateSubproject,getSingleSubproject,deleteSubproject } = require('../controller/modules/project/subproject');
ProjectsRoute.route('/subprojects').get(getAllSubproject);
ProjectsRoute.route('/subproject/new').post(addSubproject);
ProjectsRoute.route('/subproject/:id').get(getSingleSubproject).put(updateSubproject).delete(deleteSubproject);

// connect Module controller..
const { getAllModule,addModule,updateModule,getSingleModule,deleteModule } = require('../controller/modules/project/module');
ProjectsRoute.route('/modules').get(getAllModule);
ProjectsRoute.route('/module/new').post(addModule);
ProjectsRoute.route('/module/:id').get(getSingleModule).put(updateModule).delete(deleteModule);

// connect subModule controller
const { getAllSubModule,addSubModule,updateSubModule,getSingleSubModule,deleteSubModule } = require('../controller/modules/project/submodule');
ProjectsRoute.route('/submodules').get(getAllSubModule);
ProjectsRoute.route('/submodule/new').post(addSubModule);
ProjectsRoute.route('/submodule/:id').get(getSingleSubModule).put(updateSubModule).delete(deleteSubModule);



const { getAllMain,addMain,updateMain,getSingleMainpage,deleteMain } = require('../controller/modules/project/mainpage');
ProjectsRoute.route('/mainpages').get(getAllMain);
ProjectsRoute.route('/mainpage/new').post(addMain);
ProjectsRoute.route('/mainpage/:id').get(getSingleMainpage).put(updateMain).delete(deleteMain);
module.exports = ProjectsRoute;

// connect Projectsubpagesone controller
const { getAllSubpageone,addSubpageone,updateSubpageone,getSingleSubpageone,deleteSubpageone} = require('../controller/modules/project/subpageone');
ProjectsRoute.route('/subpagesone').get(getAllSubpageone);
ProjectsRoute.route('/subpageone/new').post(addSubpageone);
ProjectsRoute.route('/subpageone/:id').get(getSingleSubpageone).put(updateSubpageone).delete(deleteSubpageone);

// connect Projectsubpagestwo controller
const { getAllSubpagetwo,addSubpagetwo,updateSubpagetwo,getSingleSubpagetwo,deleteSubpagetwo} = require('../controller/modules/project/subpagetwo');
ProjectsRoute.route('/subpagestwo').get(getAllSubpagetwo);
ProjectsRoute.route('/subpagetwo/new').post(addSubpagetwo);
ProjectsRoute.route('/subpagetwo/:id').get(getSingleSubpagetwo).put(updateSubpagetwo).delete(deleteSubpagetwo);

// connect Projectsubpagesthree controller
const { getAllSubpagethree,addSubpagethree,updateSubpagethree,getSingleSubpagethree,deleteSubpagethree} = require('../controller/modules/project/subpagethree');
ProjectsRoute.route('/subpagesthree').get(getAllSubpagethree);
ProjectsRoute.route('/subpagethree/new').post(addSubpagethree);
ProjectsRoute.route('/subpagethree/:id').get(getSingleSubpagethree).put(updateSubpagethree).delete(deleteSubpagethree);

// connect Projectsubpagesfour controller
const { getAllSubpagefour,addSubpagefour,updateSubpagefour,getSingleSubpagefour,deleteSubpagefour} = require('../controller/modules/project/subpagefour');
ProjectsRoute.route('/subpagesfour').get(getAllSubpagefour);
ProjectsRoute.route('/subpagefour/new').post(addSubpagefour);
ProjectsRoute.route('/subpagefour/:id').get(getSingleSubpagefour).put(updateSubpagefour).delete(deleteSubpagefour);

// connect Projectsubpagesfive controller
const { getAllSubpagefive,addSubpagefive,updateSubpagefive,getSingleSubpagefive,deleteSubpagefive} = require('../controller/modules/project/subpagefive');
ProjectsRoute.route('/subpagesfive').get(getAllSubpagefive);
ProjectsRoute.route('/subpagefive/new').post(addSubpagefive);
ProjectsRoute.route('/subpagefive/:id').get(getSingleSubpagefive).put(updateSubpagefive).delete(deleteSubpagefive);

// connect Priority controller
const { getAllPriority,addpriority,updatePriority,getSinglePriority,deletePriority} = require('../controller/modules/project/priority');
ProjectsRoute.route('/prorities').get(getAllPriority);
ProjectsRoute.route('/priority/new').post(addpriority);
ProjectsRoute.route('/priority/:id').get(getSinglePriority).put(updatePriority).delete(deletePriority);


// connect projectEstimation controller
const { getAllProjectEstimation,addProjectEstimation,updateProjectEstimation,getSingleProjectEstimation,deleteProjectEstimation } = require('../controller/modules/project/projectestimation');

ProjectsRoute.route('/projectestimations').get(getAllProjectEstimation);
ProjectsRoute.route('/projectestimation/new').post(addProjectEstimation);
ProjectsRoute.route('/projectestimation/:id').get(getSingleProjectEstimation).put(updateProjectEstimation).delete(deleteProjectEstimation);

// connect projectEstimation controller
const { getAllProjectAllocation,addProjectAllocation,updateProjectAllocation,getSingleProjectAllocation,deleteProjectAllocation } = require('../controller/modules/project/projectallocation');

ProjectsRoute.route('/projectallocations').get(getAllProjectAllocation);
ProjectsRoute.route('/projectallocation/new').post(addProjectAllocation);
ProjectsRoute.route('/projectallocation/:id').get(getSingleProjectAllocation).put(updateProjectAllocation).delete(deleteProjectAllocation);

// connect ProjectDetails controller
const { getAllProjectDetails,addProjectDetails,updateProjectDetails,getSingleProjectDetails,deleteProjectDetails } = require('../controller/modules/project/projectdetails');

ProjectsRoute.route('/projectdetails').get(getAllProjectDetails);
ProjectsRoute.route('/projectdetail/new').post(addProjectDetails);
ProjectsRoute.route('/projectdetail/:id').get(getSingleProjectDetails).put(updateProjectDetails).delete(deleteProjectDetails);


module.exports = ProjectsRoute;