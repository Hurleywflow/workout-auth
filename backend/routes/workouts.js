// Set up express router
const express = require('express');
const router = express.Router();

// Get all workout
router.get('/', (req, res) => {
  res.json({message: 'GET all Workouts route'});
});



module.exports = router;
