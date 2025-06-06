const db = require('../config/db');

exports.getPlans = () => db.all(`SELECT * FROM plans`);

exports.getTenantPlan = (tenantId) =>
  db.get(`SELECT plan FROM tenants WHERE id = ?`, [tenantId]);

exports.assignPlan = (tenantId, plan) =>
  db.run(`UPDATE tenants SET plan = ? WHERE id = ?`, [plan, tenantId]);

exports.getModulesForTenant = async (tenantId) => {
  const tenant = await db.get(`SELECT plan FROM tenants WHERE id = ?`, [tenantId]);

  const modulesByPlan = {
    free: ['messages'],
    pro: ['messages', 'meetings', 'mail'],
    enterprise: ['messages', 'meetings', 'mail', 'tasks']
  };

  return modulesByPlan[tenant.plan] || [];
};
