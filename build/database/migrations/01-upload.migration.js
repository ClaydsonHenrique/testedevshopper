"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable("uploads", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            image: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            customerCode: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                field: "customer_code",
            },
            measureDatetime: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                field: "measure_datetime",
            },
            measureType: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                field: "measure_type",
            },
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable("uploads");
    },
};
