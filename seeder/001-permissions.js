"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    const permissions = [
      { key: "dashboard.view", description: "View dashboard" },

      { key: "store.view", description: "View store" },
      { key: "store.create", description: "Create store" },
      { key: "store.edit", description: "Edit store" },

      { key: "transaction.view", description: "View transactions" },
      { key: "transaction.create", description: "Create transaction" },
      { key: "transaction.edit", description: "Edit transaction" },

      { key: "products.view", description: "View products" },
      { key: "products.create", description: "Create product" },
      { key: "products.edit", description: "Edit product" },

      { key: "patient.view", description: "View patients" },
      { key: "patient.create", description: "Create patient" },
      { key: "patient.edit", description: "Edit patient" },

      { key: "consultation.view", description: "View consultations" },
      { key: "consultation.create", description: "Create consultation" },
      { key: "consultation.edit", description: "Edit consultation" },

      { key: "lab_test.view", description: "View laboratory tests" },
      { key: "lab_test.create", description: "Create laboratory test" },
      { key: "lab_test.edit", description: "Edit laboratory test" },

      { key: "file_maintenance.view", description: "View file maintenances" },
      { key: "file_maintenance.create", description: "Create file maintenance" },
      { key: "file_maintenance.edit", description: "Edit file maintenance" },
    ];

    await queryInterface.bulkInsert(
      "permissions",
      permissions.map(p => ({
        id: uuidv4(),
        key: p.key,
        description: p.description,
        created_at: now,
        updated_at: now,
      }))
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
