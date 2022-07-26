import express from 'express';
import mongoose from "mongoose";
import "dotenv/config";
import logger from "morgan";
import bodyParser from 'body-parser';
import mainRoutes from "./server/routes/main";
import cors from "cors";


const port = 3333;
const mongoURI = process.env.MONGO_CONNECT;

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use("/api/", mainRoutes);   

mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => console.log("Error connecting to MongoDB: " + err.message));

app.listen(process.env.PORT || port, () => {
    console.log("listening on port " + port);
});

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Mefo Music server",
    });
})

