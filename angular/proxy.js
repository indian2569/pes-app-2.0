const express = require('express');
const cors = require('cors');

const app = express();

// Allow requests from the Angular app's domain
app.use(cors({ origin: 'http://localhost:4200' }));

// Proxy all requests to the target API
app.use('/', (req, res) => {
  const targetUrl = 'http://localhost:8080' + req.originalUrl;
  req.pipe(request(targetUrl)).pipe(res);
});

// Start the proxy server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});