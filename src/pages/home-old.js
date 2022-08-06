// styling
import "../style/dashboard.css";
import evolvelogo from "../img/fcfl.png";
// Essentials
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser } from "../actions/authActions";
import store from "../store";
// dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Link } from "react-router-dom";
import { withTranslation, Trans } from "react-i18next";
import axios from "src/axios-config";

import Templates_card from "../components/Menu-items/templates-card";
import Checklists_card from "../components/Menu-items/checklists-card";
import Workflows_card from "../components/Menu-items/workflows-card";
import Contractor_card from "../components/Menu-items/contractor-card";
import Trainingmedia_card from "../components/Menu-items/trainingmedia-card";
import Admin_card from "../components/Menu-items/admin-card";
import CAFM_card from "../components/Menu-items/CAFM-card";
import SSRSrep_card from "../components/Menu-items/ssrsRep-card";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
    };
  }

  getUser = (id) => {
    axios
      .get("/api/users/getUser/" + id)
      .then((res) => {
        this.setState({ user: res.data });
        console.log(this.state.user);
      })
      .catch((err) => console.log(err));
  };

  getUserOpts = (id) => {
    let category = "RI";
    axios.get("/api/users/getUserOpts/" + id + "/" + category).then((res) => {
      this.setState({ resourceOpts: res.data.code });
      console.log(this.state.resourceOpts);
    });
  };

  // getData = () => {
  // this.state.userRole  = this.props.auth.role;
  //  this.state.user = {
  //    id: this.props.auth.user._id,
  //    name: this.props.auth.user.name,
  //    role: this.props.auth.user.role,
  //    client: this.props.auth.user.client
  // add other opts
  //  }
  //  return this.state.user;
  ///console.log(this.state.user);
  //console.log(this.state.userRole);
  //}

  componentDidMount() {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      setAuthToken(token);
      const decoded = jwt_decode(token);
      console.log(decoded.id);
      this.setState({ decoded: decoded.id });
      console.log(this.state.decoded);
      this.getUser(decoded.id);
      this.getUserOpts(decoded.id);
    }
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  };
  onBackClick = (e) => {
    e.preventDefault();
    this.props.history.push("/hub");
  };
  colpts = () => {
    let col = {};
    if (this.state.user.role === "admin") {
      col = "col s12 m3";
      return col;
    } else {
      col = "col s12 m4";
      return col;
    }
  };

  cafm = () => {
    const client = this.state.user.client;
    var link = {};
    if (client === "CMC LTD") {
      link = "https://serv.pfms.mu/IntraMobile/security/login";
      return link;
    } else if (client === "Helexia") {
      link = "https://demo.pfmi.eu/Intranet/security/login";
      return link;
    } else if (client === "E-VOLVE") {
      link = "https://serv.pfms.mu/IntraMobile/security/login";
      return link;
    } else if (client === "CFME") {
      link = "https://https://mtr.cityeurope.eu/Intranet/security/login";
      return link;
    }
  };

  reps = () => {
    const client = this.state.user.client;
    var link = {};
    if (client === "CMC LTD") {
      link = "https://serv.pfms.mu/reports/";
      return link;
    } else if (client === "Helexia") {
      link = "https://demo.pfmi.eu/reports/browse/";
      return link;
    } else if (client === "E-VOLVE") {
      link = "https://serv.pfms.mu/reports/";
      return link;
    } else if (client === "CFME") {
      link = "http://cfmerap.forumconcepts.fr/";
    }
  };

  render() {
    //const user = this.getData();
    // console.log(user)
    const col = this.colpts();
    const CAFMSlink = this.cafm();
    const RepLink = this.reps();
    const { t, i18n } = this.props;
    return (
      <div className="Home">
        <header>
          <div className="container">
            <div className="row">
              <h1 id="home-page-title">
                <Trans>{t("riTitle")}</Trans>
              </h1>

              <div className="col s1 m1">
                <button
                  id="res-back-btn"
                  onClick={this.onBackClick}
                  style={{
                    width: "125px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  className="btn btn-large waves-effect waves-dark hoverable white black-text accent-3"
                >
                  <Trans>{t("back")}</Trans>
                </button>
              </div>
            </div>
          </div>
        </header>

        <div id="main-menu-item-blockR" className="container">
          <div className="row">
            <div className="col s12 m4">
              <div>
                {this.state.resourceOpts === "[T]" && <Templates_card />}
                {this.state.resourceOpts === "[TCWCtM]" && <Templates_card />}
                {this.state.resourceOpts === "[TC]" && <Templates_card />}
                {this.state.resourceOpts === "[CT]" && <Templates_card />}
                {this.state.resourceOpts === "[TW]" && <Templates_card />}
                {this.state.resourceOpts === "[WT]" && <Templates_card />}
                {this.state.resourceOpts === "[TCt]" && <Templates_card />}
                {this.state.resourceOpts === "[CtT]" && <Templates_card />}
                {this.state.resourceOpts === "[MT]" && <Templates_card />}
                {this.state.resourceOpts === "[TM]" && <Templates_card />}
                {this.state.resourceOpts === "[TCW]" && <Templates_card />}
                {this.state.resourceOpts === "[CWT]" && <Templates_card />}
                {this.state.resourceOpts === "[WCT]" && <Templates_card />}
                {this.state.resourceOpts === "[WTC]" && <Templates_card />}
                {this.state.resourceOpts === "[TCCt]" && <Templates_card />}
                {this.state.resourceOpts === "[TCtC]" && <Templates_card />}
                {this.state.resourceOpts === "[CCtT]" && <Templates_card />}
                {this.state.resourceOpts === "[CtTC]" && <Templates_card />}
                {this.state.resourceOpts === "[CtCT]" && <Templates_card />}
                {this.state.resourceOpts === "[TCM]" && <Templates_card />}
                {this.state.resourceOpts === "[CMT]" && <Templates_card />}
                {this.state.resourceOpts === "[TMC]" && <Templates_card />}
                {this.state.resourceOpts === "[MTC]" && <Templates_card />}
                {this.state.resourceOpts === "[TWC]" && <Templates_card />}
                {this.state.resourceOpts === "[WCT]" && <Templates_card />}
                {this.state.resourceOpts === "[CWT]" && <Templates_card />}
                {this.state.resourceOpts === "[CTW]" && <Templates_card />}
                {this.state.resourceOpts === "[TWCt]" && <Templates_card />}
                {this.state.resourceOpts === "[TCtW]" && <Templates_card />}
                {this.state.resourceOpts === "[CtWT]" && <Templates_card />}
                {this.state.resourceOpts === "[WTCt]" && <Templates_card />}
                {this.state.resourceOpts === "[TWM]" && <Templates_card />}
                {this.state.resourceOpts === "[TMW]" && <Templates_card />}
                {this.state.resourceOpts === "[WMT]" && <Templates_card />}
                {this.state.resourceOpts === "[WTM]" && <Templates_card />}
                {this.state.resourceOpts === "[MTW]" && <Templates_card />}
                {this.state.resourceOpts === "[MWT]" && <Templates_card />}
                {this.state.resourceOpts === "[WCtT]" && <Templates_card />}
                {this.state.resourceOpts === "[TMCt]" && <Templates_card />}
                {this.state.resourceOpts === "[CtMT]" && <Templates_card />}
                {/** 4 tiles options */}
                {/** Templates, Checklist, Contractor, Workflows*/}
                {this.state.resourceOpts === "[TCWCt]" && <Templates_card />}
                {this.state.resourceOpts === "[TWCCt]" && <Templates_card />}
                {this.state.resourceOpts === "[TCtCW]" && <Templates_card />}
                {this.state.resourceOpts === "[TWCtC]" && <Templates_card />}
                {this.state.resourceOpts === "[CTWCt]" && <Templates_card />}
                {this.state.resourceOpts === "[CWTCt]" && <Templates_card />}
                {this.state.resourceOpts === "[CCtTW]" && (
                  <Templates_card />
                )}{" "}
                {this.state.resourceOpts === "[CCtWT]" && <Templates_card />}
                {this.state.resourceOpts === "[CtCWT]" && <Templates_card />}
                {this.state.resourceOpts === "[CtWCT]" && <Templates_card />}
                {this.state.resourceOpts === "[CtTCW]" && <Templates_card />}
                {this.state.resourceOpts === "[CtTWC]" && <Templates_card />}
                {this.state.resourceOpts === "[WTCtC]" && <Templates_card />}
                {this.state.resourceOpts === "[WCtCT]" && <Templates_card />}
                {this.state.resourceOpts === "[WCCtT]" && <Templates_card />}
                {/** Templates, Checklist, Contractor, Media */}
                {this.state.resourceOpts === "[TCCtM]" && <Templates_card />}
                {this.state.resourceOpts === "[TCtCM]" && <Templates_card />}
                {this.state.resourceOpts === "[TMCCt]" && <Templates_card />}
                {this.state.resourceOpts === "[TMCtC]" && <Templates_card />}
                {this.state.resourceOpts === "[TCMCt]" && <Templates_card />}
                {this.state.resourceOpts === "[TCtMC]" && <Templates_card />}
                {this.state.resourceOpts === "[CTMCt]" && <Templates_card />}
                {this.state.resourceOpts === "[CMCtT]" && <Templates_card />}
                {this.state.resourceOpts === "[CCtMT]" && <Templates_card />}
                {this.state.resourceOpts === "[CTCtM]" && <Templates_card />}
                {/** Templates, Workflows, Contractor, Media */}
                {this.state.resourceOpts === "[TWCtM]" && <Templates_card />}
                {this.state.resourceOpts === "[TCtWM]" && <Templates_card />}
                {this.state.resourceOpts === "[TMWCt]" && <Templates_card />}
                {this.state.resourceOpts === "[TMCtW]" && <Templates_card />}
                {this.state.resourceOpts === "[TWMCt]" && <Templates_card />}
                {this.state.resourceOpts === "[TCtMW]" && <Templates_card />}
                {this.state.resourceOpts === "[WTMCt]" && <Templates_card />}
                {this.state.resourceOpts === "[WMCtT]" && <Templates_card />}
                {this.state.resourceOpts === "[WCtMT]" && <Templates_card />}
                {this.state.resourceOpts === "[WTCtM]" && <Templates_card />}
                {/** Templates, Workflows, Checklist, Media */}
                {this.state.resourceOpts === "[TCWM]" && <Templates_card />}
                {this.state.resourceOpts === "[TWCM]" && <Templates_card />}
                {this.state.resourceOpts === "[TMCW]" && <Templates_card />}
                {this.state.resourceOpts === "[TMWC]" && <Templates_card />}
                {this.state.resourceOpts === "[TCMW]" && <Templates_card />}
                {this.state.resourceOpts === "[TWMC]" && <Templates_card />}
                {this.state.resourceOpts === "[CTMW]" && <Templates_card />}
                {this.state.resourceOpts === "[CMWT]" && <Templates_card />}
                {this.state.resourceOpts === "[CWMT]" && <Templates_card />}
                {this.state.resourceOpts === "[CTWM]" && <Templates_card />}
              </div>
            </div>
            <div className="col s12 m4">
              <div>
                {this.state.resourceOpts === "[C]" && <Checklists_card />}
                {this.state.resourceOpts === "[TCWCtM]" && <Checklists_card />}
                {this.state.resourceOpts === "[TC]" && <Checklists_card />}
                {this.state.resourceOpts === "[CT]" && <Checklists_card />}
                {this.state.resourceOpts === "[CW]" && <Checklists_card />}
                {this.state.resourceOpts === "[WC]" && <Checklists_card />}
                {this.state.resourceOpts === "[CCt]" && <Checklists_card />}
                {this.state.resourceOpts === "[CtC]" && <Checklists_card />}
                {this.state.resourceOpts === "[CM]" && <Checklists_card />}
                {this.state.resourceOpts === "[MC]" && <Checklists_card />}
                {this.state.resourceOpts === "[TCW]" && <Checklists_card />}
                {this.state.resourceOpts === "[CWT]" && <Checklists_card />}
                {this.state.resourceOpts === "[WCT]" && <Checklists_card />}
                {this.state.resourceOpts === "[WTC]" && <Checklists_card />}
                {this.state.resourceOpts === "[CTW]" && <Checklists_card />}
                {this.state.resourceOpts === "[TCCt]" && <Checklists_card />}
                {this.state.resourceOpts === "[CCtT]" && <Checklists_card />}
                {this.state.resourceOpts === "[CtTC]" && <Checklists_card />}
                {this.state.resourceOpts === "[CtCT]" && <Checklists_card />}
                {this.state.resourceOpts === "[TCM]" && <Checklists_card />}
                {this.state.resourceOpts === "[CMT]" && <Checklists_card />}
                {this.state.resourceOpts === "[TMC]" && <Checklists_card />}
                {this.state.resourceOpts === "[MTC]" && <Checklists_card />}
                {this.state.resourceOpts === "[CCtW]" && <Checklists_card />}
                {this.state.resourceOpts === "[CWCt]" && <Checklists_card />}
                {this.state.resourceOpts === "[WCtC]" && <Checklists_card />}
                {this.state.resourceOpts === "[CtWC]" && <Checklists_card />}
                {this.state.resourceOpts === "[WCCt]" && <Checklists_card />}
                {this.state.resourceOpts === "[CtCW]" && <Checklists_card />}
                {this.state.resourceOpts === "[CCtM]" && <Checklists_card />}
                {this.state.resourceOpts === "[CMCt]" && <Checklists_card />}
                {this.state.resourceOpts === "[MCtC]" && <Checklists_card />}
                {this.state.resourceOpts === "[CtMC]" && <Checklists_card />}
                {this.state.resourceOpts === "[MCCt]" && <Checklists_card />}
                {this.state.resourceOpts === "[WMC]" && <Checklists_card />}
                {this.state.resourceOpts === "[MCW]" && <Checklists_card />}
                {this.state.resourceOpts === "[WCM]" && <Checklists_card />}
                {this.state.resourceOpts === "[CWM]" && <Checklists_card />}
                {this.state.resourceOpts === "[MWC]" && <Checklists_card />}
                {/** 4 tiles options */}
                {/** Templates, Checklist, Contractor, Workflows*/}
                {this.state.resourceOpts === "[TCWCt]" && <Checklists_card />}
                {this.state.resourceOpts === "[TWCCt]" && <Checklists_card />}
                {this.state.resourceOpts === "[TCtCW]" && <Checklists_card />}
                {this.state.resourceOpts === "[TWCtC]" && <Checklists_card />}
                {this.state.resourceOpts === "[CTWCt]" && <Checklists_card />}
                {this.state.resourceOpts === "[CWTCt]" && <Checklists_card />}
                {this.state.resourceOpts === "[CCtTW]" && <Checklists_card />}
                {this.state.resourceOpts === "[CCtWT]" && <Checklists_card />}
                {this.state.resourceOpts === "[CtCWT]" && <Checklists_card />}
                {this.state.resourceOpts === "[CtWCT]" && <Checklists_card />}
                {this.state.resourceOpts === "[CtTCW]" && <Checklists_card />}
                {this.state.resourceOpts === "[CtTWC]" && <Checklists_card />}
                {this.state.resourceOpts === "[WTCtC]" && <Checklists_card />}
                {this.state.resourceOpts === "[WCtCT]" && <Checklists_card />}
                {this.state.resourceOpts === "[WCCtT]" && <Checklists_card />}
                {/** Templates, Checklist, Contractor, Media */}
                {this.state.resourceOpts === "[TCCtM]" && <Checklists_card />}
                {this.state.resourceOpts === "[TCtCM]" && <Checklists_card />}
                {this.state.resourceOpts === "[TMCCt]" && <Checklists_card />}
                {this.state.resourceOpts === "[TMCtC]" && <Checklists_card />}
                {this.state.resourceOpts === "[TCMCt]" && <Checklists_card />}
                {this.state.resourceOpts === "[TCtMC]" && <Checklists_card />}
                {this.state.resourceOpts === "[CTMCt]" && <Checklists_card />}
                {this.state.resourceOpts === "[CMCtT]" && <Checklists_card />}
                {this.state.resourceOpts === "[CCtMT]" && <Checklists_card />}
                {this.state.resourceOpts === "[CTCtM]" && <Checklists_card />}
                {/** Templates, Workflows, Checklist, Media */}
                {this.state.resourceOpts === "[TCWM]" && <Checklists_card />}
                {this.state.resourceOpts === "[TWCM]" && <Checklists_card />}
                {this.state.resourceOpts === "[TMCW]" && <Checklists_card />}
                {this.state.resourceOpts === "[TMWC]" && <Checklists_card />}
                {this.state.resourceOpts === "[TCMW]" && <Checklists_card />}
                {this.state.resourceOpts === "[TWMC]" && <Checklists_card />}
                {this.state.resourceOpts === "[CTMW]" && <Checklists_card />}
                {this.state.resourceOpts === "[CMWT]" && <Checklists_card />}
                {this.state.resourceOpts === "[CWMT]" && <Checklists_card />}
                {this.state.resourceOpts === "[CTWM]" && <Checklists_card />}
                {/** Checklist, Workflows, Contractor, Media */}
                {this.state.resourceOpts === "[CWCtM]" && <Checklists_card />}
                {this.state.resourceOpts === "[CCtWM]" && <Checklists_card />}
                {this.state.resourceOpts === "[CCtMW]" && <Checklists_card />}
                {this.state.resourceOpts === "[CMCtW]" && <Checklists_card />}
                {this.state.resourceOpts === "[MCCtW]" && <Checklists_card />}
                {this.state.resourceOpts === "[MCtCW]" && <Checklists_card />}
                {this.state.resourceOpts === "[MWCtC]" && <Checklists_card />}
                {this.state.resourceOpts === "[MCtWC]" && <Checklists_card />}
              </div>
            </div>
            <div className="col s12 m4">
              <div>
                {this.state.resourceOpts === "[W]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[TCWCtM]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[TW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[WT]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[WC]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[WCt]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CtW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[WM]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[MW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[TCW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CWT]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[WCT]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[WTC]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[TWCt]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[TWM]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[TWC]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[TWC]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[WCT]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CWT]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CTW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[TMW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[WMT]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[WTM]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[MTW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[MWT]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CCtW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CWCt]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[WCtC]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[WCCt]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CtWC]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CtCW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[TWCt]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[WCtT]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CtWT]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CtTW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[WMC]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[WCM]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[MCW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CWM]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[MWC]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CtMW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CtWM]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[MWCt]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[MCtW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[WTCt]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CtWT]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CtTW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[WCtM]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {/** 4 tiles options */}
                {/** Templates, Checklist, Contractor, Workflows*/}
                {this.state.resourceOpts === "[TCWCt]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[TWCCt]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[TCtCW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[TWCtC]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CTWCt]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CWTCt]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CCtTW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CCtWT]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CtCWT]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CtWCT]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CtTCW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CtTWC]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[WTCtC]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[WCtCT]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[WCCtT]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {/** Templates, Workflows, Contractor, Media */}
                {this.state.resourceOpts === "[TWCtM]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[TCtWM]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[TMWCt]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[TMCtW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[TWMCt]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[TCtMW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}

                {this.state.resourceOpts === "[WTMCt]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[WMCtT]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[WCtMT]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[WTCtM]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {/** Templates, Workflows, Checklist, Media */}
                {this.state.resourceOpts === "[TCWM]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[TWCM]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[TMCW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[TMWC]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[TCMW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[TWMC]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CTMW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CMWT]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CWMT]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CTWM]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {/** Checklist, Workflows, Contractor, Media */}
                {this.state.resourceOpts === "[CWCtM]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CCtWM]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CCtMW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[CMCtW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[MCCtW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[MCtCW]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[MWCtC]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
                {this.state.resourceOpts === "[MCtWC]" && (
                  <Workflows_card id="workflows-card-test" />
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m4">
              <div>
                {this.state.resourceOpts === "[Ct]" && <Contractor_card />}
                {this.state.resourceOpts === "[TCWCtM]" && <Contractor_card />}
                {this.state.resourceOpts === "[TCt]" && <Contractor_card />}
                {this.state.resourceOpts === "[CtT]" && <Contractor_card />}
                {this.state.resourceOpts === "[CCt]" && <Contractor_card />}
                {this.state.resourceOpts === "[CtC]" && <Contractor_card />}
                {this.state.resourceOpts === "[CtW]" && <Contractor_card />}
                {this.state.resourceOpts === "[WCt]" && <Contractor_card />}
                {this.state.resourceOpts === "[CtM]" && <Contractor_card />}
                {this.state.resourceOpts === "[MCt]" && <Contractor_card />}
                {this.state.resourceOpts === "[TCCt]" && <Contractor_card />}
                {this.state.resourceOpts === "[CCtT]" && <Contractor_card />}
                {this.state.resourceOpts === "[CtTC]" && <Contractor_card />}
                {this.state.resourceOpts === "[CtCT]" && <Contractor_card />}
                {this.state.resourceOpts === "[TWCt]" && <Contractor_card />}
                {this.state.resourceOpts === "[WCtT]" && <Contractor_card />}
                {this.state.resourceOpts === "[CtWT]" && <Contractor_card />}
                {this.state.resourceOpts === "[CtTW]" && <Contractor_card />}
                {this.state.resourceOpts === "[CCtW]" && <Contractor_card />}
                {this.state.resourceOpts === "[CWCt]" && <Contractor_card />}
                {this.state.resourceOpts === "[WCtC]" && <Contractor_card />}
                {this.state.resourceOpts === "[CtWC]" && <Contractor_card />}
                {this.state.resourceOpts === "[CtCW]" && <Contractor_card />}
                {this.state.resourceOpts === "[WCCt]" && <Contractor_card />}
                {this.state.resourceOpts === "[CCtM]" && <Contractor_card />}
                {this.state.resourceOpts === "[CMCt]" && <Contractor_card />}
                {this.state.resourceOpts === "[MCtC]" && <Contractor_card />}
                {this.state.resourceOpts === "[CtMC]" && <Contractor_card />}
                {this.state.resourceOpts === "[MCCt]" && <Contractor_card />}
                {this.state.resourceOpts === "[CtMW]" && <Contractor_card />}
                {this.state.resourceOpts === "[CtWM]" && <Contractor_card />}
                {this.state.resourceOpts === "[MCtT]" && <Contractor_card />}
                {this.state.resourceOpts === "[CtTM]" && <Contractor_card />}
                {this.state.resourceOpts === "[TMCt]" && <Contractor_card />}
                {this.state.resourceOpts === "[CtMT]" && <Contractor_card />}
                {this.state.resourceOpts === "[MWCt]" && <Contractor_card />}
                {this.state.resourceOpts === "[MCtW]" && <Contractor_card />}
                {this.state.resourceOpts === "[CtMW]" && <Contractor_card />}
                {this.state.resourceOpts === "[WCtM]" && <Contractor_card />}
                {/** 4 tiles options */}
                {/** Templates, Checklist, Contractor, Workflows*/}
                {this.state.resourceOpts === "[TCWCt]" && <Contractor_card />}
                {this.state.resourceOpts === "[TWCCt]" && <Contractor_card />}
                {this.state.resourceOpts === "[TCtCW]" && <Contractor_card />}
                {this.state.resourceOpts === "[TWCtC]" && <Contractor_card />}
                {this.state.resourceOpts === "[CTWCt]" && <Contractor_card />}
                {this.state.resourceOpts === "[CWTCt]" && <Contractor_card />}
                {this.state.resourceOpts === "[CCtTW]" && (
                  <Contractor_card />
                )}{" "}
                {this.state.resourceOpts === "[CCtWT]" && <Contractor_card />}
                {this.state.resourceOpts === "[CtCWT]" && <Contractor_card />}
                {this.state.resourceOpts === "[CtWCT]" && <Contractor_card />}
                {this.state.resourceOpts === "[CtTCW]" && <Contractor_card />}
                {this.state.resourceOpts === "[CtTWC]" && <Contractor_card />}
                {this.state.resourceOpts === "[WTCtC]" && <Contractor_card />}
                {this.state.resourceOpts === "[WCtCT]" && <Contractor_card />}
                {this.state.resourceOpts === "[WCCtT]" && <Contractor_card />}
                {/** Templates, Checklist, Contractor, Media */}
                {this.state.resourceOpts === "[TCCtM]" && <Contractor_card />}
                {this.state.resourceOpts === "[TCtCM]" && <Contractor_card />}
                {this.state.resourceOpts === "[TMCCt]" && <Contractor_card />}
                {this.state.resourceOpts === "[TMCtC]" && <Contractor_card />}
                {this.state.resourceOpts === "[TCMCt]" && <Contractor_card />}
                {this.state.resourceOpts === "[TCtMC]" && <Contractor_card />}
                {this.state.resourceOpts === "[CTMCt]" && <Contractor_card />}
                {this.state.resourceOpts === "[CMCtT]" && <Contractor_card />}
                {this.state.resourceOpts === "[CCtMT]" && <Contractor_card />}
                {this.state.resourceOpts === "[CTCtM]" && <Contractor_card />}
                {/** Templates, Workflows, Contractor, Media */}
                {this.state.resourceOpts === "[TWCtM]" && <Contractor_card />}
                {this.state.resourceOpts === "[TCtWM]" && <Contractor_card />}
                {this.state.resourceOpts === "[TMWCt]" && <Contractor_card />}
                {this.state.resourceOpts === "[TMCtW]" && <Contractor_card />}
                {this.state.resourceOpts === "[TWMCt]" && <Contractor_card />}
                {this.state.resourceOpts === "[TCtMW]" && <Contractor_card />}
                {this.state.resourceOpts === "[WTMCt]" && <Contractor_card />}
                {this.state.resourceOpts === "[WMCtT]" && <Contractor_card />}
                {this.state.resourceOpts === "[WCtMT]" && <Contractor_card />}
                {this.state.resourceOpts === "[WTCtM]" && <Contractor_card />}
                {/** Checklist, Workflows, Contractor, Media */}
                {this.state.resourceOpts === "[CWCtM]" && <Contractor_card />}
                {this.state.resourceOpts === "[CCtWM]" && <Contractor_card />}
                {this.state.resourceOpts === "[CCtMW]" && <Contractor_card />}
                {this.state.resourceOpts === "[CMCtW]" && <Contractor_card />}
                {this.state.resourceOpts === "[MCCtW]" && <Contractor_card />}
                {this.state.resourceOpts === "[MCtCW]" && <Contractor_card />}
                {this.state.resourceOpts === "[MWCtC]" && <Contractor_card />}
                {this.state.resourceOpts === "[MCtWC]" && <Contractor_card />}
              </div>
            </div>
            <div className="col s12 m2">
              <div></div>
            </div>
            <div className="col s12 m4">
              <div>
                {this.state.resourceOpts === "[M]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[TCWCtM]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[TM]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[MT]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[MC]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[CM]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[MW]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[WM]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[MCt]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[CtM]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[TCM]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[CMT]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[TMC]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[MTC]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[TWM]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[WMT]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[WTM]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[MTW]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[MWT]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[TMW]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[CCtM]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[CMCt]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[MCtC]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[CtMC]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[MCCt]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[WMC]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[MCW]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[CWM]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[MWC]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[WCM]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[CtMW]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[CtWM]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[MWCt]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[MCtW]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[CtMW]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[WCtM]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[MCtT]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[CtTM]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[TMCt]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[CtMT]" && <Trainingmedia_card />}
                {/** 4 tiles options */}
                {/** Templates, Checklist, Contractor, Media */}
                {this.state.resourceOpts === "[TCCtM]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[TCtCM]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[TMCCt]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[TMCtC]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[TCMCt]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[TCtMC]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[CTMCt]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[CMCtT]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[CCtMT]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[CTCtM]" && (
                  <Trainingmedia_card />
                )}
                {/** Templates, Workflows, Contractor, Media */}
                {this.state.resourceOpts === "[TWCtM]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[TCtWM]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[TMWCt]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[TMCtW]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[TWMCt]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[TCtMW]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[WTMCt]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[WMCtT]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[WCtMT]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[WTCtM]" && (
                  <Trainingmedia_card />
                )}
                {/** Templates, Workflows, Checklist, Media */}
                {this.state.resourceOpts === "[TCWM]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[TWCM]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[TMCW]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[TMWC]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[TCMW]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[TWMC]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[CTMW]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[CMWT]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[CWMT]" && <Trainingmedia_card />}
                {this.state.resourceOpts === "[CTWM]" && <Trainingmedia_card />}
                {/** Checklist, Workflows, Contractor, Media */}
                {this.state.resourceOpts === "[CWCtM]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[CCtWM]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[CCtMW]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[CMCtW]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[MCCtW]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[MCtCW]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[MWCtC]" && (
                  <Trainingmedia_card />
                )}
                {this.state.resourceOpts === "[MCtWC]" && (
                  <Trainingmedia_card />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(
  withTranslation("translations")(Home)
);
