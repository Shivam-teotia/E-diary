const express = require("express");
const {
  getNotes,
  createNote,
  getNotesById,
  updateNotes,
  deleteNote,
} = require("../controller/noteController");
const { protect } = require("../middleware/authmiddleware");
const router = express.Router();

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNote);
router
  .route("/:id")
  .get(protect, getNotesById)
  .put(protect, updateNotes)
  .delete(protect, deleteNote);

module.exports = router;
