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
  },
  {
    sequelize: db,
    tableName: "uploads",
    modelName: "uploadImage",
    timestamps: false,
  }
);

export default UploadImage;
