import express from "express";
import { signup } from "./auth.service.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {

    const result = await signup(req.body)
    return res.status(201).json({message:"User added sucessfully", result})
});


export default authRouter;
