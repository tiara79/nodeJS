// 실행 npx nodemon note.js

// express + sequelize CRUD 를 제공 하는 서버가 이 파일에 코딩

// 관련된 모듈 임포트 먼저
const express = require("express");
const models = require("./models");
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/notes", async (req, res) => {
  const { title, content, tag } = req.body;
  const note = await models.Note.create({
    title : title,
    content: content,
    tag : tag,
  });
  res.status(201).json({ message: "post ok", data: note });
});

app.get("/notes", async (req, res) => {
  const notes = await models.Note.findAll();
  res.status(200).json({ message: "get all, ok", data: notes });
});

app.get("/notes/:id",async (req, res) => {
  const id = req.params.id;
  const note = await models.Note.findByPk(id);
  if (note){
    res.status(200).json({message:"get one ,ok", data: note})
  }else {
    res.status(404).json({message:"get 할일을 찾을 수 없음"})
  }
});

// PUT  /notes/:id : id 로 노트 수정
app.put("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content, tag } = req.body;
  const note = await models.Note.findByPk(id);
  if (note) {
    if (title) note.title = title;
    if (content) note.content = content;
    if (tag) note.tag = tag;
    await note.save();
    res.status(200).json({ message: "put ok", data: note });
  } else {
    res.status(404).json({ message: "not found note" });
  }
});

app.delete("/notes/:id", async(req, res) => {
 const id = req.params.id;
 const result = await models.Note.destroy({
  where : {id: id},
 })
  if (result> 0){
    res.status(200).json({message:" delete ,ok"})
  }else {
    res.status(404).json({message:"not found note"})
  }
});

app.listen(PORT, () => {
  console.log(`Note 서버가 http://localhost:${PORT} 에서 실행중`);
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("db connected");
    })
    .catch(() => {
      console.log("db error");
      process.exit();
    });
});