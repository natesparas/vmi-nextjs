"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    const roles = await queryInterface.sequelize.query(
      `SELECT id, name FROM roles`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const permissions = await queryInterface.sequelize.query(
      `SELECT id, key FROM permissions`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const roleMap = Object.fromEntries(roles.map(r => [r.name, r.id]));
    const permMap = Object.fromEntries(permissions.map(p => [p.key, p.id]));

    const mappings = [];

    // ADMIN → ALL permissions
    permissions.forEach(p => {
      mappings.push({
        id: uuidv4(),
        role_id: roleMap.admin,
        permission_id: p.id,
        created_at: now,
        updated_at: now,
      });
    });

    // DOCTOR
    ["patient.view", "patient.edit", "conulation.view"].forEach(key => {
      mappings.push({
        id: uuidv4(),
        role_id: roleMap.doctor,
        permission_id: permMap[key],
        created_at: now,
        updated_at: now,
      });
    });

    // medtech
    ["lab_test.view", "lab_test.create", "lab_test.edit"].forEach(key => {
      mappings.push({
        id: uuidv4(),
        role_id: roleMap.nurse,
        permission_id: permMap[key],
        created_at: now,
        updated_at: now,
      });
    });

    // RECEPTIONIST
    ["dashboard.view", "store.view", "transaction.view", "lab_test.view"].forEach(key => {
      mappings.push({
        id: uuidv4(),
        role_id: roleMap.receptionist,
        permission_id: permMap[key],
        created_at: now,
        updated_at: now,
      });
    });

    await queryInterface.bulkInsert("role_permissions", mappings);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("role_permissions", null, {});
  },
};
