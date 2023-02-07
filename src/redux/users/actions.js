const actions = {
  //DEFINE RETURN DATA SET
  GET_USER: "GET_USER",
  POST_USER: "DEMO_SUCCESS",

  getUser: (data) => {
    return {
      type: actions.GET_USER,
      data,
    };
  },

  postUser: (data) => {
    return {
      type: actions.POST_USER,
      data,
    };
  },
};

export default actions;
