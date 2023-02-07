const actions = {
  //DEFINE RETURN DATA SET
  LOGIN_BEGIN: "LOGIN_BEGIN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERR: "LOGIN_ERR",
  GET_ADMIN: "GET_ADMIN",
  LOGOUT_BEGIN: "LOGOUT_BEGIN",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_ERR: "LOGOUT_ERR",

  loginBegin: () => {
    return {
      type: actions.LOGIN_BEGIN,
    };
  },

  loginSuccess: (data) => {
    return {
      type: actions.LOGIN_SUCCESS,
      data,
    };
  },

  loginErr: (err) => {
    return {
      type: actions.LOGIN_ERR,
      err,
    };
  },

  logoutBegin: () => {
    return {
      type: actions.LOGOUT_BEGIN,
    };
  },

  logoutSuccess: (data) => {
    return {
      type: actions.LOGOUT_SUCCESS,
      data,
    };
  },

  getAdmin: (data) => {
    return {
      type: actions.GET_ADMIN,
      data,
    };
  },

  logoutErr: (err) => {
    return {
      type: actions.LOGOUT_ERR,
      err,
    };
  },
};

export default actions;
