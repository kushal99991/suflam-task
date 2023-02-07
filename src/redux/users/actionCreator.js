import actions from "./actions";

import { message } from "antd";
import { DataService } from "config/dataService/dataService";
import { API } from "config/api/index";

const { getUser, postUser } = actions;

const getUserData = (payload) => {
  return async (dispatch) => {
    try {
      const res = await DataService.get(API.user.userList, payload);
      if (!res.data.error) {
        dispatch(getUser(res));
        // window.location.reload();
        return res;
      } else {
        return res;
      }
      // console.log(" hello user", payload);
    } catch (err) {
      return err;
      //  dispatch(loginErr(err));
    }
  };
};

const postUserData = (payload) => {
  return async (dispatch) => {
    try {
      const res = await DataService.post(API.user.create, payload);
      if (!res.data.error) {
        dispatch(postUser(res));
        // window.location.reload();
        return res;
      } else {
        return res;
      }
      // console.log(" hello user", payload);
    } catch (err) {
      return err;
      //  dispatch(loginErr(err));
    }
  };
};

export { getUserData, postUserData };
