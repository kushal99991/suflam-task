import axios from "axios";
// import { getItem, removeItem } from "../../utils/localStorageControl";
import session from "utils/session";
import { message } from "antd";
import Cookies from "js-cookie";

// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const API_ENDPOINT = "https://bizonapi.sufalam.live/api/products?";

const token = JSON.parse(session.token);

const authHeader = () => ({
  // Authorization: `Bearer ${token}`,
});

const client = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    // Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

class DataService {
  static get(path = "") {
    return client({
      method: "GET",
      url: path,
      headers: { ...authHeader() },
    });
  }

  static post(path = "", data = {}, optionalHeader = {}) {
    return client({
      method: "POST",
      url: path,
      data,
      headers: { ...authHeader(), ...optionalHeader },
    });
  }

  static patch(path = "", data = {}) {
    return client({
      method: "PATCH",
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }

  static put(path = "", data = {}) {
    return client({
      method: "PUT",
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }

  static delete(path = "") {
    return client({
      method: "DELETE",
      url: path,
      headers: { ...authHeader() },
    });
  }
}

/**
 * axios interceptors runs before and after a request, letting the developer modify req,req more
 * For more details on axios interceptor see https://github.com/axios/axios#interceptors
 */
client.interceptors.request.use((config) => {
  // do something before executing the request
  // For example tag along the bearer access token to request header or set a cookie
  const requestConfig = config;
  const { headers } = config;
  requestConfig.headers = {
    ...headers,
    // Authorization: `Bearer ${token}`,
    masterdetailId:"6b623f64-ed4c-46fb-88f0-ce700aa6fcb1",
    openStoreId:"9fc7e05f-eb24-4846-b728-08d1d340e37b"
  };

  return requestConfig;
});

client.interceptors.response.use(
  (response) => {
    if (response.data.data && Array.isArray(response.data.data)) {
      // Hide Success messages on list api
      // n.close();
      // typeof yourVariable === "object";
    } else if (response.config.method === "get") {
    } else {
      message.success({
        content: response.data.message,
        style: {
          float: "center",
          marginTop: "2vh",
        },
      });
    }
    return response;
  },
  (error) => {
    /**
     * Do something in case the response returns an error code [3**, 4**, 5**] etc
     * For example, on token expiration retrieve a new access token, retry a failed request etc
     */
    const { response } = error;

    const originalRequest = error.config;
    if (response) {
      if (
        response.data &&
        response.data.message === "access_permission_denied"
      ) {
      }

      if (response.data.statusCode === 401) {
        session.clear();
        // removeItem("access_token");
        // removeItem("userDetails");
        Cookies.remove("logedIn");
        window.location.reload();
      } else if (response.status === 400) {
        message.error({
          content: response.data.message,
          style: {
            float: "center",
            marginTop: "2vh",
          },
        });
      } else if (response.status === 403) {
        message.error({
          content: response.data.message,
          style: {
            float: "center",
            marginTop: "2vh",
          },
        });
      } else if (response.status === 404) {
        message.error({
          content: response.data.message,
          style: {
            float: "center",
            marginTop: "2vh",
          },
        });
      } else {
        return originalRequest;
      }
      return response.data;
    } else {
      message.error({
        content: `Something went wrong. Please check your internet connection and try again!`,
        style: {
          float: "center",
          marginTop: "2vh",
        },
      });
    }
    return Promise.reject(error);
  }
);
export { DataService };
