"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Customers_models_1 = __importDefault(require("./Customers.models"));
const index_1 = __importDefault(require("./index"));
class Measures extends sequelize_1.Model {
}
Measures.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    customerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Customers_models_1.default,
            key: "id",
        },
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
}, {
    sequelize: index_1.default,
    tableName: "measures",
    modelName: "measures",
    timestamps: false,
});
Customers_models_1.default.hasMany(Measures, { foreignKey: "customerId", as: "measures" });
Measures.belongsTo(Customers_models_1.default, { foreignKey: "customerId", as: "customer" });
exports.default = Measures;
