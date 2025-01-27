const Blog = require('../models/blog');

// Create a new blog
const createBlog = async (req, res) => {
    const { title, description, category, image, author } = req.body;
    console.log('Received data for creating blog:', { title, description, category, image, author });
    if (!title || !description || !category || !image || !author) {
        console.error('Error: Missing required fields');
        return res.status(400).json({ message: 'All fields are required' });
    }try {
        const newBlog = new Blog({
            title,
            description,
            category,
            image,
            author,});
    console.log('Saving new blog to database:', newBlog);
    await newBlog.save();
    console.log('Blog created successfully:', newBlog);
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (err) {
        console.error('Error creating blog:', err.message);
        res.status(500).json({ message: 'Failed to create the blog', error: err.message });
    }
};

// Get all blogs
const getBlogs = async (req, res) => {
    console.log('Fetching all blogs');

    try {
        const blogs = await Blog.find();
        console.log('Retrieved blogs:', blogs);

        res.status(200).json(blogs);
    } catch (err) {
        console.error('Error retrieving blogs:', err.message);
        res.status(500).json({ message: 'Failed to retrieve blogs', error: err.message });
    }
};

//upadte blogs
const updateBlogs = async (req,res) =>{
    // console.log('update blog')
    // console.log('Request Body:', req.body);

    //  try {
    //    const updatedBlogs = await Blogs.findByIdAndUpdate(req.params.id, req.body, { new: true });
    //    console.log(updatedBlogs,"blogsss")
    //    if (updatedBlogs) 
    //    res.status(200).json({ message: "Blogs updated successfully", Blogs: updatedBlogs });
    //  } catch (error) {
    //     console.log('error updating blogs')
    //     console.log('Request Params:', req.params)
    //     console.log('Request Body:', req.body)
    //     console.log('Response Body',res.body)

    //    res.status(400).json({ message: "Error updating Blogs", error });
    //  }

    const { id } = req.params;
    const { title, description, category, image, author } = req.body;
  
    try {
      if (!id || !title || !description || !category || !image || !author) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
  
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { title, description, category, image, author },
        { new: true }
      );
  
      if (!updatedBlog) {
        return res.status(404).json({ message: 'Blog not found.' });
      }
  
      res.status(200).json({ message: 'Blog updated successfully.', blog: updatedBlog });
     
    } catch (error) {
      console.error('Error updating blog:', error);
      res.status(500).json({ message: 'Error updating blog.', error: error.message });
    }
}
// delete Blog
const deleteBlogs = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


module.exports = {createBlog, getBlogs,updateBlogs, deleteBlogs};
