import {useState} from 'react';
import useAuthContext from '../hooks/useAuthContext';
import useWorkoutsContext from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const {user} = useAuthContext();
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to add a workout');
      return;
    }
    // Destructuring object of the form values
    const workout = {title, load, reps};
    // send Post request
    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      }
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
      setEmptyFields(data.emptyFields);
    }
    if (response.ok) {
      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
      setEmptyFields([]);
      dispatch({type: 'ADD_WORKOUT', payload: data});
      console.log('New workout added successfully', data);
    }
  };

  return (
    <form action='' className='create' onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>
      <label htmlFor='title'>Title:</label>
      <input
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        name='title'
        className={emptyFields.includes('title') ? 'error' : ''}
      />
      <label htmlFor='load'>Load (kg):</label>
      <input
        type='text'
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        name='load'
        className={emptyFields.includes('load') ? 'error' : ''}
      />
      <label htmlFor='reps'>Reps:</label>
      <input
        type='text'
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        name='reps'
        className={emptyFields.includes('reps') ? 'error' : ''}
      />
      <button>Add Workout</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default WorkoutForm;
