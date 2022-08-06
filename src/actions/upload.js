import axios from "axios";

import { GET_ERRORS } from "./types";

// Upload Resources
export const upload = (file, history) => (dispatch) => {
  axios
    .post("/api/uploadResources", file)
    .then((res) => history.push("/admin"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
