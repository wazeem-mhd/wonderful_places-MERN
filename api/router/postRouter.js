import express from "express";
import {
  createPost,
  getAllPost,
  // getPostUser,
  getSearchText,
  likePost,
  deletePost,
  userPosts,
  updatePost,
  getPostDetails,
  // getAllComment,
  createComment,
  getAllPostsOnly,
} from "../controller/postController.js";
import auth from "../middlewear/AuthMiddlewear.js";
import router from "./authRouter.js";

const route = express.Router();

route.get("/getposts", getAllPost);
route.post("/createpost", auth, createPost);
// route.post("/getpostuser/:creator", getPostUser);
route.get("/search", getSearchText);
route.patch("/:id/likepost", likePost);
route.get("/postdetails/:id", getPostDetails);
route.delete("/:id/deletepost", deletePost);
route.get("/userposts/:id", userPosts);
route.patch("/:id/updatepost", updatePost);
route.post("/:post_id/new_comment", auth, createComment);
route.get("/getallposts", getAllPostsOnly);
// route.get("/all_comments/:post_id", getAllComment);

export default route;
