"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bascet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: "userId",
      });
    }
  }
  Bascet.init(
    {
      userId: DataTypes.INTEGER,
      cloth: DataTypes.STRING,
      color: DataTypes.STRING,
      logo: DataTypes.TEXT,
      texture: DataTypes.TEXT,
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      image:DataTypes.TEXT
    },
    {
      sequelize,
      modelName: "Bascet",
    }
  );
  return Bascet;
};
