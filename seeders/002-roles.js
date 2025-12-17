"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    const roles = [
      "admin",
      "doctor",
      "medtech",
      "receptionist",
      "supervisor"
    ];

    await queryInterface.bulkInsert(
      "roles",
      roles.map(name => ({
        role_id: uuidv4(),
        name,
        created_at: now,
        updated_at: now,
      }))
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
