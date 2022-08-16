import {createContext, useEffect, useMemo, useReducer} from 'react';
export const AuthContext = createContext();
export const authReducer = (state, action) => {
  // action is either type and payload
  switch (action.type) {
    // action type
    case 'LOGIN':
      return {user: action.payload};
    case 'LOGOUT':
      return {user: null};
    default:
      return state;
  }
};
export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, {user: null});
  // useMEmo hooks to render only when state changes
  const valueProvider = useMemo(
    () => ({...state, dispatch}),
    [state, dispatch]
  );
  // check if we have user add local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      dispatch({type: 'LOGIN', payload: user});
    }
  }, []);

  return (
    <AuthContext.Provider value={valueProvider}>
      {/* children is App components we wrap in */}
      {children}
    </AuthContext.Provider>
  );
};
