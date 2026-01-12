import { populate } from "dotenv";
import { Blog } from "../models/blog.model.js";

const addPost = async (req, res) => {
  try {
    const { title, content, isPublished } = req.body;

    if (!title || !content || isPublished === undefined) {
      return res.status(400).json({
        message: "Title, content and isPublished are required",
        success: false,
      });
    }

    const newBlog = await Blog.create({
      title,
      content,
      isPublished,
      author: req.user.userId,
    });

    return res.status(201).json({
      message: "Post created successfully",
      data: newBlog,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to create post",
      error: error.message,
      success: false,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { blogId } = req.params;

    const findBlog = await Blog.findById(blogId);
    if (!findBlog) {
      return res.status(404).json({
        message: "Post does not exist",
        success: false,
      });
    }

    if (findBlog.author.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Not authorized to delete this post",
        success: false,
      });
    }
    await Blog.findByIdAndDelete(blogId);

    return res.status(200).json({
      message: "Post is successfully deleted",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to delete the Post ",
      error: error.message,
      success: false,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const findBlog = await Blog.findById(id);

    if (!findBlog) {
      return res.status(404).json({
        message: "Post is not found",
        success: false,
      });
    }
    if (findBlog.author.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Not authorized to update the post",
        success: false,
      });
    }

    const { title, content } = req.body;

    if (title !== undefined) findBlog.title = title;
    if (content !== undefined) findBlog.content = content;

    await findBlog.save();

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: findBlog,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to update post",
      success: false,
    });
  }
};

const getBlog = async (req, res) => {
  try {
    //populate brings the user data from the user table its like it joins user and blog
    const allBlogs = await Blog.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .populate("author", "username email");
    // .populate("author", "username email");  populate(Path,select the fields you want)

    return res.status(200).json({
      message: "Successfully fetch the blogs",
      success: true,
      data: allBlogs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch blogs",
      error: error.message,
      success: false,
    });
  }
};

export { addPost, getBlog, deletePost, updateBlog };
