// Styling
import "../App.css";
// Dependencies
import axios from "src/axios-config";
import $ from "jquery";
import React, { Component } from "react";
import MaterialTable from "material-table";
import { withTranslation, Trans } from "react-i18next";

class ReportsModule extends Component {
  constructor() {
    super();
    this.state = {
      resources: [],
      resource: {},
    };
  }

  render() {
    const { t, i18n } = this.props;
    return (
      <div className="ReportsModule">
        <iframe
          width="100%"
          height="900px"
          src="http://localhost:8888/newfcf/buildingsview.php"
        />
      </div>
    );
  }
}

export default withTranslation("translations")(ReportsModule);
