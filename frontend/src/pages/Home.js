import {useEffect} from 'react';

// components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import useAuthContext from '../hooks/useAuthContext';
import useWorkoutsContext from '../hooks/useWorkoutsContext';

const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext();
  const {user} = useAuthContext();
  useEffect(() => {
    // fetch data from backend
    const fetchData = async () => {
      // add proxy settings "proxy": "http://localhost:4000" in package.json and get rid of "http://localhost:4000" before '/api/workouts'
      const response = await fetch('/api/workouts', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: data});
      }
    };
    if (user) {
      fetchData();
    }
  }, [dispatch, user]);

  return (
    <div className='home'>
      <div className='workouts'>
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
