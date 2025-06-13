const Blog = require("../Models/blog");

exports.addBlog = async (req, res) => {
  try {
    const { title, content, date } = req.body;
    console.log("hit");
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }
    if (!title || !content || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }
    let blog = new Blog({
      title,
      content,
      date,
      image: req.file.filename,
    });
    blog = await blog.save();
    if (!blog) {
      return res.status(400).json({ error: "not uploaded" });
    }
    return res.send(blog);
  } catch (error) {
    return res.status(500).json({ error: "Error adding blog:", error });
  }
};

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  if (!blogs) {
    return res.status(400).json({ error: "No blogs found" });
  }
  return res.send(blogs);
};

//login

//reset password

exports.blogDetail = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(400).json({ error: "invalid" });
  }
  res.send(blog);
};

exports.blogList = async (req, res) => {
  const blogs = await Blog.find();
  if (!blogs) {
    return res.status(400).json({ error: "List not found" });
  }
  return res.send(blogs);
};

exports.blogUpdate = async (req, res) => {
  try {
    const { title, content, date, existingImage } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }
    const imagePath = req.file.filename ? req.file.filename : existingImage;
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        date,
        image: imagePath,
      },
      { new: true }
    );
    if (!blog) {
      return res.status(400).json({ error: "Update Failed" });
    }
    return res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteBlog = async (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((item) => {
      if (!item) {
        return res.status(400).json({ error: "Blog not found" });
      } else {
        return res.status(200).json({ message: "Blog deleted" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
};
