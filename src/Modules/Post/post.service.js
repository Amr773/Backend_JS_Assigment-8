import { col, fn } from "sequelize";
import Comment from "../../DB/Models/Comments.model.js";
import Post from "../../DB/Models/Posts.model.js";
import { User } from "../../DB/Models/User.model.js";

export async function createPost(bodyData) {
  const { title, content, UserId } = bodyData;
  const newPost = Post.build({ title, content, UserId });
  const result = await newPost.save();
  return result;
}

export async function deletePost(postId, userId) {
  const postDetails = Post.findByPk(postId, {
    attributes: ["UserId"],
    raw: true,
  });
  const test = await postDetails;
  const postUserID = test.UserId;
  if (userId !== postUserID) {
    return "Your are not authorized to delete this post";
  }
  const removePost = Post.destroy({
    where: {
      id: postId,
    },
  });

  return removePost;
}

export async function getAllPosts() {
  const allPosts = Post.findAll({
    attributes: ["id", "title"],
    include: [
      {
        model: User,
        attributes: ["id", "name"],
      },
      {
        model: Comment,
        attributes: ["id", "content"],
      },
    ],
  });
  const result = await allPosts;

  return result;
}

export async function getAllPostsCount() {
  const allPostsCount = Post.findAll({
    attributes: [
      "id",
      "title",
      [fn("COUNT", col("Comments.id")), "commentsCount"],
    ],
    include: [
      {
        model: Comment,
        attributes: [],
      },
    ],
  });
  const result = await allPostsCount;
  return result;
}
