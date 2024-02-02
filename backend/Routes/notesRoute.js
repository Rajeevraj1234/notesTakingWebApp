const express = require("express");
const router = express.Router();
const User = require("../Schema/userSchema");
const Notes = require("../Schema/notesSchema");
const { authMiddleware } = require("../Middleware/auth");

//Create
router.post("/createNote", authMiddleware, async (req, res) => {
  try {
    if (!req.body.title || !req.body.description || !req.body.visibility) {
      res.status(400).json({
        message: "Provide all detail",
      });
    }
    const note = await Notes.create({
      title: req.body.title,
      description: req.body.description,
      visibility: req.body.visibility,
    });
    await User.updateOne(
      { _id: req.userDetail.userId },
      {
        $push: {
          notesRef: note._id,
        },
      }
    );
    res.status(200).json({
      message: "Notes Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

//Update

router.put("/updateNote/:noteId", authMiddleware, async (req, res) => {
  try {
    const { noteId } = req.params;

    if (!req.body) {
      res.status(400).json({
        message: "No Inputs",
      });
    }
    await Notes.updateOne({ _id: noteId }, req.body);
    res.status(200).json({
      message: "Successfully Updated",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

//Delete
router.delete("/deleteNote/:noteId", authMiddleware, async (req, res) => {
  try {
    const { noteId } = req.params;
    await Notes.findByIdAndDelete(noteId);
    await User.findByIdAndUpdate(req.userDetail.userId, {
      $pull: {
        notesRef: noteId,
      },
    });
    res.status(200).json({
      message: "Successfully Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Get All Data
router.get("/allNotes", async (req, res) => {
  try {
    const allNotes = await Notes.find({ visibility: "public" });
    if (allNotes == {}) {
      res.status(404).json({
        message: "No Notes Available",
      });
    }
    res.status(200).json({
      allNotes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Get Single Note
router.get("/singleNote/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const singleNote = await Notes.find({ _id: id });
    res.status(200).json({
      singleNote,
    });
  } catch (error) {
    
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
