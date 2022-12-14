const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Invoke a new Schema object
const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    reps: {
      type: Number,
      required: true
    },
    load: {type: Number, required: true},
    user_id: {
      type: String,
      required: true
    }
  },
  {timestamps: true}
);

// Export a model with a 'Workout' collection
module.exports = mongoose.model('Workout', workoutSchema);
