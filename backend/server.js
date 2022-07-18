// @ts-nocheck
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const workoutsRoutes = require('./routes/workouts');

// Create a new express application instance
const app = express();

// Create a new middleware instance
app.use(express.json());
app.use((req, res, next) => {
  console.log('Request URL:', req.path, req.method);
  next();
});

// Route and specific path 'api/workouts/<now is all workoutsRoutes>'
app.use('/api/workouts', workoutsRoutes);

// Connect to to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen fro request endpoint
    app.listen(process.env.PORT, () => {
      console.log('Connected to db and listening on port: ', process.env.PORT);
    });
  })
  .catch((err) => {
    console.log('Error connecting to database:', err);
  });