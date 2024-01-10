const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, this is your Node.js server displaying text in the browser!');
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
