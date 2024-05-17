export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const UPDATE_USER = "UPDATE_USER";

export const loginSuccess = (token, user) => ({
  type: LOGIN_SUCCESS,
  payload: { token, user },
});

export const logout = () => ({
  type: LOGOUT,
});

export const updateUser = (pseudo, email, avatar, id_role, label) => ({
  type: UPDATE_USER,
  payload: { pseudo, email, avatar, id_role, label },
});