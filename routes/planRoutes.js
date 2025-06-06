const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');

// Plans
router.get('/plans', planController.getAllPlans);
router.get('/plans/:tenantId', planController.getTenantPlan);
router.post('/plans/assign', planController.assignPlanToTenant);
router.get('/modules/:tenantId', planController.getTenantModules);

module.exports = router;
