import express from "express";
import { getAllData, webScraper } from "../controllers/data.controller.js";
const route = express.Router();

route.post("/web-scrape", webScraper);
route.get("/scraped-data", getAllData);

export default route;
