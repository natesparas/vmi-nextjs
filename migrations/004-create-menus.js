"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("menus", {
			menu_id: {
				type: Sequelize.UUID,
				primaryKey: true,
			},
			label: Sequelize.STRING,
			path: Sequelize.STRING,
			icon: Sequelize.STRING,
			parent_id: {
				type: Sequelize.UUID,
				references: { model: "menus", key: "menu_id" },
				onDelete: "CASCADE",
			},
			order: Sequelize.INTEGER,
			created_at: Sequelize.DATE,
			updated_at: Sequelize.DATE,
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable("menus");
	},
};
