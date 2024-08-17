import express from "express";
import { webScraper } from "../controllers/data.controller.js";
const route = express.Router();

route.post("/web-scrape", webScraper);

export default route;