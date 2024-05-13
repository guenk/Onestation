const authReducer = (
  state = { isAuthenticated: false, token: null, user: null },
  action
) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: {
          ...state.user,
          user: action.payload.user,
        },
      };
    default:
      return state;
  }
};
export default authReducer;
