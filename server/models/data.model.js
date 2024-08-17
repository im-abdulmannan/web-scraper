import mongoose from "mongoose";

const scrapedDataSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    storyLine: String,
    ratings: String,
    tags: [String],
    image: String,
  },
  { timestamps: true }
);

const ScrapedData = mongoose.model("ScrapedData", scrapedDataSchema);

export default ScrapedData;
