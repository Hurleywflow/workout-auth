require('dotenv').config();
const express = require('express');
const workoutsRoutes = require('./routes/workouts');

// Create a new express application instance
const app = express();


// Create a new middleware instance
app.use((req, res, next) => {
  console.log('Request URL:', req.url, req.path, req.method);
  next();
});

// Route and specific path 'api/workouts/<now is all workoutsRoutes>'
app.use('api/workouts', workoutsRoutes);

// Listen on port 4000
app.listen(process.env.PORT, () => {
  console.log('Server listening on port: ', process.env.PORT);
});
