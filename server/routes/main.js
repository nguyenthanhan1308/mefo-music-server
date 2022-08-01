import express from "express";
import { createSong, getAllSongs } from "../controllers/song.controllers.js";
import { deleteSongByID } from './../controllers/song.controllers.js';

const router = express.Router();
// songs routes
router.post("/songs", createSong);
router.get("/songs", getAllSongs);
router.delete("/songs", deleteSongByID);
// books routes
// stream routes
export default router;
