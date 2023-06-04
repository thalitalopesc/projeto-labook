import express from "express";
import { UserController } from "../controller/UserController";
import { UserBusiness } from "..//Business/UserBusiness";
import { UserDataBase } from "../database/UserDataBase";
import { IdGenerator } from "../Services/IdGenerator";
import { TokenManager } from "../Services/TokenManager";
import { HashManager } from "../Services//HashManager";
import { LikesDislikesDataBase } from "../database/LikeDislikeDataBase";

export const userRoute = express.Router();
const userController = new UserController(
  new UserBusiness(new UserDataBase(), new IdGenerator(), new TokenManager(), new HashManager(), new LikesDislikesDataBase)
);

userRoute.get("/",userController.getUsers);
userRoute.post("/signup", userController.signup);
userRoute.post("/login", userController.login);
