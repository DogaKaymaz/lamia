import express from "express";
import { getPosts, createPost, getSinglePost, deletePost, updatePost} from "../controllers/posts.js";

const router = express.Router();

//http://localhost:5000/posts

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getSinglePost);
router.patch("/:id", updatePost);
// router.put("/", putPost);
router.delete("/:id",deletePost);

export default router;
