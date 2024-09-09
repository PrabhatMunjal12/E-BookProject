import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        refer: "categories",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        refer: "users",
    },
});

const BlogModel = mongoose.model("blogs", blogSchema);
export default BlogModel;