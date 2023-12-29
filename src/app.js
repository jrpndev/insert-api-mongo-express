import express from "express";
import cors from "cors";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import firebaseConfig from "../src/environment/firebase.config.js"
import { initializeApp } from 'firebase/app';

db.on("error", console.log.bind(console, 'Connection Error'));
db.once("open", () => {
  console.log('MONGODB Connected!');
});

const app = express();
app.use(express.json());

initializeApp(firebaseConfig);

app.use(cors({
  origin: '*',
  exposedHeaders: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));


routes(app);

export default app;
