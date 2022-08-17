import useWorkoutsContext from '../hooks/useWorkoutsContext';

// date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import useAuthContext from '../hooks/useAuthContext';

const WorkoutDetails = ({workout}) => {
  const {dispatch} = useWorkoutsContext();
  const {user} = useAuthContext();
  const handleDelete = async () => {
    if (!user) {
      return;
    }
    // send Delete request
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      }
    });
    const data = await response.json();
    if (!response.ok) {
      console.log('Error deleting workout', data);
    }
    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: data});
      console.log('Workout deleted successfully', data);
    }
  };
  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}
      </p>
      <span className='material-symbols-outlined' onClick={handleDelete}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
