const planModel = require('../models/planModel');

exports.getAllPlans = async (req, res) => {
  const plans = await planModel.getPlans();
  res.json({ plans });
};

exports.getTenantPlan = async (req, res) => {
  const { tenantId } = req.params;
  const plan = await planModel.getTenantPlan(tenantId);
  res.json({ plan });
};

exports.assignPlanToTenant = async (req, res) => {
  const { tenantId, plan } = req.body;
  await planModel.assignPlan(tenantId, plan);
  res.json({ message: 'Plan assigned successfully' });
};

exports.getTenantModules = async (req, res) => {
  const { tenantId } = req.params;
  const modules = await planModel.getModulesForTenant(tenantId);
  res.json({ modules });
};
