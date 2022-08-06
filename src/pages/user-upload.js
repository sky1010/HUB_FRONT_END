//Styling
import "../App.css";
//Dependencies
import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withTranslation, Trans } from "react-i18next";
import { Grid } from "@material-ui/core";
import axios from "axios";
import jwtDecode from "jwt-decode";
import wallpaper from "../assets/BACKGROUNDS/3.svg";

function UserUpload(props) {
  const [userId, setUserId] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [client, setClient] = useState();
  const [clientName, setClientName] = useState();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [token, setToken] = useState();

  //Sets token to get current user data
  useEffect(() => {
    setToken(getToken());
  }, [token]);

  //Decode token from Local Storage
  function getToken() {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
      getCurrentUser(decoded.id);
    }
  }

  function getCurrentUser(id) {
    if (id) {
      axios.get("/api/users/getUser/" + id).then((res) => {
        setCurrentUser(res.data);
        setClient(res.data.client);
        setClientName(res.data.Client.name);
      });
    }
  }

  //console.log(clientName)
  function saveFile(e) {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    //getCurrentUser(userId);
  }

  function uploadFile(e) {
    let Data = new FormData();
    const File = file;
    const FileName = fileName;
    const Category = "Templates";
    const Client = client;
    const cName = currentUser.Client.name;
    const User = userId;
    console.log(cName);
    Data.set("file", File);
    Data.set("fileName", FileName);
    Data.set("category", Category);
    Data.set("client", Client);
    Data.set("clientName", cName);
    Data.set("user", User);
    var config = { headers: { "Content-Type": undefined } };
    axios
      .post("/userUpload", Data, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log);
    props.history.push("/templates");
  }

  const { t, i18n } = props;

  return (
    <div
      className="userUpload"
      style={{
        backgroundImage: `url(${wallpaper})`,
        maxWidth: "auto",
        minHeight: "105vh",
        height: "auto",
        marginTop: "0px",
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
      }}
    >
      <header>
        <div className="container">
          <div className="row">
            <Link to="/templates">
              <h2 id="title-pages">
                <Trans>{t("uploadDocs")}</Trans>
              </h2>
            </Link>
          </div>
        </div>
      </header>
      <div class="templates-upload-form">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item md={4}>
            <input
              className="custom-file-input"
              type="file"
              onChange={saveFile}
            />
          </Grid>
          <Grid item md={0}>
            <button
              onClick={uploadFile}
              className="btn btn-large waves-effect waves-dark hoverable white black-text accent-3"
            >
              Upload
            </button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default withTranslation("translations")(UserUpload);
