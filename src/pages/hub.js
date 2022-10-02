// styling
import "../style/dashboard.css";

import evolvelogo from "../img/fcfl.png";
import leHubLogo from "../assets/Logos/LOGOS - WHITE/LEHUB_BLEU.png";
// test
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
import axios from "src/axios-config";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { withTranslation, Trans } from "react-i18next";
import wallpaper from "../img/background.png";
import blueCard from "../assets/BUTTONS/BOUTONS_BLEU.png";
import hubService from "../assets/Logos/LOGOS - WHITE/LEHUBSERVICE.png";
import hubRapport from "../assets/Logos/LOGOS - WHITE/LEHUBRAPPORT.png";
import hubReports from "../assets/Logos/LOGOS - WHITE/LEHUBREPORT.png";
import hubResource from "../assets/Logos/LOGOS - WHITE/LEHUBRESOURCE.png";
import hubBibliotheque from "../assets/Logos/LOGOS - WHITE/LEHUBBIBLIOTHEQUE.png";
import hubCAFM from "../assets/Logos/LOGOS - WHITE/LEHUBCAFM.png";
import hubIOT from "../assets/Logos/LOGOS - WHITE/LEHUBIOT.png";
import hubContact from "../assets/Logos/LOGOS - WHITE/LEHUBCONTACT.png";
import hubParametre from "../assets/Logos/LOGOS - WHITE/LEHUBPARAMETRE.png";
import hubSettings from "../assets/Logos/LOGOS - WHITE/LEHUBSETTING.png";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser);
    window.location.href = "./";
  }
}

