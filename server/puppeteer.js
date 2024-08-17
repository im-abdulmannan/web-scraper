import puppeteer from "puppeteer";
import ErrorHandler from "./utils/ErrorHandler.js";

export default async function scrape(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const response = await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 60000,
  });

  if (response.status() === 404) {
    return new ErrorHandler("Page not found", 404);
  }

  const grabData = await page.evaluate(() => {
    const title = document.querySelector(".hero__primary-text");
    const ratings = document.querySelector(".sc-eb51e184-1.ljxVSS");
    const tags = document.querySelectorAll(
      ".ipc-chip-list__scroller > a > span"
    );
    const storyLine = document.querySelector(".sc-2d37a7c7-3.hhZJQw > span");

    const image = document.querySelector(".ipc-media--poster-27x40 > img");
    const imageUrl = image ? image.getAttribute("src") : null;

    const data = {
      title: title.textContent,
      storyLine: storyLine.textContent,
      ratings: ratings.textContent,
      tags: Array.from(tags).map((tag) => tag.innerHTML),
      image: imageUrl,
    };

    return data;
  });

  await browser.close();
  return grabData;
}
