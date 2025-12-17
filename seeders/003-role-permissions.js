"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
	async up(queryInterface) {
		const now = new Date();

		// Get all roles and permissions
		const [roles, permissions] = await Promise.all([
			queryInterface.sequelize.query(`SELECT role_id, name FROM roles`, {
				type: queryInterface.sequelize.QueryTypes.SELECT,
			}),
			queryInterface.sequelize.query(
				`SELECT permission_id, key FROM permissions`,
				{
					type: queryInterface.sequelize.QueryTypes.SELECT,
				}
			),
		]);

		const roleMap = Object.fromEntries(roles.map((r) => [r.name, r.role_id]));
		const permMap = Object.fromEntries(
			permissions.map((p) => [p.key, p.permission_id])
		);

		const mappings = [];

		// Helper function to add role-permission mappings
		const addRolePermissions = (roleName, permissionKeys) => {
			permissionKeys.forEach((key) => {
				if (permMap[key] && roleMap[roleName]) {
					mappings.push({
						role_permission_id: uuidv4(),
						role_id: roleMap[roleName],
						permission_id: permMap[key],
						created_at: now,
						updated_at: now,
					});
				} else {
					console.warn(`Skipping invalid mapping: ${roleName} -> ${key}`);
				}
			});
		};

		// ADMIN - ALL permissions
		addRolePermissions("admin", Object.keys(permMap));

		// DOCTOR
		addRolePermissions("doctor", [
			"patient.view",
			"patient.edit",
			"consultation.view",
			"consultation.create",
			"consultation.edit",
		]);

		// MEDTECH
		addRolePermissions("medtech", [
			"lab_test.view",
			"lab_test.create",
			"lab_test.edit",
		]);

		// RECEPTIONIST
		addRolePermissions("receptionist", [
			"dashboard.view",
			"store.view",
			"transaction.view",
			"transaction.create",
			"lab_test.view",
		]);

		// SUPERVISOR
		addRolePermissions("supervisor", [
			"dashboard.view",
			"store.view",
			"transaction.view",
			"patient.view",
			"consultation.view",
		]);

		if (mappings.length > 0) {
			await queryInterface.bulkInsert("role_permissions", mappings);
		} else {
			console.warn("No role-permission mappings were created");
		}
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete("role_permissions", null, {});
	},
};
