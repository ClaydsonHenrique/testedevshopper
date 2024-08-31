import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import db from "./index";

class Customers extends Model<
  InferAttributes<Customers>,
  InferCreationAttributes<Customers>
> {
  declare id: CreationOptional<number>;
  declare customerCode: string;
}

Customers.init(
  {
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
  },
  {
    sequelize: db,
    tableName: "customers",
    modelName: "customers",
    timestamps: false,
  }
);

export default Customers;
