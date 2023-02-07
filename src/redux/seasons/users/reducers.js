import actions from "./actions";

const { GET_SEASON, POST_SEASON, UPDATE_SEASON, DELETE_SEASON } = actions;

const initState = {
  loading: false,
  season: null,
};

const SeasonReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case GET_SEASON:
      // console.log(data?.data?.data?.docs);
      return {
        ...state,
        loading: true,
        season: data,
      };

    case UPDATE_SEASON:
      console.log(data?.data?.data?.docs);
      return {
        ...state,
        loading: true,
        season: data?.data?.data?.docs,
      };

    case POST_SEASON:
      return {
        ...state,
        season: data,
        loading: false,
      };
    default:
      return state;
  }
};
export default SeasonReducer;
