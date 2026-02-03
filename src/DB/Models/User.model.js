import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

export const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      validate: {
        isEmail: {
          message: "Email must be in correct format user@example.com",
        },
      },
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isPassword(value) {
          if (value.length <= 6) {
            throw new Error("Password must be greater than 6 characters");
          }
        },
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.name.length <= 2) {
          throw new Error("Name must be greater than 2 characters");
        }
      },
    },
    paranoid: true,
  },
);
