"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
class UploadImage extends sequelize_1.Model {
}
UploadImage.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
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
}, {
    sequelize: index_1.default,
    tableName: "uploads",
    modelName: "uploadImage",
    timestamps: false,
});
exports.default = UploadImage;
