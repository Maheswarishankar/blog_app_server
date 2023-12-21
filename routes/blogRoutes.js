const express = require("express");

const { createBlogs,
    getAllBlogs,
    updateBlog,
    getBlogById,
    deleteBlog,
    userBlog } = require("../controllers/blogcontroller");


const router = express.Router();

//POST || create blog

router.post("/create-blog", createBlogs);

//GET || getAll blogs

router.get('/getall-blog', getAllBlogs);

//PUT ||Update the Blogs

router.put("/update-blog/:id", updateBlog);

//GET || fetch the single blog

router.get("/single-blog/:id", getBlogById);

//Delete || delete the blog

router.delete("/delete-blog/:id", deleteBlog);

//GET user blog 

router.get("/user-blog/:id", userBlog)

module.exports = router;


