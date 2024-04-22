import { LOGIN_SUCCESS, LOGOUT } from './authActions';  // Vérifie que le chemin est correct

const initialState = {
  token: null,
  isAuthenticated: false,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

export default authReducer;