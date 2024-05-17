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
          role: {
            id_role:
              action.payload.id_role !== undefined
                ? action.payload.id_role
                : state.user.role.id_role,
            label:
              action.payload.label !== undefined
                ? action.payload.label
                : state.user.role.label,
          },
        },
      };
    default:
      return state;
  }
};
export default authReducer;
