import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    author: String,
    content: String,
    image: String,
    creeatedAt: {
        type: Date,
        default: new Date(),
    },
});

const Post = mongoose.model("Post", postSchema);

export default Post;

