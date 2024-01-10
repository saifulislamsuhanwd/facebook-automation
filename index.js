const http = require('http');
const puppeteer = require('puppeteer');

async function searchGoogleAndLogTitle() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Set a reasonable User-Agent to mimic a real browser
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');

  await page.goto('https://www.google.com');
  
  // Type the search query and press Enter
  await page.type('input[name=q]', 'saiful islam suhan');
  await page.keyboard.press('Enter');

  // Wait for the search results page to load
  await page.waitForSelector('.rc');

  // Extract and log the title of the first search result
  const title = await page.$eval('.rc .r a h3', (element) => element.textContent);
  console.log('First search result title:', title);

  await browser.close();
}


const server = http.createServer((req, res) => {
  searchGoogleAndLogTitle();
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, this is your Node.js server displaying text in the browser!');
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
