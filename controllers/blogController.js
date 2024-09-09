import blogModel from "../models/blogModel.js"
import mongoose from "mongoose";
class BlogController {
    static getAllBlog = async (req, res) => {
        try {
            const fetchAllBlogs = await blogModel.find({user: req.user._id});
            return res.status(200).json(fetchAllBlogs);
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    };
    static addNewBlog = async (req, res) => {
        const {title, description, category} = req.body;
        try {
            if(title && category && description){
                const addBlog = new blogModel({
                    title: title,
                    description: description,
                    category: category,
                    thumbnail: req.file.filename,
                    user: req.user._id,
                    // user: user,
                });
                const savedBlog = await addBlog.save();
                if(savedBlog){
                    return res.status(201).json({message: "Added Blog Successfully"});
                }
            }else{
                return res.status(400).json({message: "All fields are required"});
            }
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    };
    static getSingleBlog = async (req, res) => {
        const { id } = req.params;
        try {
          if (id) {
            const blogId = new mongoose.Types.ObjectId(id); // Use 'new' to create a new ObjectId instance
            const fecthBlogByID = await blogModel.findById(blogId);
            return res.status(200).json(fecthBlogByID);
          } else {
            return res.status(400).json({ message: "Invalid URL" });
          }
        } catch (error) {
          return res.status(400).json({ message: error.message });
        }
      };
}

export default BlogController;