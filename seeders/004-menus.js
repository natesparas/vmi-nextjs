"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    const dashboardId = uuidv4();
    const storeId = uuidv4();
    const transactionId = uuidv4();
    const productId = uuidv4();
    const labTestId = uuidv4();
    const maintenanceId = uuidv4();
    const consultationId = uuidv4();
    const patientsId = uuidv4();

    await queryInterface.bulkInsert("menus", [
      {
        menu_id: dashboardId,
        label: "Dashboard",
        path: "/dashboard",
        icon: `<Home className="h-4 w-4" />`,
        parent_id: null,
        order: 1,
        created_at: now,
        updated_at: now,
      },
      {
        menu_id: storeId,
        label: "Store",
        path: "/store",
        icon: `<Store className="h-4 w-4" />`,
        parent_id: null,
        order: 2,
        created_at: now,
        updated_at: now,
      },
      {
        menu_id: transactionId,
        label: "Transaction",
        path: "/transaction",
        icon: `<CreditCard className="h-4 w-4" />`,
        parent_id: null,
        order: 3,
        created_at: now,
        updated_at: now,
      },
      {
        menu_id: productId,
        label: "Products",
        path: "/product",
        icon: `<Box className="h-4 w-4" />`,
        parent_id: null,
        order: 4,
        created_at: now,
        updated_at: now,
      },
      {
        menu_id: patientsId,
        label: "Patient Data",
        path: "/patient",
        icon: `<Database className="h-4 w-4" />`,
        parent_id: null,
        order: 5,
        created_at: now,
        updated_at: now,
      },
      {
        menu_id: consultationId,
        label: "Consultations",
        path: "/consulation",
        icon: `<Stethoscope className="h-4 w-4" />`,
        parent_id: null,
        order: 6,
        created_at: now,
        updated_at: now,
      },
      {
        menu_id: labTestId,
        label: "Laboratory Test",
        path: null,
        icon: `<Stethoscope className="h-4 w-4" />`,
        parent_id: null,
        order: 7,
        created_at: now,
        updated_at: now,
      },
      {
        menu_id: uuidv4(),
        label: "Hematology Create",
        path: "/labtest",
        parent_id: labTestId,
        order: 1,
        created_at: now,
        updated_at: now,
      },
      {
        menu_id: maintenanceId,
        label: "File Maintenance",
        path: null,
        icon: `<Settings className="h-4 w-4" />`,
        parent_id: null,
        order: 8,
        created_at: now,
        updated_at: now,
      },
      {
        menu_id: uuidv4(),
        label: "Category",
        path: "/maintenance/category",
        parent_id: maintenanceId,
        order: 1,
        created_at: now,
        updated_at: now,
      },
      {
        menu_id: uuidv4(),
        label: "Users",
        path: "/maintenance/user",
        parent_id: maintenanceId,
        order: 2,
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("menus", null, {});
  },
};
