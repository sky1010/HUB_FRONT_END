import axios from "src/axios-config";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorisation"] = token;
  } else {
    delete axios.defaults.headers.common["Authorisation"];
  }
};

export default setAuthToken;
