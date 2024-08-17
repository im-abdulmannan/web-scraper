import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./db.js";
import route from "./routes/data.route.js";
import ErrorHandler from "./utils/ErrorHandler.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use("/api", route);

// Connect to MongoDB
connectDb();

app.use(ErrorHandler);
app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
