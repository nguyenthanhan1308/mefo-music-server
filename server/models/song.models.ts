import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const songSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    src: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Song", songSchema);
