import useAuthContext from './useAuthContext';
import useWorkoutsContext from './useWorkoutsContext';

const useLogout = () => {
  const {dispatch} = useAuthContext();
  const {dispatch: dispatchWorkouts} = useWorkoutsContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user');

    // dispatch logout action
    dispatch({ type: 'LOGOUT' });
    // clear all documents from the workouts collection when logout is called
    dispatchWorkouts({type: 'SET_WORKOUTS', payload: null});
  };

  return {logout};
};
export default useLogout;