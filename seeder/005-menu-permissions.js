"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    const menus = await queryInterface.sequelize.query(
      `SELECT id, label FROM menus`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const menuMap = Object.fromEntries(menus.map(m => [m.label, m.id]));

    const mappings = [
      // ======================
      // DASHBOARD
      // ======================
      {
        menu: "Dashboard",
        permission: "dashboard.view",
      },

      // ======================
      // STORE
      // ======================
      {
        menu: "Store",
        permission: "store.view",
      },

      // ======================
      // TRANSACTION
      // ======================
      {
        menu: "Transaction",
        permission: "transaction.view",
      },

      // ======================
      // PRODUCTS
      // ======================
      {
        menu: "Products",
        permission: "products.view",
      },

      // ======================
      // PATIENT
      // ======================
      {
        menu: "Patient Data",
        permission: "patient.view",
      },

      // ======================
      // CONSULTATION
      // ======================
      {
        menu: "Consultations",
        permission: "consultation.view",
      },

      // ======================
      // LABORATORY
      // ======================
      {
        menu: "Laboratory Test",
        permission: "lab_test.view",
      },
      {
        menu: "Hematology Create",
        permission: "lab_test.create",
      },

      // ======================
      // FILE MAINTENANCE
      // ======================
      {
        menu: "File Maintenance",
        permission: "file_maintenance.view",
      },
      {
        menu: "Category",
        permission: "file_maintenance.create",
      },
      {
        menu: "Users",
        permission: "file_maintenance.edit",
      },
    ];

    await queryInterface.bulkInsert(
      "menu_permissions",
      mappings.map(m => ({
        id: uuidv4(),
        menu_id: menuMap[m.menu],
        permission_key: m.permission,
        created_at: now,
        updated_at: now,
      }))
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("menu_permissions", null, {});
  },
};
