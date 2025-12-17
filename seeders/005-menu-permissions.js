"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
	async up(queryInterface) {
		const now = new Date();

		// Get all menus and permissions
		const [menus, permissions] = await Promise.all([
			queryInterface.sequelize.query(`SELECT menu_id, label FROM menus`, {
				type: queryInterface.sequelize.QueryTypes.SELECT,
			}),
			queryInterface.sequelize.query(
				`SELECT permission_id, key FROM permissions`,
				{ type: queryInterface.sequelize.QueryTypes.SELECT }
			),
		]);

		const menuMap = Object.fromEntries(menus.map((m) => [m.label, m.menu_id]));
		const permMap = Object.fromEntries(
			permissions.map((p) => [p.key, p.permission_id])
		);

		const mappings = [
			// DASHBOARD
			{
				menu_id: "Dashboard",
				permission: "dashboard.view",
			},
			// STORE
			{
				menu_id: "Store",
				permission: "store.view",
			},
			// TRANSACTION
			{
				menu_id: "Transaction",
				permission: "transaction.view",
			},
			// PRODUCTS
			{
				menu_id: "Products",
				permission: "products.view",
			},
			// PATIENT
			{
				menu_id: "Patient Data",
				permission: "patient.view",
			},
			// CONSULTATION
			{
				menu_id: "Consultations",
				permission: "consultation.view",
			},
			// LABORATORY
			{
				menu_id: "Laboratory Test",
				permission: "lab_test.view",
			},
			{
				menu_id: "Hematology Create",
				permission: "lab_test.create",
			},
			// FILE MAINTENANCE
			{
				menu_id: "File Maintenance",
				permission: "file_maintenance.view",
			},
			{
				menu_id: "Category",
				permission: "file_maintenance.create",
			},
			{
				menu_id: "Users",
				permission: "file_maintenance.edit",
			},
		];

		// Transform mappings to use actual IDs
		const menuPermissions = mappings
			.map((mapping) => {
				const menuId = menuMap[mapping.menu_id];
				const permissionId = permMap[mapping.permission];

				if (!menuId || !permissionId) {
					console.warn(
						`Skipping invalid mapping: ${mapping.menu_id} -> ${mapping.permission}`
					);
					return null;
				}

				return {
					menu_permission_id: uuidv4(),
					menu_id: menuId,
					permission_id: permissionId,
					created_at: now,
					updated_at: now,
				};
			})
			.filter(Boolean); // Remove any null entries

		if (menuPermissions.length > 0) {
			await queryInterface.bulkInsert("menu_permissions", menuPermissions);
		} else {
			console.warn("No menu-permission mappings were created");
		}
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete("menu_permissions", null, {});
	},
};
