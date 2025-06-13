const express = require("express");
const {
  addBlog,
  blogDetail,
  blogList,
  blogUpdate,
  deleteBlog,
} = require("../Controllers/blogController");
const upload = require("../middleware/upload");
const router = express.Router();

router.post("/addBlog", upload.single("image"), addBlog);

router.get("/blogdetail/:id", blogDetail);
router.get("/bloglist", blogList);
router.put("/blogupdate/:id", upload.single("image"), blogUpdate);
router.delete("/blogdelete/:id", deleteBlog);

module.exports = router;
