"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("permissions", {
			permission_id: {
				type: Sequelize.UUID,
				primaryKey: true,
			},
			key: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			description: Sequelize.STRING,
			created_at: Sequelize.DATE,
			updated_at: Sequelize.DATE,
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable("permissions");
	},
};
