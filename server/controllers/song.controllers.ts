import mongoose, { Types } from "mongoose";
import Song from "../models/song.models.ts";

type Request = {
	body: Song;
};

type Song = {
	_id: Types.ObjectId;
	title: string;
	src: string;
};

type Response = {
	status: number;
};
// create new song
export async function createSong(
	req: Request,
	res: any
) {
	const song = new Song<Song>({
		_id: new mongoose.Types.ObjectId(),
		title: req.body.title,
		src: req.body.src,
	});

	try {
		const newSong = await song.save();
		return res.status(201).json({
			success: true,
			message:
				"New song created successfully",
			songs: newSong,
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(500).json({
				success: false,
				message:
					"Server error. Please try again.",
				error: error.message,
			});
		}
	}
}
// get all song from songs collection
export function getAllSongs(
	req: Request,
	res: any
) {
	Song.find()
		.select("_id title src")
		.then((allSong: any) => {
			return res.status(200).json({
				success: true,
				message:
					"Get all song successfully",
				songs: allSong,
			});
		})
		.catch((error: unknown) => {
			if (error instanceof Error) {
				return res.status(500).json({
					success: false,
					message:
						"server error, try again ",
					error: error.message,
				});
			}
		});
}
// delete song by ID
export function deleteSongByID(
	req: Request,
	res: any
) {
	const deleteID = req.body._id;
	Song.deleteOne({ _id: deleteID })
		.then(() => {
			return res.status(200).json({
				success: true,
				message: `Song deleted successfully: ${deleteID}`,
			});
		})
		.catch((error: unknown) => {
			if (error instanceof Error) {
				return res.status(500).json({
					success: false,
					message:
						"server error, try again ",
					error: error.message,
				});
			}
		});
}
