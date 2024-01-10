const http = require('http');
const puppeteer = require('puppeteer-core');

async function searchGoogleAndLogTitle() {
  const browser = await puppeteer.launch({
    executablePath: '/path/to/chrome', // Specify the path to your Chrome executable
    headless: 'new', // or false if you want to run with a GUI
  });
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

  return title;
}

const server = http.createServer(async (req, res) => {
  try {
    const result = await searchGoogleAndLogTitle();
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Server is running successful: ${result}`);
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Internal Server Error: ${error}`);
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
