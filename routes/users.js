import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const userRouter = express.Router();

// userRouter.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// userRouter.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// userRouter.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

//UPDATE
userRouter.put("/:id", updateUser);

//DELETE
userRouter.delete("/:id", deleteUser);

//GET
userRouter.get("/:id", getUser);

//GET ALL
userRouter.get("/", getUsers);

export default userRouter;
