import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";
import { User } from "./User.model.js";


class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING(200),
    },
    content: {
      type: DataTypes.TEXT,
    }
  },
  {
    sequelize,
    modelName: "Post",
    paranoid: true
  },
);

Post.belongsTo(User)
User.hasMany(Post)

export default Post;
