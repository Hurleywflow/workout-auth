// Set up express router
const express = require('express');
const Workout = require('../models/workoutModel');
const router = express.Router();

// Get all workout
router.get('/', (req, res) => {
  res.json({message: 'GET all Workouts route'});
});

// Get a single workout
router.get('/:id', (req, res) => {
  res.json({message: 'GET a single Workout route'});
});

// Post a new single workout
router.post('/', async (req, res) => {
  const {title, reps, load} = req.body;
  // Create a new workout
  try {
    const workout = await Workout.create({
      title,
      reps,
      load
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

// Delete a single workout
router.delete('/:id', (req, res) => {
  res.json({message: 'DELETE a single Workout route'});
});

// Update a single workout
router.patch('/:id', (req, res) => {
  res.json({message: 'UPDATE a single Workout route'});
});

module.exports = router;
