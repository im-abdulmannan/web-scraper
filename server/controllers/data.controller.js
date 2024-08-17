import ScrapedData from "../models/data.model.js";
import scrape from "../puppeteer.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const webScraper = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return new ErrorHandler("Please provide a valid url", 400);
    }

    const data = await scrape(url);

    const scrapedData = new ScrapedData(data);
    await scrapedData.save();

    return res.status(200).json(data);
  } catch (error) {
    if (error.code === 11000) {
      const message = "Given Movie is already in your database";
      return new ErrorHandler(message, 400);
    }
  }
};
