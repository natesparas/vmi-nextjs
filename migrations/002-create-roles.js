"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("roles", {
			role_id: {
				type: Sequelize.UUID,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING,
				unique: true,
			},
			created_at: Sequelize.DATE,
			updated_at: Sequelize.DATE,
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable("roles");
	},
};
