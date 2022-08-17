const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// Get all workouts
const getAllWorkouts = async (req, res) => {
  try {
    // find only document match with user_id
    const user_id = req.user._id;
    // Sort by date created in descending order
    const workouts = await Workout.find({user_id}).sort({createdAt: -1});
    res.status(200).json(workouts);
  } catch (err) {
    res.json({error: err});
  }
};

// Get a single workout
const getWorkout = async (req, res) => {
  try {
    const {id} = req.params;
    // Check validity of id type
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({error: 'Invalid ID, So no such workout'});
    }
    const workout = await Workout.findById(id);
    // Check if workout exists
    if (!workout) {
      return res.status(404).json({error: 'Workout not found'});
    }
    res.status(200).json(workout);
  } catch (err) {
    res.json({error: err});
  }
};

// Create a new workout
const createWorkout = async (req, res) => {
  const {title, reps, load} = req.body;
  // Check validity of title, reps, and load
  let emptyFields = [];
  if (!title) {
    emptyFields.push('title');
  }
  if (!load) {
    emptyFields.push('load');
  }
  if (!reps) {
    emptyFields.push('reps');
  }
  if (emptyFields.length > 0) {
    return (
      res
        .status(400)
        // now error and emptyFields are res properties
        .json({error: 'Please fill in all fields', emptyFields})
    );
  }

  // Add document data to db
  try {
    // get _id properties from req.user form middleware
    const user_id = req.user._id;

    const workout = await Workout.create({
      title,
      reps,
      load,
      user_id
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

// Delete a single workout
const deleteWorkout = async (req, res) => {
  try {
    const {id} = req.params;
    // Check validity of id type
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({error: 'Invalid ID, So no such workout'});
    }
    const workout = await Workout.findOneAndDelete({_id: id});
    // Check if workout exists
    if (!workout) {
      return res.status(404).json({error: 'Workout not found'});
    }
    res.status(200).json(workout);
  } catch (err) {
    res.json({error: err});
  }
};

// Update a single workout
const updateWorkout = async (req, res) => {
  try {
    const {id} = req.params;
    // Check validity of id type
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({error: 'Invalid ID, So no such workout'});
    }
    const workout = await Workout.findOneAndUpdate(
      {_id: id},
      {
        // Each workout object has a title, reps, and load
        ...req.body
      }
    );
    // Check if workout exists
    if (!workout) {
      return res.status(404).json({error: 'Workout not found'});
    }
    res.status(200).json(workout);
  } catch (err) {
    res.json({error: err});
  }
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
};
