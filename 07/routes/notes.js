// routes/notes.js
const express = require("express");
const router = express.Router();
const noteConteroller = require("../controllers/notes");

router.post("/notes", noteConteroller.createNotes);
router.get("/notes", noteConteroller.getAllNotes);
router.get("/notes/:tag", noteConteroller.getNotes);
router.put("/notes/:id", noteConteroller.updateNote);
router.delete("/notes/:id", noteConteroller.deleteNote);

module.exports = router;
