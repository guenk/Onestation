import { LOGIN_SUCCESS, LOGOUT } from './authActions';  // Vérifie que le chemin est correct

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: true,
  user: null
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;