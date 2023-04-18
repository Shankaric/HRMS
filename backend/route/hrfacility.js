const express = require('express');
const hrfacilityRoute = express.Router();

// connect Branch controller
const { getAllBranch,addBranch,updateBranch,getSingleBranch,deleteBranch } = require('../controller/modules/branch');

hrfacilityRoute.route('/branches').get(getAllBranch);
hrfacilityRoute.route('/branch/new').post(addBranch);
hrfacilityRoute.route('/branch/:id').get(getSingleBranch).put(updateBranch).delete(deleteBranch);

// connect "Unit" controller
const { getAllUnit,addUnit,updateUnit,getSingleUnit,deleteUnit } = require('../controller/modules/unit');

hrfacilityRoute.route('/units').get(getAllUnit);
hrfacilityRoute.route('/unit/new').post(addUnit);
hrfacilityRoute.route('/unit/:id').get(getSingleUnit).put(updateUnit).delete(deleteUnit);

// connect Area controller..
const { getAllArea,addArea,updateArea,getSingleArea,deleteArea } = require('../controller/modules/Area');
hrfacilityRoute.route('/areas').get(getAllArea);
hrfacilityRoute.route('/area/new').post(addArea);
hrfacilityRoute.route('/area/:id').get(getSingleArea).put(updateArea).delete(deleteArea);

// connect customer group controller
const { getAllLocationDetails,addLocationDetails,updateLocationDetails,getSingleLocationDetails,deleteLocationDetails } = require('../controller/modules/location');

hrfacilityRoute.route('/locations').get(getAllLocationDetails);
hrfacilityRoute.route('/location/new').post(addLocationDetails);
hrfacilityRoute.route('/location/:id').get(getSingleLocationDetails).put(updateLocationDetails).delete(deleteLocationDetails);

// connect Floor controller..

const { getAllFloor,addFloor,updateFloor,getSingleFloor,deleteFloor } = require('../controller/modules/floor');
hrfacilityRoute.route('/floors').get(getAllFloor);
hrfacilityRoute.route('/floor/new').post(addFloor);
hrfacilityRoute.route('/floor/:id').get(getSingleFloor).put(updateFloor).delete(deleteFloor);

module.exports = hrfacilityRoute;