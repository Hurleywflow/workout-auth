const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// Get all workouts
const getAllWorkouts = async (req, res) => {
  try {
    // Sort by date created in descending order
    const workouts = await Workout.find().sort({createdAt: -1});
    res.json(workouts);
  } catch (err) {
    res.json({message: err});
  }
};

// Get a single workout
const getWorkout = async (req, res) => {
  try {
    const {id} = req.params;
    // Check validity of id type
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({message: 'Invalid ID, So no such workout'});
    }
    const workout = await Workout.findById(id);
    // Check if workout exists
    if (!workout) {
      return res.status(404).json({message: 'Workout not found'});
    }
    res.status(200).json(workout);
  } catch (err) {
    res.json({message: err});
  }
};

// Create a new workout
const createWorkout = async (req, res) => {
  const {title, reps, load} = req.body;
  // Add doc to db
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
};

// Delete a single workout
const deleteWorkout = async (req, res) => {
  try {
    const {id} = req.params;
    // Check validity of id type
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({message: 'Invalid ID, So no such workout'});
    }
    const workout = await Workout.findByIdAndDelete(id);
    // Check if workout exists
    if (!workout) {
      return res.status(404).json({message: 'Workout not found'});
    }
    res.status(200).json(workout);
  } catch (err) {
    res.json({message: err});
  }
};

// Update a single workout
const updateWorkout = async (req, res) => {
  try {
    const {id} = req.params;
    // Check validity of id type
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({message: 'Invalid ID, So no such workout'});
    }
    const workout = await Workout.findByIdAndUpdate(id, req.body, {
      // This is for new res.body to replace the old one
      new: true
    });
    // Check if workout exists
    if (!workout) {
      return res.status(404).json({message: 'Workout not found'});
    }
    res.status(200).json(workout);
  } catch (err) {
    res.json({message: err});
  }
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
};
