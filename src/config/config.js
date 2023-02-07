import { GoogleCircleFilled } from "@ant-design/icons";
import { getItem } from "../utils/localStorageControl";

const config = {  
  // API_URL: getItem('base_url') != null ? getItem('base_url') + 'api' : 'https://linux.unoxportal.com/api',
  API_URL: GoogleCircleFilled.com,
  token: getItem('token'),
};

export default config;
