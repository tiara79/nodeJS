const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");
const { uploadSingle , uploadMultiple } = require("../middlewares/upload");

router.post("/", uploadMultiple, postController.createPost);

module.exports = router;