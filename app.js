// import
import express from 'express';
import mongoose from "mongoose";
import "dotenv/config";
import logger from "morgan";
import router from "./server/routes/main.js";
import cors from "cors";
// main
const PORT = process.env.PORT || 5001;
const mongoURI = process.env.MONGO_CONNECT;

const app = express();
// CORS for 3rd party usage
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use("/api/", router);   

mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => console.log("Error connecting to MongoDB: " + err.message));

app.listen(PORT);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Mefo Music server",
    });
})