class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      decoded: {},
      value: "en",
    };
  }

  getUser = (id) => {
    axios
      .get("/api/users/getUser/" + id)
      .then((res) => {
        this.setState({ user: res.data });
        console.log(this.state.user);
        //this.props.i18n.changeLanguage(this.state.user.lang)
      })
      .catch((err) => console.log(err));
  };

  getUserOpts = (id) => {
    let category = "HUB";
    axios.get("/api/users/getUserOpts/" + id + "/" + category).then((res) => {
      let parse = {};
      try {
        parse = JSON.parse(res.data.code);
      } catch (error) {}
      this.setState({ hubOpts: parse });
    });
  };

  getLng = (id) => {
    let category = "language";
    axios.get("/api/users/getUserOpts/" + id + "/" + category).then((res) => {
      this.props.i18n.changeLanguage(res?.data?.code);
    });
  };
  getCAFMLink = (id) => {
    let category = "CAFM";
    axios.get("/api/users/userLinks/" + id + "/" + category).then((res) => {
      if (res.data) {
        this.setState({ cafmlink: res.data.url });
      }
    });
  };
  getSSRSLink = (id) => {
    let category = "SSRS";
    axios.get("/api/users/userLinks/" + id + "/" + category).then((res) => {
      if (res.data) {
        this.setState({ ssrslink: res.data.url });
      }
    });
  };
  getReportsLink = (id) => {
    let category = "Reports";
    axios.get("/api/users/userLinks/" + id + "/" + category).then((res) => {
      if (res.data) {
        const encoded = btoa(res.data.User.email);
        this.setState({
          reportlink: `${res.data.url}?email=${encoded}`,
        });
      }
    });
  };

  getIOTLink = (id) => {
    let category = "IOT";
    axios.get("/api/users/userLinks/" + id + "/" + category).then((res) => {
      if (res.data) {
        this.setState({ iotlink: res.data.url });
      }
    });
  };

  getIdfromToken = () => {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      setAuthToken(token);
      const decoded = jwt_decode(token);
      console.log(decoded.id);
      //this.setState({decoded: decoded.id});
      //console.log(this.state.decoded);
    }
  };

  componentDidMount() {
    const lang = localStorage.i18nextLng;
    this.setState({ language: lang });
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      setAuthToken(token);
      const decoded = jwt_decode(token);
      console.log(decoded.id);
      //this.setState({decoded: decoded.id});
      //console.log(this.state.decoded);
      this.getUser(decoded.id);
      this.getUserOpts(decoded.id);
      this.getLng(decoded.id);
      this.getCAFMLink(decoded.id);
      this.getSSRSLink(decoded.id);
      this.getReportsLink(decoded.id);
      this.getIOTLink(decoded.id);
    }

    console.log(this.props.i18n.language);
    // this.getIdfromToken();
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  };

  cafm = () => {
    var link = this.state.cafmlink;
    if (!link) {
      link = null;
      return link;
    } else {
      console.log(link);
      return link;
    }
  };

  reps = () => {
    var link = this.state.reportlink;
    if (!link) {
      link = null;
      return link;
    } else {
      console.log(link);
      return link;
    }
  };

  SSRSlink = () => {
    var link = this.state.ssrslink;
    if (!link) {
      link = null;
      return link;
    } else {
      console.log(link);
      return link;
    }
  };
  IOTlink = () => {
    var link = this.state.iotlink;
    if (!link) {
      link = null;
      return link;
    } else {
      console.log(link);
      return link;
    }
  };

  serviceCard = () => {
    const ServiceLink = this.SSRSlink();
    if (
      this.state.hubOpts?.Service === true ||
      this.state.hubOpts?.All === true
    ) {
      return (
        <a target="_blank" href={ServiceLink}>
          <img
            class="hub-main-button"
            width="235"
            height="200"
            src={blueCard}
          />
          <img
            class="hub-button-text"
            width="215"
            height="95"
            src={hubService}
          />
        </a>
      );
    } else return null;
  };

  cafmCard = () => {
    const CAFMlink = this.cafm();
    if (this.state.hubOpts?.CAFM === true || this.state.hubOpts?.All === true) {
      return (
        <a target="_blank" href={CAFMlink}>
          <img
            class="hub-main-button"
            width="235"
            height="200"
            src={blueCard}
          />
          <img class="hub-button-text" width="215" height="95" src={hubCAFM} />
        </a>
      );
    } else return null;
  };

  iotCard = () => {
    const IOTlink = this.IOTlink();
    if (this.state.hubOpts?.IOT === true || this.state.hubOpts?.All === true) {
      return (
        <a target="_blank" href={IOTlink}>
          <img
            class="hub-main-button"
            width="235"
            height="200"
            src={blueCard}
          />
          <img class="hub-button-text" width="215" height="95" src={hubIOT} />
        </a>
      );
    } else return null;
  };

  contactCard = () => {
    if (
      this.state.hubOpts?.Contact === true ||
      this.state.hubOpts?.All === true
    ) {
      return (
        <a target="_blank" href="https://support.forumconcepts.fr">
          <img
            class="hub-main-button"
            width="235"
            height="200"
            src={blueCard}
          />
          <img
            class="hub-button-text"
            width="215"
            height="95"
            src={hubContact}
          />
        </a>
      );
    } else return null;
  };

  settingsCard = () => {
    if (
      this.state.hubOpts?.Settings === true ||
      this.state.hubOpts?.All === true
    ) {
      if (localStorage.i18nextLng === "fr") {
        return (
          <Link target="_blank" to="/admin">
            <img
              class="hub-main-button"
              width="235"
              height="200"
              src={blueCard}
            />
            <img
              class="hub-button-text"
              width="215"
              height="95"
              src={hubParametre}
            />
          </Link>
        );
      } else {
        return (
          <Link target="_blank" to="/admin">
            <img
              class="hub-main-button"
              width="235"
              height="200"
              src={blueCard}
            />
            <img
              class="hub-button-text"
              width="215"
              height="95"
              src={hubSettings}
            />
          </Link>
        );
      }
    } else return null;
  };

  reportCard = () => {
    const RepLink = this.reps();
    if (
      this.state.hubOpts?.Reports === true ||
      this.state.hubOpts?.All === true
    ) {
      if (localStorage.i18nextLng === "fr") {
        return (
          <a target="_blank" href={RepLink}>
            <img
              class="hub-main-button"
              width="235"
              height="200"
              src={blueCard}
            />
            ,
            <img
              class="hub-button-text"
              src={hubRapport}
              width="215"
              height="95"
            />
          </a>
        );
      } else {
        return (
          <a target="_blank" href={RepLink}>
            <img
              class="hub-main-button"
              width="235"
              height="200"
              src={blueCard}
            />
            ,
            <img
              class="hub-button-text"
              src={hubReports}
              width="215"
              height="95"
            />
          </a>
        );
      }
    } else return null;
  };

  resourceCard = () => {
    if (
      this.state.hubOpts?.Resource === true ||
      this.state.hubOpts?.All === true
    ) {
      if (localStorage.i18nextLng === "fr") {
        return (
          <Link target="_blank" to="/dashboard">
            <img
              class="hub-main-button"
              width="235"
              height="200"
              src={blueCard}
            />
            <img
              class="hub-button-text"
              src={hubBibliotheque}
              width="215"
              height="95"
            />
          </Link>
        );
      } else {
        return (
          <Link target="_blank" to="/dashboard">
            <img
              class="hub-main-button"
              width="235"
              height="200"
              src={blueCard}
            />
            <img
              class="hub-button-text"
              src={hubResource}
              width="215"
              height="95"
            />
          </Link>
        );
      }
    } else return null;
  };

  render() {
    const { t, i18n } = this.props;
    const myStyle = {
      backgroundImage: `url(${wallpaper})`,
      height: "auto",
      maxWidth: "auto",
      minHeight: "100vh",
      marginTop: "0px",
      fontSize: "50px",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };

    return (
      <div className="Home" style={myStyle}>
        <header>
          <div className="container">
            <div className="row">
              <div className="col s1 m1">
                <img id="logo-evolve" alt="_" src={leHubLogo} />
              </div>
              <div className="col offset-s10 offset-m12">
                <button
                  id="lgout-btn-home"
                  onClick={this.onLogoutClick}
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  className="btn btn-large waves-effect waves-dark hoverable white black-text accent-3"
                >
                  <Trans>{t("logOut")}</Trans>
                </button>
              </div>
            </div>
          </div>
        </header>
        <div class="hub-container-right">
          <div class="container-column">
            <div class="welcome-message">
              <h3>
                <Trans>{t("hello")}</Trans> {this.state.user.name}!
              </h3>
              <p>
                <Trans>{t("welcomeMessage")}</Trans>
              </p>
            </div>
          </div>
        </div>
        <div class="hub-container">
          <div class="hub-card">
            <this.serviceCard />
          </div>
          <div class="hub-card">
            <this.reportCard />
          </div>
          <div class="hub-card">
            <this.resourceCard />
          </div>
        </div>

        <div class="hub-container">
          <div class="hub-card">
            <this.cafmCard />
          </div>
          <div class="hub-card">
            <this.iotCard />
          </div>
          <div class="hub-card">
            <this.contactCard />
          </div>
        </div>
        <div class="hub-container">
          <div class="hub-card">
            <this.settingsCard />
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  token: state.auth.token,
});
export default connect(mapStateToProps, { logoutUser })(
  withTranslation("translations")(Home)
);
