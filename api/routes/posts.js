import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  getPostByUserId,
  updatePost,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/user/:id", getPostByUserId)
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;
