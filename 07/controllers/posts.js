// controllers/ posts.js

const models = require("../models");

const createPost = async (req, res) => {
  const { title, content } = req.body;
  let filename = req.file ? req.file.filename : null; // filename aa-123444.png
  filename = `/downloads/${filename}`;

  let user = await models.User.findOne({
    where: { email: "a@example.com" },
  });
  if (!user) {
    user = await models.User.create({
      name: "이지훈",
      email: "a@example.com",
      password: "12345678",
    });
  }
  let attachments = []
  if(req.file) {
    //single file
    attachments.push({
      filename: req.file.fileName,
      originalname : req.file.originalname,
      path : req.file.path,
      size : req.file.size,
      mimetype: req.file.mimetype,
    });
  }else if(req.files && req.files.length >0){
    // multiple file
      attachments = req.files.map((file)=> ({
        filename: file.fileName,
        originalname : file.originalname,
        path : file.path,
        size : file.size,
        mimetype: file.mimetype,
      }));
    }


  const post = await models.Post.create({
    title: title,
    content: content,
    authorId: user.id,
    // fileName: filename,
    attachments: attachments,
  });
  res.status(201).json({ message: "ok", data: post });
};

module.exports = {
  createPost,
};