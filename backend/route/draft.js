const express = require('express');
const draftRoute = express.Router();

//authorized route
const { isAuthorized } = require('../middleware/routeauthorised');

// connect customer group controller
const { getAllDrafts, regAuth, getSingleDraft, updateDraft, deleteDraft } = require('../controller/modules/draft');

draftRoute.route('/drafts').get(getAllDrafts); 
draftRoute.route('/draft/new').post(regAuth); 
draftRoute.route('/draft/:id').get(getSingleDraft).put(updateDraft).delete(deleteDraft);

module.exports = draftRoute;