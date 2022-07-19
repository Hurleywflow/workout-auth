// Set up express router
const express = require('express');
const {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController');
const router = express.Router();

// Get all workout
router.get('/', getAllWorkouts);

// Get a single workout
router.get('/:id', getWorkout);

// Post a new single workout
router.post('/', createWorkout);

// Delete a single workout
router.delete('/:id', deleteWorkout);

// Update a single workout
router.patch('/:id', updateWorkout);

module.exports = router;
