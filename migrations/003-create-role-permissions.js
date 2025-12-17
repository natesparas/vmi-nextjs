"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("role_permissions", {
			role_permission_id: {
				type: Sequelize.UUID,
				primaryKey: true,
			},
			role_id: {
				type: Sequelize.UUID,
				references: { model: "roles", key: "role_id" },
				onDelete: "CASCADE",
				primaryKey: true,
			},
			permission_id: {
				type: Sequelize.UUID,
				references: { model: "permissions", key: "permission_id" },
				onDelete: "CASCADE",
				primaryKey: true,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable("role_permissions");
	},
};
