const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

exports.createTenant = (tenant) => {
  const id = uuidv4();
  const query = `INSERT INTO tenants (id, name, domain, planId) VALUES (?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.run(query, [id, tenant.name, tenant.domain, tenant.planId], function (err) {
      if (err) reject(err);
      else resolve({ id, ...tenant });
    });
  });
};
