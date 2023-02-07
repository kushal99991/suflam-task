import Cookies from "js-cookie";
import actions from "./actions";
import { message } from "antd";
import session from "utils/session";
import { DataService } from "config/dataService/dataService";
import { API } from "config/api/index";

const {
  loginBegin,
  loginSuccess,
  loginErr,
  logoutBegin,
  logoutSuccess,
  getAdmin,
} = actions;

//LOGIN API FUNCTION CALL
const login = (payloads) => {
  return async (dispatch) => {
    try {
      dispatch(loginBegin());
      const res = await DataService.post(API.auth.login, payloads);
      console.log(res, "creator response");
      if (!res.data.error) {
        console.log(res?.data?.data?.token, "creator response");
        // setItem("userDetails", res.data.data);
        // session.setUser(res.data.data);
        session.setToken(res?.data?.data?.token);
        if (session.token === "undefined") {
          session.clear();
        }
        // setItem("access_token", res.data.data.token);
        Cookies.set("logedIn", true);
        dispatch(loginSuccess(true));
        // window.location.reload();
        return res;
      } else {
        // console.log(res, "creator response");
        dispatch(loginErr(res));
        return res;
      }
    } catch (err) {
      dispatch(loginErr(err));
      return err;
    }
  };
};

//SUPER ADMIN UPDATE PROFILE
const getProfile = (payloads) => {
  return async (dispatch) => {
    const resp = await DataService.get(API.auth.ProfileChange, payloads);
    if (!resp.data.error) {
      session.setUser(resp.data.data);
      // console.log("hello");
      return resp.data;
    } else {
      message.error(resp.data.message);
      return false;
    }
  };
};

//FORGET PASSWORD API FUNCTION CALL
const changePassword = (payloads) => {
  return async (dispatch) => {
    try {
      const res = await DataService.put(API.auth.changePassword, payloads);
      // console.log(res, "resp");
      if (!res.data.error) {
        // console.log(res?.data?.message);
        return res;
      } else {
        // console.log("chanab");
        return res;
      }
    } catch (err) {
      // console.log("jmna");
      return err;
    }
  };
};

const getAdminData = (payload) => {
  return async (dispatch) => {
    try {
      const res = await DataService.get(API.auth.adminData, payload);
      if (!res.data.error) {
        dispatch(getAdmin(res));
        return res;
      } else {
        return res;
      }
    } catch (err) {
      return err;
    }
  };
};

//RESET PASSWORD API FUNCTION CALL
const forgotPass = (payloads) => {
  return async (dispatch) => {
    const resp = await DataService.post(API.auth.forgotPass, payloads);
    if (!resp.data.error) {
      return resp.data;
    } else {
      message.error(resp.data.message);
      return false;
    }
  };
};

const resetPass = (payloads) => {
  return async (dispatch) => {
    const resp = await DataService.post(API.auth.userResetPass, payloads);
    if (!resp.data.error) {
      return resp.data;
    } else {
      message.error(resp.data.message);
      return false;
    }
  };
};

// const login = () => {
//   return async dispatch => {
//     try {
//       dispatch(loginBegin());
//       setTimeout(() => {
//         Cookies.set('logedIn', true);
//         return dispatch(loginSuccess(true));
//       }, 1000);
//     } catch (err) {
//       dispatch(loginErr(err));
//     }
//   };
// };

//LOGOUT API FUNCTION CALL
const logOut = () => {
  return async (dispatch) => {
    dispatch(logoutBegin());
    const resp = await DataService.get(API.auth.logout);
    if (!resp.data.error) {
      // removeItem("access_token");
      // removeItem("userDetails");
      Cookies.remove("logedIn");
      dispatch(logoutSuccess(false));
    } else {
      message.error(resp.data.message);
      return false;
    }
  };
};

export {
  login,
  logOut,
  changePassword,
  forgotPass,
  getProfile,
  getAdminData,
  resetPass,
};
