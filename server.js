const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // Import CORS
const healthRoutes = require('./routes/healthRoutes'); // Correct import for healthRoutes
const path = require('path');
require('dotenv').config({ path: './config.env' }); // Ensure .env file is loaded

// Connect to MongoDB
connectDB();

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// Set up API routes
app.use('/api', healthRoutes); // Use healthRoutes for the /api endpoint

// Basic route for home page
app.get('/home', (req, res) => {
  res.send('Home Page!');
});

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', function (_, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function (err) {
    res.status(500).send(err);
  });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
