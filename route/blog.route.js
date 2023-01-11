const {
  createBlog,
  getBlogs,
  findBlogById,
  deleteBlog,
  updateBlog,
} = require("../controller/blog.controller");
const { authentication } = require("../middleware/auth.middleware");

const router = require("express").Router();

router.use(authentication);

router.post("/create", createBlog);
router.get("/getAll", getBlogs);
router.get("/getById/:id", findBlogById);
router.delete("/delete/:id", deleteBlog);
router.put("/update/:id", updateBlog);

module.exports = router;
