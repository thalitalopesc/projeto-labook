import express from "express";
import { PostController } from "../controller/PostController";
import { PostBusiness } from "../Business/PostBusiness";
import { PostDataBase } from "../database/PostDataBase";
import { IdGenerator } from "../Services/IdGenerator";
import { LikesDislikesDataBase } from "../database/LikeDislikeDataBase";
import { TokenManager } from "../Services/TokenManager";

export const postRoute = express.Router();

const postController = new  PostController( new PostBusiness ( new PostDataBase, new IdGenerator, new LikesDislikesDataBase  , new TokenManager))
postRoute.get('/',postController.findAllPosts)
postRoute.post('/',postController.createPost)
postRoute.put('/:id', postController.updatePost)
postRoute.delete('/:id', postController.deletePost)