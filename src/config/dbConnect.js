import mongoose from "mongoose";
import { environment } from "../environment/environment.js";

const { USER, PASSWORD, HOST, DATABASE, TYPE } = environment;

const connectionString = `mongodb+${TYPE}://${USER}:${PASSWORD}@${HOST}/${DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

export default db;
