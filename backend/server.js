/* eslint-disable no-global-assign */
// @ts-nocheck
require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const workoutsRoutes = require('./routes/workouts');
const usersRoutes = require('./routes/user');

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
app.use('/api/users', usersRoutes);

app.use(cors());


//! REST API deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  // server path join to public folder for deployment
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('*', (req, res) => {
    // public folder is used for static files after run build, change name and move out of client folder
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Server is running');
  });
}


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
