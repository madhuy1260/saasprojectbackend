const db = require('../config/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');


//createUser API

const createUser = async (user) => {
   const hashedPassword = await bcrypt.hash(user.password, 10);
  const userId = uuidv4();

  const query = `INSERT INTO users (id, tenantId, email,name, role,password, plan, status)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

                 console.log("user",user)

  return db.run(query, [
    userId,
    user.tenantId,
    user.email,
    user.name,
    user.role,
    hashedPassword,
    user.plan,
    user.status
  ]);
};

//getUserByEmail API

const getUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  return db.get(query, [email]);
};

//getUserById API


const getUserById = async (id) => {
  const query = `SELECT * FROM users WHERE id = ?`;
  return db.get(query, [id]);
};

const getUsersByTenant = (tenantId) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM users WHERE tenantId = ?`, [tenantId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

module.exports = { createUser, getUserByEmail, getUserById ,getUsersByTenant};
