import actions from "./actions";

const { GET_USER, POST_USER } = actions;

const initState = {
  loading: false,
  user: null,
};

const UserReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case GET_USER:
      console.log(data?.data?.data?.docs);
      return {
        ...state,
        loading: true,
        user: data?.data?.data?.docs,
      };

    case POST_USER:
      return {
        ...state,
        user: data,
        loading: false,
      };
    default:
      return state;
  }
};
export default UserReducer;
