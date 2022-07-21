import useWorkoutsContext from '../hooks/useWorkoutsContext';

const WorkoutDetails = ({workout}) => {
  const {dispatch} = useWorkoutsContext();
  const handleDelete = async () => {
    // send Delete request
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
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
      <p>{workout.createdAt}</p>
      <span onClick={handleDelete}>Delete</span>
    </div>
  );
};

export default WorkoutDetails;