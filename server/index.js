const axios = require('axios');
const cheerio = require('cheerio');

// Function to scrape data from a webpage
async function scrapeData(url) {
    try {
        // Fetch the HTML of the webpage
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36'
            }
        });

        // Load the HTML into cheerio
        const $ = cheerio.load(data);

        // Example: Extract the title of the webpage
        const pageTitle = $('title').text();
        console.log('Page Title:', pageTitle);

        // Extract other data as needed, e.g., headings
        $('h1, h2, h3').each((index, element) => {
            console.log($(element).text());
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// URL of the webpage to scrape
const url = 'https://www.imdb.com/title/tt6263850/?ref_=hm_fanfav_tt_i_1_pd_fp1_r';
scrapeData(url);
