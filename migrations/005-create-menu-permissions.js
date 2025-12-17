"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("menu_permissions", {
			menu_permission_id: {
				type: Sequelize.UUID,
				primaryKey: true,
			},
			menu_id: {
				type: Sequelize.UUID,
				references: { model: "menus", key: "menu_id" },
				onDelete: "CASCADE",
			},
			permission_id: {
				type: Sequelize.UUID,
				references: { model: "permissions", key: "permission_id" },
				onDelete: "CASCADE",
			},
			created_at: Sequelize.DATE,
			updated_at: Sequelize.DATE,
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable("menu_permissions");
	},
};
