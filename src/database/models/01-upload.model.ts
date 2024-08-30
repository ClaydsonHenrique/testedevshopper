import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import db from "./index";

class UploadImage extends Model<
  InferAttributes<UploadImage>,
  InferCreationAttributes<UploadImage>
> {
  declare id: CreationOptional<number>;
  declare image: string;
  declare customerCode: string;
  declare measureDatetime: Date;
  declare measureType: string;
  declare value_confirmed: boolean;
  declare measure_uuid: string;
  declare measure_value: number;
}

UploadImage.init(
  {
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
    tableName: "uploads",
    modelName: "uploadImage",
    timestamps: false,
  }
);

export default UploadImage;
