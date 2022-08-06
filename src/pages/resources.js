// Styling
import "../App.css";
// Dependencies
import axios from "src/axios-config";
import $ from "jquery";
import React, { Component } from "react";
import MaterialTable from "material-table";
import { withTranslation, Trans } from "react-i18next";

function resources(props) {
  //Call to action methods
  function onBackClick() {
    props.history.push("/dashboard");
  }
  function onUploadClick() {
    props.history.push("/user/upload");
  }

  const { t, i18n } = props;
  return <div className="resources"></div>;
}

export default withTranslation("translations")(resources);
