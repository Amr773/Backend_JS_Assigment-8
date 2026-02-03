import { col, fn, Op } from "sequelize";
import Comment from "../../DB/Models/Comments.model.js";
import { User } from "../../DB/Models/User.model.js";
import Post from "../../DB/Models/Posts.model.js";

export async function createComments(bodyData) {
  const { content, UserId, PostId } = bodyData;
  const newComments = Comment.bulkCreate(bodyData);
  const result = await newComments;

  return result;
}

export async function updateComment(commentId, bodyData) {
  const { content, UserId } = bodyData;
  const commentDetails = Comment.findByPk(commentId, {
    attributes: ["UserId"],
    raw: true,
  });

  const test = await commentDetails;
  console.log({ test });

  if (!test) {
    return "Comment not found";
  }

  const commentUserId = test.UserId;
  if (UserId !== commentUserId) {
    return "Your are not authorized to update this comment";
  }

  const updateComments = Comment.update(
    { content: content },
    {
      where: {
        id: commentId,
      },
    },
  );

  return test;
}

export async function findOrCreateComment(bodyData) {
  const { UserId, PostId, content } = bodyData;

  const findCreateComment = Comment.findOrCreate({
    where: {
      UserId: UserId,
      PostId: PostId,
      content: content,
    },
  });

  const result = await findCreateComment;

  return result;
}

export async function getAllCommentsWord(word) {
  const allCommentsCount = Comment.findAndCountAll(
    {
      where: {
        content: {
          [Op.substring]: word,
        },
      },
    },
    {
      attributes: [
        "id",
        "title",
        [fn("COUNT", col("Comments.id")), "commentsCount"],
      ],
    },
  );
  const result = await allCommentsCount;
  return result;
}

export async function getRecentComments(postId) {
  const recentComments = Comment.findAll({
    where: {
      PostId: postId,
    },
    limit: 3,
    order: [["createdAt", "DESC"]],
  });

  const result = await recentComments;
  return result;
}

export async function getSpecificComment(id) {
  const getComment = Comment.findByPk(id, {
    include: [
      {
        model: User,
      },
      {
        model: Post,
      },
    ],
  })
  const result = await getComment
  return result
  ;
}
