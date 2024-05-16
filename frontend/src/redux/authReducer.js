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
          ...state.user,
          pseudo:
            action.payload.pseudo !== undefined
              ? action.payload.pseudo
              : state.user.pseudo,
          email:
            action.payload.email !== undefined
              ? action.payload.email
              : state.user.email,
          avatar:
            action.payload.avatar !== undefined
              ? action.payload.avatar
              : state.user.avatar,
        },
      };
    default:
      return state;
  }
};
export default authReducer;
