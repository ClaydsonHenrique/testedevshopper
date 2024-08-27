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
        type: DataTypes.STRING,
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
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable("uploads");
  },
};
