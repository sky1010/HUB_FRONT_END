// Styling
import "../App.css";
// Dependencies
import axios from "src/axios-config";
import $ from "jquery";
import React, { Component } from "react";
import MaterialTable from "material-table";
import { withTranslation, Trans } from "react-i18next";

class Rep_summary extends Component {
  constructor() {
    super();
    this.state = {
      resources: [],
      resource: {},
    };
  }

  render() {
    const { t, i18n } = this.props;
    return <div className="Rep_summary"></div>;
  }
}

export default withTranslation("translations")(Rep_summary);
