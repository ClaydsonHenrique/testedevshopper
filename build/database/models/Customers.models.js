"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
class Customers extends sequelize_1.Model {
}
Customers.init({
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
}, {
    sequelize: index_1.default,
    tableName: "customers",
    modelName: "customers",
    timestamps: false,
});
exports.default = Customers;
