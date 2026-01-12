import { Router } from "express";
import {
  addPost,
  getBlog,
  deletePost,
  updateBlog,
} from "../controllers/blog.controller.js";
import checkPoint from "../middlewares/usermiddleware.midddleware.js";

const router = Router();

// Create blog (protected)
router.post("/blogs", checkPoint, addPost);

// Get all published blogs (public)
router.get("/blogs", getBlog);

// Update blog (only author)
router.put("/blogs/:blogId", checkPoint, updateBlog);

// Delete blog (only author)
router.delete("/blogs/:blogId", checkPoint, deletePost);

export default router;
