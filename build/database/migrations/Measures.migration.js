"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable("measures", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            customerId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            image: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
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
            measure_uuid: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            measure_value: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            value_confirmed: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
            },
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable("measures");
    },
};
