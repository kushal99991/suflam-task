const actions = {
  //DEFINE RETURN DATA SET
  GET_SEASON: "GET_SEASON",
  POST_SEASON: "POST_SEASON",
  UPDATE_SEASON: "UPDATE_SEASON",
  DELETE_SEASON: "DELETE_SEASON",

  getSeason: (data) => {
    return {
      type: actions.GET_SEASON,
      data,
    };
  },

  postSeason: (data) => {
    return {
      type: actions.POST_SEASON,
      data,
    };
  },

  deleteSeason: (data) => {
    return {
      type: actions.DELETE_SEASON,
      data,
    };
  },

  updateSeason: (data) => {
    return {
      type: actions.UPDATE_SEASON,
      data,
    };
  },
};

export default actions;
