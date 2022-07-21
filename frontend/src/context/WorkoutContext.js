import {createContext, useMemo, useReducer} from 'react';

export const WorkoutContext = createContext();
export const workoutReducer = (state, action) => {
  // action is either type and payload
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload
      };
    case 'ADD_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts]
      };
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        )
      };
    default:
      return state;
  }
};
export const WorkoutContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(workoutReducer, {workouts: null});
  // useMEmo hooks to render only when state changes
  const valueProvider = useMemo(
    () => ({...state, dispatch}),
    [state, dispatch]
  );
  return (
    <WorkoutContext.Provider value={valueProvider}>
      {/* children is App components we wrap in */}
      {children}
    </WorkoutContext.Provider>
  );
};
