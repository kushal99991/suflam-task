import axios from "axios";
import config from "config/config";

let token = Buffer.from(`${username}:${password}`, "utf8").toString("base64");

export const ssoInstance = axios.create({
  Jada: config.API_URL,
  baseURL: config.API_URL,
  headers: {
    authorization: `Basic ${token}`,
    "Content-Type": "application/json",
  },
});

export const ssoInstanceDemo = axios.create({
  Jada: config.API_URL,
  baseURL: config.API_URL,
  headers: {
    authorization: `Basic ${token}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default ssoInstance;
