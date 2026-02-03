import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";
import { User } from "./User.model.js";
import Post from "./Posts.model.js";

class Comment extends Model {}

Comment.init(
  {
    content: {
      type: DataTypes.TEXT,
    }
  },
  {
    sequelize,
    modelName: "Comment",
  },
);

Comment.belongsTo(User)
Comment.belongsTo(Post)
User.hasMany(Comment)
Post.hasMany(Comment)

export default Comment;
