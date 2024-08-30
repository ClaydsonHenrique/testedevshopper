import { DataTypes, Model, QueryInterface } from "sequelize";
import { IUpload } from "../../interface/IUpload";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IUpload>>("uploads", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      customerCode: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "customer_code",
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
      confirmed_value: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable("uploads");
  },
};
