import express from "express";
import PostControl from "../controllers/post";
import AvatarControl from "../controllers/avatar";
import upload from "../config/multer";
import auth from "../middlewares/auth";

const {
  getPosts,
  getSubPosts,
  savePost,
  createPost,
  getUserPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
} = PostControl;
const { multerErrHandler } = AvatarControl;

const router = express.Router();

router.post(
  "/posts",
  auth,
  upload.single("image"),
  createPost,
  multerErrHandler
);
router.get("/posts", getPosts);
router.get("/posts/sub", auth, getSubPosts);
router.get("/posts/me", auth, getUserPosts);
router.get("/posts/:id", auth, getPostById);
router.patch("/posts/:id", auth, updatePost);
router.patch("/posts/save/:id", auth, savePost);
router.delete("/posts/:id", auth, deletePost);

router.put("/like/:id", auth, likePost);
router.put("/unlike/:id", auth, unlikePost);
router.post("/comment/:id", auth, addComment);
router.delete(
  "/comment/:id/:comment_id",
  auth,
  deleteComment
);

export default router;
