import { DataTypes, Model, QueryInterface } from "sequelize";
import { IUpload } from "../../interface/IUpload";
import Customers from '../models/Customers.models';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IUpload>>("measures", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      measureDatetime: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "measure_datetime",
      },
      measureType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "measure_type",
      },
      measure_uuid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      measure_value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      value_confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    });
  },
  
  
  
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable("measures");
  },
};
