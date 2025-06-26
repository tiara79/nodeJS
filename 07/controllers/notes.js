// controllers/notes.js
// 모델에서 데이터를 조회하거나 수정, 추가, 삭제 전문 하는 함수만 포함
const models = require("../models")

exports.createNotes =  async (req, res) => {
  const { title, content, tag } = req.body;
  const note = await models.Note.create({
    title : title,
    content: content,
    tag : tag,
  });
  res.status(201).json({ message: "post ok", data: note });
}

exports.getAllNotes = async (req, res) => {
  const notes = await models.Note.findAll();
  res.status(200).json({ message: "get all, ok", data: notes });
}

exports.getNotes = async (req, res) => {
  const id = req.params.id;
  const note = await models.Note.findByPk(id);
  if (note){
    res.status(200).json({message:"get one ,ok", data: note})
  }else {
    res.status(404).json({message:"get 할일을 찾을 수 없음"})
  }
}

exports.updateNote = async (req, res) => {
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
}

exports.deleteNote = async(req, res) => {
 const id = req.params.id;
 const result = await models.Note.destroy({
  where : {id: id},
 })
  if (result> 0){
    res.status(200).json({message:" delete ,ok"})
  }else {
    res.status(404).json({message:"not found note"})
  }
}