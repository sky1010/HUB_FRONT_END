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
import wallpaper from "../assets/BACKGROUNDS/3.svg";
import hubBibliothèque from "../assets/Logos/LOGOS - WHITE/LEHUBBIBLIOTHEQUE.png";
import hubResource from "../assets/Logos/LOGOS - WHITE/LEHUBRESOURCE.png";
import orangeCard from "../assets/BUTTONS/BOUTONS_ORANGE.png";

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

  getLng = (id) => {
    let category = "language";
    axios.get("/api/users/getUserOpts/" + id + "/" + category).then((res) => {
      this.props.i18n.changeLanguage(res.data.code);
    });
  };

  getUserOpts = (id) => {
    let category = "RI";
    axios.get("/api/users/getUserOpts/" + id + "/" + category).then((res) => {
      this.setState({ resourceOpts: JSON.parse(res.data.code) });
      console.log(this.state.resourceOpts);
    });
  };
  ResourceTitle = () => {
    if (localStorage.i18nextLng === "fr") {
      return (
        <img
          widht="200"
          height="150"
          id="home-page-title"
          src={hubBibliothèque}
        />
      );
    } else {
      return (
        <img widht="200" height="150" id="home-page-title" src={hubResource} />
      );
    }
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
      this.getLng(decoded.id);
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

  templatesCard = () => {
    const { t, i18n } = this.props;
    if (
      this.state.resourceOpts?.Templates === true ||
      this.state.resourceOpts?.All === true
    ) {
      return (
        <Link to="/templates">
          <img
            width="235"
            height="200"
            class="resource-main-button"
            src={orangeCard}
          />
          <svg
            class="resource-button-text"
            xmlns="http://www.w3.org/2000/svg"
            width="250"
            height="280"
            viewBox="0 0 130 185"
          >
            <g
              id="Group_63"
              data-name="Group 63"
              transform="translate(0.227 0.246)"
            >
              <g
                id="Group_2"
                data-name="Group 2"
                transform="translate(57.319 40.53)"
              >
                <path
                  id="Path_1"
                  data-name="Path 1"
                  d="M159.864,43.611l-.067-.01-.06-.007-.081,0-.035,0H109.434l-.035,0-.08,0-.062.007a1.341,1.341,0,0,0-1.155,1.177c0,.016,0,.033,0,.049s0,.058,0,.087c0,.005,0,.01,0,.015.06,23.442-.177,23.135.223,23.74a1.351,1.351,0,0,0,1.119.6h50.2a1.341,1.341,0,0,0,1.326-1.326s0-.009,0-.014v-23s0-.009,0-.014a1.342,1.342,0,0,0-1.1-1.3Zm-6.388,2.659-18.948,8.684L115.579,46.27Zm-42.7.749,20.534,9.41-20.534,9.41Zm4.8,19.569L134.527,57.9l18.948,8.684Zm42.7-.749-20.533-9.41,20.533-9.41Z"
                  transform="translate(-99.225 -35.805)"
                  fill="#00000"
                />
                <path
                  id="Path_2"
                  data-name="Path 2"
                  d="M125.01,0H62.517A4.022,4.022,0,0,0,58.5,4.017v23a1.339,1.339,0,1,0,2.678,0v-23a1.341,1.341,0,0,1,1.339-1.339H125.01a1.341,1.341,0,0,1,1.339,1.339V87.4a1.341,1.341,0,0,1-1.339,1.339H62.517A1.341,1.341,0,0,1,61.178,87.4V32.37a1.339,1.339,0,1,0-2.678,0V87.4a4.022,4.022,0,0,0,4.017,4.017H125.01a4.022,4.022,0,0,0,4.017-4.017V4.017A4.022,4.022,0,0,0,125.01,0Z"
                  transform="translate(-58.5)"
                  fill="##00000"
                />
                <path
                  id="Path_3"
                  data-name="Path 3"
                  d="M108.167,236.042a1.341,1.341,0,0,0,1.341,1.341h19.437a1.341,1.341,0,0,0,1.341-1.341V221.294a1.341,1.341,0,0,0-1.341-1.341H109.508a1.341,1.341,0,0,0-1.341,1.341Zm2.682-13.407H127.6V234.7H110.849Z"
                  transform="translate(-99.299 -180.634)"
                  fill="##00000"
                />
                <path
                  id="Path_4"
                  data-name="Path 4"
                  d="M303.138,219.953H284a1.341,1.341,0,1,0,0,2.682h19.134a1.341,1.341,0,1,0,0-2.682Z"
                  transform="translate(-242.593 -180.634)"
                  fill="##00000"
                />
                <path
                  id="Path_5"
                  data-name="Path 5"
                  d="M303.138,261.191H284a1.341,1.341,0,1,0,0,2.682h19.134a1.341,1.341,0,1,0,0-2.682Z"
                  transform="translate(-242.593 -214.498)"
                  fill="##00000"
                />
                <path
                  id="Path_6"
                  data-name="Path 6"
                  d="M303.138,302.43H284a1.341,1.341,0,1,0,0,2.682h19.134a1.341,1.341,0,1,0,0-2.682Z"
                  transform="translate(-242.593 -248.363)"
                  fill="##00000"
                />
                <path
                  id="Path_7"
                  data-name="Path 7"
                  d="M301.751,366.785H282.315a1.341,1.341,0,0,0-1.341,1.341v14.748a1.341,1.341,0,0,0,1.341,1.341h19.436a1.341,1.341,0,0,0,1.341-1.341V368.126A1.341,1.341,0,0,0,301.751,366.785Zm-1.341,14.748H283.656V369.467H300.41Z"
                  transform="translate(-241.206 -301.21)"
                  fill="#00000"
                />
                <path
                  id="Path_8"
                  data-name="Path 8"
                  d="M109.508,369.467h19.134a1.341,1.341,0,1,0,0-2.682H109.508a1.341,1.341,0,1,0,0,2.682Z"
                  transform="translate(-99.299 -301.21)"
                  fill="##00000"
                />
                <path
                  id="Path_9"
                  data-name="Path 9"
                  d="M109.508,410.705h19.134a1.341,1.341,0,0,0,0-2.682H109.508a1.341,1.341,0,0,0,0,2.682Z"
                  transform="translate(-99.299 -335.074)"
                  fill="##00000"
                />
                <path
                  id="Path_10"
                  data-name="Path 10"
                  d="M109.508,451.944h19.134a1.341,1.341,0,1,0,0-2.682H109.508a1.341,1.341,0,1,0,0,2.682Z"
                  transform="translate(-99.299 -368.939)"
                  fill="##00000"
                />
              </g>
            </g>
            <text
              id="Fichier_Import"
              data-name="Fichier Import"
              transform="translate(50 154)"
              fill="#707070"
              font-size="14"
              font-family="Test"
            >
              <tspan x="0" y="0">
                <Trans>{t("templatesCard")}</Trans>
              </tspan>
            </text>
          </svg>
        </Link>
      );
    } else return null;
  };
  checklistCard = () => {
    const { t, i18n } = this.props;
    if (
      this.state.resourceOpts?.Checklist === true ||
      this.state.resourceOpts?.All === true
    ) {
      return (
        <Link to="/Checklists">
          <img
            width="235"
            height="200"
            class="resource-main-button"
            src={orangeCard}
          />
          <svg
            class="resource-button-text"
            xmlns="http://www.w3.org/2000/svg"
            width="250"
            height="280"
            viewBox="0 0 130 185"
          >
            <g
              id="Group_64"
              data-name="Group 64"
              transform="translate(0.355 0.246)"
            >
              <g
                id="Group_31"
                data-name="Group 31"
                transform="translate(51.945 36.72)"
              >
                <g
                  id="Group_4"
                  data-name="Group 4"
                  transform="translate(38.983 29.334)"
                >
                  <g id="Group_3" data-name="Group 3" transform="translate(0)">
                    <path
                      id="Path_11"
                      data-name="Path 11"
                      d="M275.721,152H247.931a1.93,1.93,0,0,0,0,3.86h27.791a1.93,1.93,0,0,0,0-3.86Z"
                      transform="translate(-246.001 -152)"
                      fill="#00000"
                    />
                  </g>
                </g>
                <g
                  id="Group_6"
                  data-name="Group 6"
                  transform="translate(58.657 38.598)"
                >
                  <g id="Group_5" data-name="Group 5">
                    <path
                      id="Path_12"
                      data-name="Path 12"
                      d="M351.235,200.566a1.929,1.929,0,1,0,.565,1.364A1.944,1.944,0,0,0,351.235,200.566Z"
                      transform="translate(-347.941 -200.001)"
                      fill="#00000"
                    />
                  </g>
                </g>
                <g
                  id="Group_8"
                  data-name="Group 8"
                  transform="translate(38.982 8.299)"
                >
                  <g id="Group_7" data-name="Group 7" transform="translate(0)">
                    <path
                      id="Path_13"
                      data-name="Path 13"
                      d="M249.285,43.566a1.929,1.929,0,1,0,.565,1.364A1.944,1.944,0,0,0,249.285,43.566Z"
                      transform="translate(-245.991 -43.001)"
                      fill="#00000"
                    />
                  </g>
                </g>
                <g
                  id="Group_10"
                  data-name="Group 10"
                  transform="translate(38.983 38.598)"
                >
                  <g id="Group_9" data-name="Group 9">
                    <path
                      id="Path_14"
                      data-name="Path 14"
                      d="M259.486,200H247.931a1.93,1.93,0,0,0,0,3.86h11.556a1.93,1.93,0,0,0,0-3.86Z"
                      transform="translate(-246.001 -200)"
                      fill="#00000"
                    />
                  </g>
                </g>
                <g
                  id="Group_12"
                  data-name="Group 12"
                  transform="translate(38.983 50.177)"
                >
                  <g
                    id="Group_11"
                    data-name="Group 11"
                    transform="translate(0)"
                  >
                    <path
                      id="Path_15"
                      data-name="Path 15"
                      d="M275.721,260H247.931a1.93,1.93,0,0,0,0,3.86h27.791a1.93,1.93,0,1,0,0-3.86Z"
                      transform="translate(-246.001 -260)"
                      fill="#00000"
                    />
                  </g>
                </g>
                <g
                  id="Group_14"
                  data-name="Group 14"
                  transform="translate(58.657 59.44)"
                >
                  <g id="Group_13" data-name="Group 13">
                    <path
                      id="Path_16"
                      data-name="Path 16"
                      d="M351.235,308.566a1.929,1.929,0,1,0,.565,1.364A1.944,1.944,0,0,0,351.235,308.566Z"
                      transform="translate(-347.941 -308.001)"
                      fill="#00000"
                    />
                  </g>
                </g>
                <g
                  id="Group_16"
                  data-name="Group 16"
                  transform="translate(38.983 59.44)"
                >
                  <g id="Group_15" data-name="Group 15">
                    <path
                      id="Path_17"
                      data-name="Path 17"
                      d="M259.486,308H247.931a1.93,1.93,0,0,0,0,3.86h11.556a1.93,1.93,0,0,0,0-3.86Z"
                      transform="translate(-246.001 -308)"
                      fill="#00000"
                    />
                  </g>
                </g>
                <g
                  id="Group_18"
                  data-name="Group 18"
                  transform="translate(38.983 71.019)"
                >
                  <g
                    id="Group_17"
                    data-name="Group 17"
                    transform="translate(0)"
                  >
                    <path
                      id="Path_18"
                      data-name="Path 18"
                      d="M275.721,368H247.931a1.93,1.93,0,1,0,0,3.86h27.791a1.93,1.93,0,1,0,0-3.86Z"
                      transform="translate(-246.001 -368)"
                      fill="#00000"
                    />
                  </g>
                </g>
                <g
                  id="Group_20"
                  data-name="Group 20"
                  transform="translate(58.657 80.283)"
                >
                  <g id="Group_19" data-name="Group 19">
                    <path
                      id="Path_19"
                      data-name="Path 19"
                      d="M351.235,416.566a1.929,1.929,0,1,0,.565,1.364A1.944,1.944,0,0,0,351.235,416.566Z"
                      transform="translate(-347.941 -416.001)"
                      fill="#00000"
                    />
                  </g>
                </g>
                <g
                  id="Group_22"
                  data-name="Group 22"
                  transform="translate(38.983 80.283)"
                >
                  <g id="Group_21" data-name="Group 21">
                    <path
                      id="Path_20"
                      data-name="Path 20"
                      d="M259.486,416H247.931a1.93,1.93,0,0,0,0,3.86h11.556a1.93,1.93,0,0,0,0-3.86Z"
                      transform="translate(-246.001 -416)"
                      fill="#00000"
                    />
                  </g>
                </g>
                <g id="Group_24" data-name="Group 24" transform="translate(0)">
                  <g
                    id="Group_23"
                    data-name="Group 23"
                    transform="translate(0)"
                  >
                    <path
                      id="Path_21"
                      data-name="Path 21"
                      d="M116.418,7.527h-14.74A11.824,11.824,0,0,0,93.5,4.246H91.808a7.719,7.719,0,0,0-13.787,0H76.326a11.824,11.824,0,0,0-8.18,3.281H53.411A9.42,9.42,0,0,0,44,16.936V89.4a9.42,9.42,0,0,0,9.41,9.41h63.007a9.42,9.42,0,0,0,9.41-9.41V16.936A9.42,9.42,0,0,0,116.418,7.527Zm-40.092.579h3.008a1.93,1.93,0,0,0,1.86-1.416,3.86,3.86,0,0,1,7.439,0,1.93,1.93,0,0,0,1.86,1.416h3a8.02,8.02,0,0,1,7.981,7.334H68.346A8.02,8.02,0,0,1,76.326,8.105ZM121.968,89.4a5.556,5.556,0,0,1-5.55,5.55H53.411a5.556,5.556,0,0,1-5.55-5.55V16.936a5.556,5.556,0,0,1,5.55-5.55H65.443a11.8,11.8,0,0,0-.985,4.728v1.254a1.93,1.93,0,0,0,1.93,1.93h37.05a1.93,1.93,0,0,0,1.93-1.93V16.115a11.8,11.8,0,0,0-.985-4.728h12.036a5.556,5.556,0,0,1,5.55,5.55Z"
                      transform="translate(-44.001 0)"
                      fill="#00000"
                    />
                  </g>
                </g>
                <g
                  id="Group_26"
                  data-name="Group 26"
                  transform="translate(11.822 28.305)"
                >
                  <g id="Group_25" data-name="Group 25">
                    <path
                      id="Path_22"
                      data-name="Path 22"
                      d="M122.08,147.232a1.93,1.93,0,0,0-2.729,0l-8.253,8.253-2.542-2.542a1.93,1.93,0,0,0-2.729,2.729l3.907,3.907a1.93,1.93,0,0,0,2.729,0l9.617-9.617A1.93,1.93,0,0,0,122.08,147.232Z"
                      transform="translate(-105.261 -146.667)"
                      fill="#00000"
                    />
                  </g>
                </g>
                <g
                  id="Group_28"
                  data-name="Group 28"
                  transform="translate(12.737 71.019)"
                >
                  <g
                    id="Group_27"
                    data-name="Group 27"
                    transform="translate(0)"
                  >
                    <path
                      id="Path_23"
                      data-name="Path 23"
                      d="M121.194,368h-9.263a1.93,1.93,0,0,0-1.93,1.93v9.263a1.93,1.93,0,0,0,1.93,1.93h9.263a1.93,1.93,0,0,0,1.93-1.93V369.93A1.93,1.93,0,0,0,121.194,368Zm-1.93,9.263h-5.4v-5.4h5.4Z"
                      transform="translate(-110.001 -368)"
                      fill="#00000"
                    />
                  </g>
                </g>
                <g
                  id="Group_30"
                  data-name="Group 30"
                  transform="translate(12.737 50.177)"
                >
                  <g
                    id="Group_29"
                    data-name="Group 29"
                    transform="translate(0)"
                  >
                    <path
                      id="Path_24"
                      data-name="Path 24"
                      d="M121.194,260h-9.263a1.93,1.93,0,0,0-1.93,1.93v9.263a1.93,1.93,0,0,0,1.93,1.93h9.263a1.93,1.93,0,0,0,1.93-1.93V261.93A1.93,1.93,0,0,0,121.194,260Zm-1.93,9.263h-5.4v-5.4h5.4Z"
                      transform="translate(-110.001 -260)"
                      fill="#00000"
                    />
                  </g>
                </g>
              </g>
            </g>
            <text
              id="Checklists"
              transform="translate(60 154)"
              fill="#707070"
              font-size="14"
              font-family="Test"
            >
              <tspan x="0" y="0">
                <Trans>{t("checklistCard")}</Trans>
              </tspan>
            </text>
          </svg>
        </Link>
      );
    } else return null;
  };
  workflowsCard = () => {
    const { t, i18n } = this.props;
    if (
      this.state.resourceOpts?.Workflows === true ||
      this.state.resourceOpts?.All === true
    ) {
      return (
        <Link to="/Workflows">
          <img
            width="235"
            height="200"
            class="resource-main-button"
            src={orangeCard}
          />
          <svg
            class="resource-button-text"
            xmlns="http://www.w3.org/2000/svg"
            width="250"
            height="280"
            viewBox="0 0 130 185"
          >
            <g
              id="Group_65"
              data-name="Group 65"
              transform="translate(0.482 0.246)"
            >
              <g
                id="Group_32"
                data-name="Group 32"
                transform="translate(44.78 38.511)"
              >
                <path
                  id="Path_25"
                  data-name="Path 25"
                  d="M24,6H49.394V9.174H24Z"
                  transform="translate(10.917 0.349)"
                  fill="#00000"
                />
                <path
                  id="Path_26"
                  data-name="Path 26"
                  d="M24,10H49.394v3.174H24Z"
                  transform="translate(10.917 2.697)"
                  fill="#00000"
                />
                <path
                  id="Path_27"
                  data-name="Path 27"
                  d="M24,14H49.394v3.174H24Z"
                  transform="translate(10.917 5.045)"
                  fill="#00000"
                />
                <path
                  id="Path_28"
                  data-name="Path 28"
                  d="M27,27H49.22v3.174H27Z"
                  transform="translate(12.678 12.678)"
                  fill="#00000"
                />
                <path
                  id="Path_29"
                  data-name="Path 29"
                  d="M25,31H47.22v3.174H25Z"
                  transform="translate(11.504 15.027)"
                  fill="#00000"
                />
                <path
                  id="Path_30"
                  data-name="Path 30"
                  d="M23,35H45.22v3.174H23Z"
                  transform="translate(10.33 17.375)"
                  fill="#00000"
                />
                <path
                  id="Path_31"
                  data-name="Path 31"
                  d="M24,48H39.762v3.125H24Z"
                  transform="translate(10.917 25.008)"
                  fill="#00000"
                />
                <path
                  id="Path_32"
                  data-name="Path 32"
                  d="M24,52H49.394v3.174H24Z"
                  transform="translate(10.917 27.356)"
                  fill="#00000"
                />
                <path
                  id="Path_33"
                  data-name="Path 33"
                  d="M24,56H49.394v3.174H24Z"
                  transform="translate(10.917 29.705)"
                  fill="#00000"
                />
                <path
                  id="Path_34"
                  data-name="Path 34"
                  d="M20.252,84.53H30.568V95.64a1.587,1.587,0,0,0,1.587,1.587H67.072a1.587,1.587,0,0,0,1.587-1.587V84.53h3.284a12.7,12.7,0,1,0,0-3.174H68.659V70.246a1.587,1.587,0,0,0-1.587-1.587H32.155a1.587,1.587,0,0,0-1.587,1.587v11.11H20.252a15.078,15.078,0,1,1,0-30.155h9.613L25.908,61.754A1.587,1.587,0,0,0,27.394,63.9H62.311a1.588,1.588,0,0,0,1.486-1.03L68.172,51.2h10.8a18.252,18.252,0,0,0,0-36.5H68.659V3.587A1.587,1.587,0,0,0,67.072,2H32.155a1.587,1.587,0,0,0-1.587,1.587V28.981a1.587,1.587,0,0,0,1.587,1.587H67.072a1.587,1.587,0,0,0,1.587-1.587V17.871H78.976a15.078,15.078,0,0,1,0,30.155H69.363L73.32,37.474a1.587,1.587,0,0,0-1.486-2.144H36.917a1.588,1.588,0,0,0-1.486,1.03L31.055,48.027h-10.8a18.252,18.252,0,0,0,0,36.5ZM84.53,73.421a9.523,9.523,0,1,1-9.523,9.523A9.533,9.533,0,0,1,84.53,73.421ZM33.742,71.833H65.485v22.22H33.742ZM65.485,27.394H33.742V5.174H65.485ZM38.017,38.5H69.543L61.21,60.724H29.685Z"
                  transform="translate(-2 -2)"
                  fill="#00000"
                />
                <path
                  id="Path_35"
                  data-name="Path 35"
                  d="M54.589,59.351a1.582,1.582,0,0,0,1.122-.465l6.348-6.348-2.244-2.244-5.226,5.226-2.052-2.052-2.244,2.244,3.174,3.174a1.582,1.582,0,0,0,1.122.465Z"
                  transform="translate(26.354 26.354)"
                  fill="#00000"
                />
              </g>
            </g>
            <text
              id="Procédures"
              transform="translate(57 154)"
              fill="#707070"
              font-size="14"
              font-family="Test"
            >
              <tspan x="0" y="0">
                <Trans>{t("workflowsCard")}</Trans>
              </tspan>
            </text>
          </svg>
        </Link>
      );
    } else return null;
  };
  contractorCard = () => {
    const { t, i18n } = this.props;
    if (
      this.state.resourceOpts?.Contractor === true ||
      this.state.resourceOpts?.All === true
    ) {
      return (
        <Link to="/contractor">
          <img
            width="235"
            height="200"
            class="resource-main-button"
            src={orangeCard}
          />
          <svg
            class="resource-button-text"
            xmlns="http://www.w3.org/2000/svg"
            width="250"
            height="280"
            viewBox="0 0 130 185"
          >
            <g
              id="Group_33"
              data-name="Group 33"
              transform="translate(48.717 36.763)"
            >
              <path
                id="Path_44"
                data-name="Path 44"
                d="M33.175,24H29.881a3.294,3.294,0,0,1-6.587,0H20a6.587,6.587,0,0,0,13.175,0Z"
                transform="translate(4.702 12.23)"
              />
              <rect
                id="Rectangle_14"
                data-name="Rectangle 14"
                width="4"
                height="3"
                transform="translate(23.283 29.237)"
              />
              <rect
                id="Rectangle_15"
                data-name="Rectangle 15"
                width="3"
                height="3"
                transform="translate(36.283 29.237)"
              />
              <path
                id="Path_45"
                data-name="Path 45"
                d="M93.748,78.66l-3.294-6.587a1.627,1.627,0,0,0-1.466-.906H79.107v-4.94a1.647,1.647,0,0,0-1.647-1.647H67.267a11.635,11.635,0,0,0-8.152-8.514L44.524,51.817V49.182a16.506,16.506,0,0,0,8.234-14.245V29.7a4.917,4.917,0,0,0-.066-9.3A16.3,16.3,0,0,0,41.23,6.051V5.294A3.3,3.3,0,0,0,37.937,2H34.643a3.3,3.3,0,0,0-3.294,3.294v.758A16.3,16.3,0,0,0,19.887,20.4a4.917,4.917,0,0,0-.066,9.3v5.237a16.506,16.506,0,0,0,8.234,14.245v2.635L13.481,56.065A11.562,11.562,0,0,0,5,67.182V99.163a1.647,1.647,0,0,0,1.647,1.647H92.282a1.647,1.647,0,0,0,1.647-1.647V79.4A1.647,1.647,0,0,0,93.748,78.66ZM75.814,67.873v3.294H62.639V67.873Zm-28-11.676v2.075a5.127,5.127,0,0,0-3.294,0v-3.03ZM41.23,9.542a13.352,13.352,0,0,1,8.119,10.573H41.23ZM34.643,5.294h3.294V20.115H34.643ZM31.349,9.542V20.115H23.23A13.353,13.353,0,0,1,31.349,9.542ZM19.821,25.056a1.647,1.647,0,0,1,1.647-1.647H51.111a1.647,1.647,0,0,1,0,3.294H21.468A1.647,1.647,0,0,1,19.821,25.056Zm3.294,9.881V30H49.464v4.94a13.175,13.175,0,0,1-26.349,0ZM41.23,50.647v6.521l-4.94,3.705-4.941-3.705V50.647a16.49,16.49,0,0,0,9.881,0ZM24.762,56.2l3.294-.955v3.03a5.127,5.127,0,0,0-3.294,0ZM38.118,78.66a1.647,1.647,0,0,0-.181.741V97.516H19.821v-24.7H16.528v24.7H8.294V67.182a8.292,8.292,0,0,1,6.093-7.954l7.081-2.059v5.764a1.647,1.647,0,1,0,3.294,0,1.647,1.647,0,1,1,3.294,0,1.647,1.647,0,1,0,3.294,0V61.286L35.3,64.25a1.647,1.647,0,0,0,1.976,0l3.952-2.964v1.647a1.647,1.647,0,1,0,3.294,0,1.647,1.647,0,1,1,3.294,0,1.647,1.647,0,1,0,3.294,0V57.169l7.1,2.059a8.234,8.234,0,0,1,5.632,5.352H60.992a1.647,1.647,0,0,0-1.647,1.647v4.94H42.877a1.627,1.627,0,0,0-1.466.906ZM57.7,97.516H41.23V79.8L43.9,74.461H55.031L57.7,79.8Zm32.937,0H60.992V85.988h9.881a4.94,4.94,0,1,0,9.881,0h9.881ZM74.167,85.988V82.695a1.647,1.647,0,0,1,3.294,0v3.294a1.647,1.647,0,0,1-3.294,0Zm16.468-3.294H80.754a4.94,4.94,0,0,0-9.881,0H60.992V79.4a1.647,1.647,0,0,0-.181-.741l-2.091-4.2H87.967L90.635,79.8Z"
                transform="translate(-5 -2)"
              />
            </g>
            <g
              id="Group_68"
              data-name="Group 68"
              transform="translate(0.355 0.043)"
            >
              <g
                id="Group_34"
                data-name="Group 34"
                transform="translate(48.181 36.552)"
              >
                <path
                  id="Path_44-2"
                  data-name="Path 44"
                  d="M33.175,24H29.881a3.294,3.294,0,0,1-6.587,0H20a6.587,6.587,0,0,0,13.175,0Z"
                  transform="translate(4.702 12.23)"
                  fill="#00000"
                />
                <rect
                  id="Rectangle_14-2"
                  data-name="Rectangle 14"
                  width="3.582"
                  height="2.687"
                  transform="translate(23.286 29.555)"
                  fill="#00000"
                />
                <rect
                  id="Rectangle_15-2"
                  data-name="Rectangle 15"
                  width="2.687"
                  height="2.687"
                  transform="translate(36.72 29.555)"
                  fill="#00000"
                />
                <path
                  id="Path_45-2"
                  data-name="Path 45"
                  d="M93.748,78.66l-3.294-6.587a1.627,1.627,0,0,0-1.466-.906H79.107v-4.94a1.647,1.647,0,0,0-1.647-1.647H67.267a11.635,11.635,0,0,0-8.152-8.514L44.524,51.817V49.182a16.506,16.506,0,0,0,8.234-14.245V29.7a4.917,4.917,0,0,0-.066-9.3A16.3,16.3,0,0,0,41.23,6.051V5.294A3.3,3.3,0,0,0,37.937,2H34.643a3.3,3.3,0,0,0-3.294,3.294v.758A16.3,16.3,0,0,0,19.887,20.4a4.917,4.917,0,0,0-.066,9.3v5.237a16.506,16.506,0,0,0,8.234,14.245v2.635L13.481,56.065A11.562,11.562,0,0,0,5,67.182V99.163a1.647,1.647,0,0,0,1.647,1.647H92.282a1.647,1.647,0,0,0,1.647-1.647V79.4A1.647,1.647,0,0,0,93.748,78.66ZM75.814,67.873v3.294H62.639V67.873Zm-28-11.676v2.075a5.127,5.127,0,0,0-3.294,0v-3.03ZM41.23,9.542a13.352,13.352,0,0,1,8.119,10.573H41.23ZM34.643,5.294h3.294V20.115H34.643ZM31.349,9.542V20.115H23.23A13.353,13.353,0,0,1,31.349,9.542ZM19.821,25.056a1.647,1.647,0,0,1,1.647-1.647H51.111a1.647,1.647,0,0,1,0,3.294H21.468A1.647,1.647,0,0,1,19.821,25.056Zm3.294,9.881V30H49.464v4.94a13.175,13.175,0,0,1-26.349,0ZM41.23,50.647v6.521l-4.94,3.705-4.941-3.705V50.647a16.49,16.49,0,0,0,9.881,0ZM24.762,56.2l3.294-.955v3.03a5.127,5.127,0,0,0-3.294,0ZM38.118,78.66a1.647,1.647,0,0,0-.181.741V97.516H19.821v-24.7H16.528v24.7H8.294V67.182a8.292,8.292,0,0,1,6.093-7.954l7.081-2.059v5.764a1.647,1.647,0,1,0,3.294,0,1.647,1.647,0,1,1,3.294,0,1.647,1.647,0,1,0,3.294,0V61.286L35.3,64.25a1.647,1.647,0,0,0,1.976,0l3.952-2.964v1.647a1.647,1.647,0,1,0,3.294,0,1.647,1.647,0,1,1,3.294,0,1.647,1.647,0,1,0,3.294,0V57.169l7.1,2.059a8.234,8.234,0,0,1,5.632,5.352H60.992a1.647,1.647,0,0,0-1.647,1.647v4.94H42.877a1.627,1.627,0,0,0-1.466.906ZM57.7,97.516H41.23V79.8L43.9,74.461H55.031L57.7,79.8Zm32.937,0H60.992V85.988h9.881a4.94,4.94,0,1,0,9.881,0h9.881ZM74.167,85.988V82.695a1.647,1.647,0,0,1,3.294,0v3.294a1.647,1.647,0,0,1-3.294,0Zm16.468-3.294H80.754a4.94,4.94,0,0,0-9.881,0H60.992V79.4a1.647,1.647,0,0,0-.181-.741l-2.091-4.2H87.967L90.635,79.8Z"
                  transform="translate(-5 -2)"
                  fill="#00000"
                />
              </g>
            </g>
            <g
              id="Group_71"
              data-name="Group 71"
              transform="translate(73.569 122.758)"
            >
              <text
                id="Prestataire"
                transform="translate(-13.569 30.242)"
                fill="#707070"
                font-size="14"
                font-family="Test"
              >
                <tspan x="0" y="0">
                  <Trans>{t("contractorCard")}</Trans>
                </tspan>
              </text>
            </g>
          </svg>
        </Link>
      );
    } else return null;
  };

  mediaCard = () => {
    const { t, i18n } = this.props;
    if (
      this.state.resourceOpts?.Medias === true ||
      this.state.resourceOpts?.All === true
    ) {
      return (
        <Link to="/Training-media">
          <img
            width="235"
            height="200"
            class="resource-main-button"
            src={orangeCard}
          />
          <svg
            class="resource-button-text"
            xmlns="http://www.w3.org/2000/svg"
            width="250"
            height="280"
            viewBox="0 0 130 185"
          >
            <g
              id="Group_66"
              data-name="Group 66"
              transform="translate(-0.391 0.246)"
            >
              <g
                id="media-monitor-screen-Digital_Marketing"
                data-name="media-monitor-screen-Digital Marketing"
                transform="translate(42.989 36.72)"
              >
                <path
                  id="Path_36"
                  data-name="Path 36"
                  d="M95.868,23.409H92.574V21.762h1.647a4.94,4.94,0,0,0,0-9.881H92.574V3.647A1.594,1.594,0,0,0,91.9,2.33a1.632,1.632,0,0,0-1.449-.263L69.272,8.588H57.991a1.647,1.647,0,0,0-1.647,1.647v1.647H53.051A1.647,1.647,0,0,0,51.4,13.528v6.587a1.647,1.647,0,0,0,1.647,1.647h3.294v1.647H46.464V8.588a1.647,1.647,0,0,0-1.647-1.647H11.881a1.647,1.647,0,0,0-1.647,1.647V23.409H6.94A4.955,4.955,0,0,0,2,28.349v52.7a4.955,4.955,0,0,0,4.94,4.94H44.817v4.94H34.936a1.647,1.647,0,0,0-1.647,1.647v6.587a1.647,1.647,0,0,0,1.647,1.647H67.872a1.647,1.647,0,0,0,1.647-1.647V92.575a1.647,1.647,0,0,0-1.647-1.647H57.991v-4.94H95.868a4.955,4.955,0,0,0,4.94-4.94v-52.7a4.955,4.955,0,0,0-4.94-4.94Zm-3.294-8.234h1.647a1.647,1.647,0,1,1,0,3.294H92.574ZM71.166,11.453,89.281,5.871v21.9L71.166,22.19Zm-11.528.428h8.234v9.881H59.638Zm4.693,13.174L63.146,33.29H61.285V25.056ZM54.7,18.469V15.175h1.647v3.294Zm-41.17-8.234H43.17V33.29H13.528Zm52.7,83.987v3.294H36.583V94.222ZM48.111,90.928v-4.94H54.7v4.94Zm49.4-9.881a1.647,1.647,0,0,1-1.647,1.647H6.94a1.647,1.647,0,0,1-1.647-1.647V79.4H97.515Zm0-4.94H5.294V28.349A1.647,1.647,0,0,1,6.94,26.7h3.294v8.234a1.647,1.647,0,0,0,1.647,1.647H44.817a1.647,1.647,0,0,0,1.647-1.647V26.7H57.991v8.234a1.647,1.647,0,0,0,1.647,1.647h4.94a1.647,1.647,0,0,0,1.63-1.416l1.449-10.112h1.614L90.45,31.577a1.523,1.523,0,0,0,.478.066A1.672,1.672,0,0,0,92.574,30V26.7h3.294a1.647,1.647,0,0,1,1.647,1.647Z"
                  transform="translate(-2 -1.999)"
                  fill="#00000"
                />
                <path
                  id="Path_37"
                  data-name="Path 37"
                  d="M7.647,56.643H50.464A1.647,1.647,0,0,0,52.111,55V28.647A1.647,1.647,0,0,0,50.464,27H7.647A1.647,1.647,0,0,0,6,28.647V55A1.647,1.647,0,0,0,7.647,56.643Zm1.647-3.294V31.593l18.9,11.631a1.647,1.647,0,0,0,1.726,0l18.9-11.631V53.349Zm4.171-23.055H44.646l-15.59,9.594Z"
                  transform="translate(0.587 14.172)"
                  fill="#00000"
                />
                <path
                  id="Path_38"
                  data-name="Path 38"
                  d="M37.647,48.055H40.94V53a1.647,1.647,0,0,0,1.647,1.647h28A1.647,1.647,0,0,0,72.23,53V33.234a1.647,1.647,0,0,0-1.647-1.647H68.936v-4.94A1.647,1.647,0,0,0,67.289,25H37.647A1.647,1.647,0,0,0,36,26.647V46.408A1.647,1.647,0,0,0,37.647,48.055Zm31.289,3.294h-24.7V34.881h24.7ZM39.294,28.294H65.643v3.294H42.587a1.647,1.647,0,0,0-1.647,1.647V44.762H39.294Z"
                  transform="translate(19.991 12.878)"
                  fill="#00000"
                />
                <path
                  id="Path_39"
                  data-name="Path 39"
                  d="M43,33h3.294v3.294H43Z"
                  transform="translate(24.519 18.052)"
                  fill="#00000"
                />
                <path
                  id="Path_40"
                  data-name="Path 40"
                  d="M47,33H58.528v3.294H47Z"
                  transform="translate(27.106 18.052)"
                  fill="#00000"
                />
                <path
                  id="Path_41"
                  data-name="Path 41"
                  d="M43,37h6.587v3.294H43Z"
                  transform="translate(24.519 20.64)"
                  fill="#00000"
                />
                <path
                  id="Path_42"
                  data-name="Path 42"
                  d="M49,37h8.234v3.294H49Z"
                  transform="translate(28.4 20.64)"
                  fill="#00000"
                />
                <path
                  id="Path_43"
                  data-name="Path 43"
                  d="M15.781,22.929a1.647,1.647,0,0,0,1.6.072l9.881-4.94a1.647,1.647,0,0,0,0-2.948l-9.881-4.94A1.647,1.647,0,0,0,15,11.647v9.881A1.647,1.647,0,0,0,15.781,22.929Zm2.513-8.618,4.552,2.276-4.552,2.276Z"
                  transform="translate(6.408 3.176)"
                  fill="#00000"
                />
              </g>
            </g>
            <text
              id="Médias"
              transform="translate(70 154)"
              fill="#707070"
              font-size="14"
              font-family="Test"
            >
              <tspan x="0" y="0">
                <Trans>{t("mediaCard")}</Trans>
              </tspan>
            </text>
          </svg>
        </Link>
      );
    } else return null;
  };

  render() {
    const myStyle = {
      backgroundImage: `url(${wallpaper})`,
      height: "100vh",
      marginTop: "0px",
      fontSize: "50px",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };
    //const user = this.getData();
    // console.log(user)
    const col = this.colpts();
    const { t, i18n } = this.props;
    return (
      <div className="Home" style={myStyle}>
        <header>
          <div className="container">
            <div className="row">
              <Link to="/hub">
                <this.ResourceTitle />
              </Link>
            </div>
          </div>
        </header>

        <div class="resource-container">
          <div class="resource-card">
            <this.templatesCard />
          </div>
          <div class="resource-card">
            <this.checklistCard />
          </div>
          <div class="resource-card">
            <this.workflowsCard />
          </div>
        </div>
        <div class="resource-container">
          <div class="resource-card">
            <this.contractorCard />
          </div>
          <div class="resource-card">
            <this.mediaCard />
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
