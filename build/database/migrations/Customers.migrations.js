"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable("customers", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            customerCode: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                field: "customer_code",
            },
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable("customers");
    },
};
