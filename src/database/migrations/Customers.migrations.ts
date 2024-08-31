import { DataTypes, Model, QueryInterface } from "sequelize";
import { ICustomers } from "../../interface/IUpload";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ICustomers>>("customers", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      customerCode: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "customer_code",
      },
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable("customers");
  },
};
