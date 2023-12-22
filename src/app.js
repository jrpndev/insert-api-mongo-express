import express from "express";
import cors from "cors";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, 'Connection Error'));
db.once("open", () => {
  console.log('MONGODB Connected!');
});

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*',
  exposedHeaders: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

routes(app);

export default app;
