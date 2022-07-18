const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Invote a new Schema object
const workoutSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  load: {
    type: Number,
    required: true
  }
}, {timestamps: true});

// Export a model with a 'Workout' collection
module.exports = mongoose.model('Workout', workoutSchema);