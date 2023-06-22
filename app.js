const express = require('express')
const app = express()
const port = 3000
const client = require('prom-client');

// Collects default metrics
client.collectDefaultMetrics();

// Create a new counter metric with a label
const counter = new client.Counter({
  name: 'http_requests_total',
  help: 'Number of HTTP requests',
  labelNames: ['code'],
});

app.get('/', (req, res) => {
  // Choose a random status code for this request
  const statusCode = [200, 400, 500][Math.floor(Math.random() * 3)];

  // Increment the counter with a label
  counter.labels(String(statusCode)).inc();

  res.send('Hello World!')
})

// Endpoint to collect metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  try {
    res.end(await client.register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`)
})
