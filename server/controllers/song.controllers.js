import mongoose from "mongoose";
import Song from "../models/song.models.js";

// create new song
export function createSong (req, res) {
  const song = new Song({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    src: req.body.src,
  });
  
  return song
    .save()
    .then((newSong) => {
      return res.status(201).json({
        success: true,
        message: 'New song created successfully',
        songs: newSong,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });
}
// get all song from songs collection
export function getAllSongs (req, res) {
  Song.find()
  .select('_id title src')
  .then(allSong => {
    return res.status(200).json({
      success: true,
      message: "Get all song successfully",
      songs: allSong,
    });
  })
  .catch((error) => {
    return res.status(500).json({
        success: false,
        message: "server error, try again ",
        error: error.message,
    });
  });
}
// delete song by ID
export function deleteSongByID (req, res) {
  const deleteID = req.body._id;
  Song.deleteOne({ _id: deleteID }).then(() => {
      return res.status(200).json({
          success: true,
          message: `Song deleted successfully: ${deleteID}`,
      });
  })
  .catch(error => {
    return res.status(500).json({
      success: false,
      message: "server error, try again ",
      error: error.message,
    })
  })
}