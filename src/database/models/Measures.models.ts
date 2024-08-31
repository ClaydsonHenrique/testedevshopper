import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import Customers from "./Customers.models";
import db from "./index";

class Measures extends Model<
  InferAttributes<Measures>,
  InferCreationAttributes<Measures>
> {
  declare id: CreationOptional<number>;
  declare image: string;
  declare measureDatetime: Date;
  declare measureType: string;
  declare value_confirmed: boolean;
  declare measure_uuid: string;
  declare measure_value: number;
  declare customerId: number;
}

Measures.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customers,
        key: "id",
      },
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
  },
  {
    sequelize: db,
    tableName: "measures",
    modelName: "measures",
    timestamps: false,
  }
);

Customers.hasMany(Measures, { foreignKey: "customerId" , as: "measures"});
Measures.belongsTo(Customers, { foreignKey: "customerId", as: "customer" });

export default Measures;
