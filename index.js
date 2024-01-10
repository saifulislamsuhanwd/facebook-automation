const express = require('express');
const app = express();
const port = 3000;

// Define a simple GET endpoint
app.get('/api/greeting', (req, res) => {
  res.json({ message: 'Hello, this is your Express.js server!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
