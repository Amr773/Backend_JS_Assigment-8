import express from "express";
import authRouter from "./Modules/Auth/auth.controller.js";
import { testDBconnection } from "./DB/connection.js";
import { syncDB } from "./DB/connection.js";
import userRouter from "./Modules/User/user.controller.js";
import postRouter from "./Modules/Post/post.controller.js";
import commentRouter from "./Modules/Comment/comment.controller.js";

async function bootstrap() {
  const app = express();
  const port = 3000;

  await testDBconnection();
  await syncDB();

  app.use(express.json());
  app.use("/auth", authRouter);
  app.use("/users", userRouter);
  app.use("/posts", postRouter);
  app.use("/comments", commentRouter);
  app.use((error, req, res, next) => {
    return res
      .status(error.cause?.statusCode ?? 500)
      .json({ errMsg: error, errStack: error.stack });
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}

export default bootstrap;
