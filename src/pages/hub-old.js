// styling 
import '../style/dashboard.css';
import evolvelogo from "../img/fcfl.png";
import hubbase from "../img/LEHUB.png";
// test
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser } from '../actions/authActions';
import store from "../store";
// dependencies 
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Link } from "react-router-dom";
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { withTranslation, Trans } from 'react-i18next';
import wallpaper from '../img/background.png';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser);
    window.location.href = "./"
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
    axios.get("https://api.forumconcepts.fr/api/users/getUser/"+id)
    .then(res => {
        this.setState({user: res.data})
      console.log(this.state.user);
      //this.props.i18n.changeLanguage(this.state.user.lang)
    })
    .catch(err => console.log(err));
  }

  getUserOpts = (id) => {
    let category = 'HUB'
    axios.get('https://api.forumconcepts.fr/api/users/getUserOpts/'+id+'/'+category)
      .then(res => {
        this.setState({hubOpts: res.data.code})
        console.log(this.state.hubOpts) 
      });
  }

  getLng = (id) => {
    let category = 'language'
    axios.get('https://api.forumconcepts.fr/api/users/getUserOpts/'+id+'/'+category)
      .then(res => {
        
        this.props.i18n.changeLanguage(res.data.code);
      });
  }
  getCAFMLink = (id) => {
    let category = "CAFM"
    axios.get('https://api.forumconcepts.fr/api/users/userLinks/'+id+'/'+category)
      .then(res => {
        if(res.data){
          this.setState({cafmlink: res.data.url})
        } 
        
      
      });
  }
  getSSRSLink = (id) => {
    let category = "SSRS"
    axios.get('https://api.forumconcepts.fr/api/users/userLinks/'+id+'/'+category)
      .then(res => {
        if(res.data){
          this.setState({ssrslink: res.data.url})
        }
        
      });
  }
  getReportsLink = (id) => {
    let category = "Reports"
    axios.get('https://api.forumconcepts.fr/api/users/userLinks/'+id+'/'+category)
      .then(res => {
        if(res.data){
          this.setState({reportlink: res.data.url})
        } 
       
      });
  }
  getIOTLink = (id) => {
    let category = "IOT"
    axios.get('https://api.forumconcepts.fr/api/users/userLinks/'+id+'/'+category)
      .then(res => {
        if(res.data){
          this.setState({iotlink: res.data.url})
        }
        
      });
  }
  //handleLngChange = event => {
  //  console.log("select val:", event.target.value);
  //  let newLang = event.target.value;
  //  this.setState(prevState => ({ value: newLang }));
  //  console.log("newLang:", newLang);
  //  this.props.i18n.changeLanguage(newLang);
  //}
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
  getIdfromToken = () => {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      setAuthToken(token);
      const decoded = jwt_decode(token);
      console.log(decoded.id);
      //this.setState({decoded: decoded.id});
      //console.log(this.state.decoded);
    }
  }
  
  
  componentDidMount() {   
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

    console.log(this.props.i18n.language)
    // this.getIdfromToken();
    
   }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  }

  colpts  = () => {
    let col = {};
    if(this.props.auth.user.role === "admin"){
      col = "col s12 m4";
      return col;
    } else {
      col = "col s12 m4";
      return col;
    }
  }

  cafm = () => {
    var link = this.state.cafmlink;
    if(!link){
      link = null;
      return link;
    } else {
      console.log(link)
      return link;
     }
   
  }

  reps = () => {
    var link = this.state.reportlink;
    if(!link){
      link = null;
      return link;
    } else {
      console.log(link);
      return link;
    }
  }

  SSRSlink = () => {
    var link = this.state.ssrslink;
    if(!link) {
      link = null;
      return link;
    } else {
      console.log(link);
      return link;
    }
  }
  IOTlink = () => {
    var link = this.state.iotlink;
    if(!link) {
      link = null;
      return link;
    } else {
      console.log(link);
      return link;
    }
  }
  
  
  render() {
    
    //const user = this.getData();
    // console.log(user)
    const col= this.colpts();
    const CAFMlink = this.cafm();
    const RepLink = this.reps();
    const SSRSlink = this.SSRSlink()
    const IOTlink = this.IOTlink()
    const testuser = "admin";
    const testpassword = "admin";
    const CAFMCard = () => {
      return (
                <a target="_blank" href={CAFMlink}>
                  <svg id="Group_2" data-name="Group 2" xmlns="http://www.w3.org/2000/svg" width="201" height="186" viewBox="0 0 201 186">
                    <g id="Group_78" data-name="Group 78" transform="translate(-0.211 -0.218)">
                      <rect id="Rectangle_5" data-name="Rectangle 5" width="201" height="186" rx="18" transform="translate(0.211 0.218)" fill="rgba(229,195,219,0.97)"/>
                    </g>
                    <g id="management" transform="translate(46.909 39.25)">
                      <path id="Path_80" data-name="Path 80" d="M121.528,58.9V55.33a1.785,1.785,0,0,0,1.785-1.785V42.837a1.785,1.785,0,0,0-1.785-1.785H111.89l-.346-1.341A32.983,32.983,0,0,0,107.9,30.99l-.714-1.194,6.843-6.855a1.769,1.769,0,0,0,0-2.5l-7.58-7.591a1.811,1.811,0,0,0-2.5,0L97.1,19.707l-1.2-.714a33.058,33.058,0,0,0-8.732-3.643L85.831,15V5.355A1.785,1.785,0,0,0,84.046,3.57H73.337a1.785,1.785,0,0,0-1.785,1.785v9.638l-1.341.347a33.05,33.05,0,0,0-8.722,3.639l-1.194.715-6.854-6.842a1.81,1.81,0,0,0-2.508,0l-7.582,7.58a1.772,1.772,0,0,0,0,2.51L50.207,29.8l-.714,1.194a32.981,32.981,0,0,0-3.641,8.721l-.35,1.341H35.855a1.785,1.785,0,0,0-1.785,1.785V53.546a1.785,1.785,0,0,0,1.785,1.785V58.9A5.355,5.355,0,0,1,30.5,53.546V42.837a5.355,5.355,0,0,1,5.355-5.355h6.906a36.448,36.448,0,0,1,2.97-7.109l-4.908-4.908a5.337,5.337,0,0,1,0-7.557l7.586-7.586a5.466,5.466,0,0,1,7.558,0l4.907,4.906a36.453,36.453,0,0,1,7.109-2.967V5.355A5.355,5.355,0,0,1,73.337,0H84.046A5.355,5.355,0,0,1,89.4,5.354v6.908a36.461,36.461,0,0,1,7.109,2.969l4.908-4.908a5.467,5.467,0,0,1,7.559,0l7.584,7.584a5.34,5.34,0,0,1,0,7.557l-4.908,4.908a36.586,36.586,0,0,1,2.969,7.111h6.906a5.355,5.355,0,0,1,5.355,5.355V53.546a5.355,5.355,0,0,1-5.353,5.354Zm0,0" transform="translate(-25.145)" fill="#575676"/>
                      <path id="Path_81" data-name="Path 81" d="M210.476,154.988h-3.57a21.418,21.418,0,1,0-42.837,0H160.5a24.988,24.988,0,1,1,49.976,0Zm0,0" transform="translate(-131.942 -106.797)" fill="#575676"/>
                      <path id="Path_82" data-name="Path 82" d="M251.209,251.418a10.709,10.709,0,1,1,10.709-10.709,10.709,10.709,0,0,1-10.709,10.709Zm0-17.849a7.139,7.139,0,1,0,7.139,7.139,7.139,7.139,0,0,0-7.139-7.139Zm0,0" transform="translate(-197.663 -188.948)" fill="#575676"/>
                      <path id="Path_83" data-name="Path 83" d="M421.209,291.418a10.709,10.709,0,1,1,10.709-10.709,10.709,10.709,0,0,1-10.709,10.709Zm0-17.849a7.139,7.139,0,1,0,7.139,7.139,7.139,7.139,0,0,0-7.139-7.139Zm0,0" transform="translate(-337.32 -221.809)" fill="#575676"/>
                      <path id="Path_84" data-name="Path 84" d="M81.209,291.418a10.709,10.709,0,1,1,10.709-10.709,10.709,10.709,0,0,1-10.709,10.709Zm0-17.849a7.139,7.139,0,1,0,7.139,7.139,7.139,7.139,0,0,0-7.139-7.139Zm0,0" transform="translate(-58.006 -221.809)" fill="#575676"/>
                      <path id="Path_85" data-name="Path 85" d="M100.57,369.933a15.884,15.884,0,0,0-9.041-2.794H77.249a15.972,15.972,0,0,0-2.59.235,16.016,16.016,0,0,0-4.371-4.535,6.928,6.928,0,0,0-.823-.535,15.938,15.938,0,0,0-8.28-2.3H46.907a15.885,15.885,0,0,0-13.469,7.374,16.036,16.036,0,0,0-2.6-.235H16.564a15.885,15.885,0,0,0-9.037,2.791A16.064,16.064,0,0,0,.5,383.2v7.14a12.5,12.5,0,0,0,7.268,11.341,12.1,12.1,0,0,0,5.226,1.153H30.843v-3.57H14.779V379.633h-3.57v19.454a8.379,8.379,0,0,1-1.944-.646,8.938,8.938,0,0,1-5.2-8.1V383.2a12.507,12.507,0,0,1,5.472-10.328,12.346,12.346,0,0,1,7.022-2.166H30.843c.314,0,.618.033.925.054a16.063,16.063,0,0,0-.925,5.3v17.849a8.936,8.936,0,0,0,8.924,8.924h5.355V374.278h-3.57v24.988H39.767a5.355,5.355,0,0,1-5.355-5.355V376.063a12.494,12.494,0,0,1,12.494-12.494h14.28a12.472,12.472,0,0,1,6.506,1.836,4.453,4.453,0,0,1,.521.333,12.643,12.643,0,0,1,4,4.462,12.466,12.466,0,0,1,1.466,5.862v17.849a5.355,5.355,0,0,1-5.355,5.355H66.54V374.278H62.97v28.558h5.355a8.935,8.935,0,0,0,8.924-8.924V376.063a16.1,16.1,0,0,0-.923-5.3c.307-.021.611-.054.923-.054H91.528a12.354,12.354,0,0,1,7.027,2.17,12.509,12.509,0,0,1,5.468,10.324v7.14a8.937,8.937,0,0,1-5.226,8.113,8.209,8.209,0,0,1-1.914.632V379.633h-3.57v19.634H77.249v3.57H95.1a12.07,12.07,0,0,0,5.2-1.139,12.51,12.51,0,0,0,7.3-11.355V383.2a16.064,16.064,0,0,0-7.03-13.267Zm0,0" transform="translate(-0.5 -295.744)" fill="#575676"/>
                      <path id="Path_86" data-name="Path 86" d="M260.5,580h14.279v3.57H260.5Zm0,0" transform="translate(-214.093 -476.478)" fill="#575676"/>
                    </g>
                    <g id="Group_81" data-name="Group 81" transform="translate(27.147 157.347)">
                      <text id="Système_de_Gestion" data-name="Système de Gestion" transform="translate(-3.147 15.653)" fill="#707070" font-size="14" font-family="HelveticaNeue, Helvetica Neue"><tspan x="0" y="0"><Trans>{t("managementCard")}</Trans></tspan></text>
                    </g>
                  </svg>
                </a>
      )
    }

    const REPCard = () => {
      return (
        <a target="_self" href={RepLink}>
          <svg xmlns="http://www.w3.org/2000/svg" width="202" height="186" viewBox="0 0 202 186">
            <g id="Group_7" data-name="Group 7" transform="translate(-859 -447)">
              <g id="Group_79" data-name="Group 79" transform="translate(859.372 446.782)">
                <rect id="Rectangle_5" data-name="Rectangle 5" width="202" height="186" rx="18" transform="translate(-0.372 0.218)" fill="#bed6ef"/>
              </g>
              <g id="research" transform="translate(902.723 482.53)">
                <path id="Path_87" data-name="Path 87" d="M120,264h5.721v3.814H120Z" transform="translate(-95.21 -204.769)" fill="#575676"/>
                <path id="Path_88" data-name="Path 88" d="M176,304h5.721v3.814H176Z" transform="translate(-137.861 -235.234)" fill="#575676"/>
                <path id="Path_89" data-name="Path 89" d="M120,304h9.535v3.814H120Z" transform="translate(-95.21 -235.234)" fill="#575676"/>
                <path id="Path_90" data-name="Path 90" d="M56,304H67.442v3.814H56Z" transform="translate(-46.465 -235.234)" fill="#575676"/>
                <path id="Path_91" data-name="Path 91" d="M104,344h22.883v3.814H104Z" transform="translate(-83.024 -265.699)" fill="#575676"/>
                <path id="Path_92" data-name="Path 92" d="M56,344h7.628v3.814H56Z" transform="translate(-46.465 -265.699)" fill="#575676"/>
                <path id="Path_93" data-name="Path 93" d="M152,384h11.442v3.814H152Z" transform="translate(-119.582 -296.165)" fill="#575676"/>
                <path id="Path_94" data-name="Path 94" d="M56,384H75.069v3.814H56Z" transform="translate(-46.465 -296.165)" fill="#575676"/>
                <path id="Path_95" data-name="Path 95" d="M104,424h11.442v3.814H104Z" transform="translate(-83.024 -326.63)" fill="#575676"/>
                <path id="Path_96" data-name="Path 96" d="M56,424h7.628v3.814H56Z" transform="translate(-46.465 -326.63)" fill="#575676"/>
                <path id="Path_97" data-name="Path 97" d="M126.6,215.628a1.907,1.907,0,0,0-1.907-1.907h-11.44a1.907,1.907,0,0,0-1.907,1.907v9.535h-9.535A1.907,1.907,0,0,0,99.9,227.07v9.53H90.37a1.907,1.907,0,0,0-1.907,1.907v9.535H78.928a1.907,1.907,0,0,0-1.907,1.907v11.442H63.345a5.721,5.721,0,1,0,0,3.814H65.58v5.721a1.909,1.909,0,0,1-1.907,1.907H21.721a1.909,1.909,0,0,1-1.907-1.907V227.069h9.535a5.727,5.727,0,0,0,5.721-5.721v-9.535h28.6a1.909,1.909,0,0,1,1.907,1.907v1.907h3.814V213.72A5.727,5.727,0,0,0,63.673,208H34.742a5.683,5.683,0,0,0-4.045,1.676L17.675,222.7A5.683,5.683,0,0,0,16,226.742v44.186a5.727,5.727,0,0,0,5.721,5.721H63.673a5.727,5.727,0,0,0,5.721-5.721v-5.721h61.021v-3.814H126.6Zm-95.346-1.117v6.838a1.909,1.909,0,0,1-1.907,1.907H22.511Zm26.7,50.7a1.907,1.907,0,1,1,1.907-1.907,1.907,1.907,0,0,1-1.907,1.907Zm22.883-13.348h7.628V261.4h-7.63Zm11.442-11.442H99.9V261.4H92.277Zm11.442-11.442h7.628V261.4h-7.628ZM115.163,261.4V217.535h7.628v43.859Z" transform="translate(-16 -162.117)" fill="#575676"/>
                <path id="Path_98" data-name="Path 98" d="M21.72,94.13a5.719,5.719,0,0,0,5.162-8.186L32.6,80.222a5.718,5.718,0,0,0,7.858-3.255h8.284A5.72,5.72,0,0,0,59.776,76l10.769-9.231a5.721,5.721,0,1,0-2.594-2.8L58.831,71.8a5.717,5.717,0,0,0-10.086,1.358H40.461A5.72,5.72,0,1,0,29.907,77.53l-5.722,5.722A5.72,5.72,0,1,0,21.72,94.13ZM73.207,59.805A1.907,1.907,0,1,1,71.3,61.712a1.907,1.907,0,0,1,1.907-1.907ZM54.138,73.154a1.907,1.907,0,1,1-1.907,1.907A1.907,1.907,0,0,1,54.138,73.154Zm-19.069,0a1.907,1.907,0,1,1-1.907,1.907A1.907,1.907,0,0,1,35.069,73.154ZM21.72,86.5a1.907,1.907,0,1,1-1.907,1.907A1.907,1.907,0,0,1,21.72,86.5Z" transform="translate(-15.999 -46.34)" fill="#575676"/>
                <path id="Path_99" data-name="Path 99" d="M200.416,60.23l-12.6,12.6h-16.7a5.721,5.721,0,1,0,0,3.814h4.142v34.325h3.814V76.649H188.6a1.907,1.907,0,0,0,1.348-.559l13.763-13.763a24.858,24.858,0,1,0-3.3-2.1Zm-34.7,16.418a1.907,1.907,0,1,1,1.907-1.907,1.907,1.907,0,0,1-1.907,1.907Zm64.876-21.894-11.05-12.431h16.642a20.906,20.906,0,0,1-5.59,12.432Zm5.592-16.245H217.2V19.529A21.01,21.01,0,0,1,236.186,38.51Zm-22.8-18.982v20.89a1.9,1.9,0,0,0,.483,1.265h0L227.745,57.29a20.972,20.972,0,1,1-14.354-37.762Z" transform="translate(-125.672 -15.51)" fill="#575676"/>
              </g>
              <g id="Group_101" data-name="Group 101" transform="translate(888.147 600.347)">
                <text id="Rapports" transform="translate(-14.147 19.653)" fill="#707070" font-size="14" font-family="HelveticaNeue, Helvetica Neue"><tspan x="0" y="0"><Trans>{t("reportsCard")}</Trans></tspan></text>
              </g>
            </g>
          </svg>
        </a>
      )
    }

    const IOTCard = () => {
      return (                
        <a target="_blank" href={IOTlink}>
          <svg xmlns="http://www.w3.org/2000/svg" width="201" height="186" viewBox="0 0 201 186">
            <g id="Group_8" data-name="Group 8" transform="translate(-753 -675)">
              <g id="Group_68" data-name="Group 68" transform="translate(753 674.782)">
                <rect id="Rectangle_5" data-name="Rectangle 5" width="201" height="186" rx="18" transform="translate(0 0.218)" fill="rgba(212,179,237,0.84)"/>
              </g>
              <g id="outline" transform="translate(783.898 691.974)">
                <path id="Path_100" data-name="Path 100" d="M229.64,363.574a7.1,7.1,0,0,1,5.054,2.094l2.527-2.527a10.722,10.722,0,0,0-15.163,0l2.527,2.527A7.1,7.1,0,0,1,229.64,363.574Z" transform="translate(-160.038 -260.948)" fill="#575676"/>
                <path id="Path_101" data-name="Path 101" d="M239.029,385.57l2.527,2.527a1.787,1.787,0,0,1,2.527,0l2.527-2.527a5.361,5.361,0,0,0-7.582,0Z" transform="translate(-173.217 -279.587)" fill="#575676"/>
                <path id="Path_102" data-name="Path 102" d="M401.506,299.14a10.722,10.722,0,0,0-15.163,0l2.527,2.527a7.148,7.148,0,0,1,10.108,0Z" transform="translate(-287.626 -211.243)" fill="#575676"/>
                <path id="Path_103" data-name="Path 103" d="M403.313,321.57l2.527,2.527a1.787,1.787,0,0,1,2.527,0l2.527-2.527a5.361,5.361,0,0,0-7.581,0Z" transform="translate(-300.805 -229.883)" fill="#575676"/>
                <circle id="Ellipse_1" data-name="Ellipse 1" cx="1.899" cy="1.899" r="1.899" transform="translate(67.704 109.662)" fill="#575676"/>
                <path id="Path_104" data-name="Path 104" d="M177.787,40.083h32.165a1.787,1.787,0,0,0,1.787-1.787V27.127A3.131,3.131,0,0,0,208.612,24H179.127A3.131,3.131,0,0,0,176,27.127V38.3a1.787,1.787,0,0,0,1.787,1.783Zm23.23-3.574h-14.3V34.722h14.3Zm-21.443-8.935h28.591v8.935h-3.574V32.935a1.787,1.787,0,0,0-1.787-1.787h-17.87a1.787,1.787,0,0,0-1.787,1.787v3.574h-3.574Z" transform="translate(-124.267)" fill="#575676"/>
                <path id="Path_105" data-name="Path 105" d="M119.637,101.361H98.194a3.578,3.578,0,0,0-3.574,3.574v3.574H87.472a1.787,1.787,0,0,0-1.642,1.083l-4.065,9.488a12.477,12.477,0,0,0-6.8-3.3v-3.7a1.787,1.787,0,0,0-.8-1.487l-9.926-6.617v-4.4H60.668v5.361a1.787,1.787,0,0,0,.8,1.487l9.926,6.617v2.747a12.423,12.423,0,0,0-4.7,1.671l-10.242-8.535a1.787,1.787,0,0,0-1.144-.414h-14.3V99.574A3.578,3.578,0,0,0,37.437,96H19.568a3.578,3.578,0,0,0-3.574,3.574v26.8a1.787,1.787,0,0,0,1.787,1.787H39.224a1.787,1.787,0,0,0,1.787-1.787v-14.3H54.659l9.235,7.7a12.558,12.558,0,0,0-1.151,1.482,8.944,8.944,0,0,0-10.414,5.476,12.5,12.5,0,0,0-9.4,13.937h-3.7a1.787,1.787,0,0,0-1.43.715l-4.548,6.064-2.07-1.184a1.787,1.787,0,0,0-1.773,0L16.9,153.412a1.787,1.787,0,0,0,.887,3.339v14.3a1.787,1.787,0,0,0,1.787,1.787H41.011a1.787,1.787,0,0,0,1.787-1.787v-14.3a1.787,1.787,0,0,0,.887-3.338l-7.311-4.177,3.744-4.993h3.89a12.524,12.524,0,0,0,11.3,7.148h1.787v27.251a4.92,4.92,0,0,0,4.914,4.914H77.2a4.92,4.92,0,0,0,4.914-4.914V151.4H83.9a12.509,12.509,0,0,0,1.675-24.906,12.411,12.411,0,0,0-1.325-4.136l4.4-10.271h5.97v7.148a3.578,3.578,0,0,0,3.574,3.574h4.668l-1,3.009a1.787,1.787,0,0,0,1.7,2.352h10.722a1.787,1.787,0,0,0,1.7-2.352l-1-3.009h4.668a3.578,3.578,0,0,0,3.574-3.574v-14.3a3.578,3.578,0,0,0-3.574-3.574Zm-82.2,23.23H19.568v-3.574h17.87Zm0-7.148H19.568V99.574h17.87ZM30.29,149.88l5.78,3.3H24.51Zm1.787,19.385H28.5V163.9h3.574Zm7.148-12.509v12.509H35.65v-7.148a1.787,1.787,0,0,0-1.787-1.787H26.716a1.787,1.787,0,0,0-1.787,1.787v7.148H21.355V156.756Zm33.952-26.8a1.78,1.78,0,1,1-1.265.521,1.787,1.787,0,0,1,1.265-.521Zm5.361,48.694a1.342,1.342,0,0,1-1.34,1.34H62.008a1.342,1.342,0,0,1-1.34-1.34v-2.234h17.87Zm0-5.808H60.668V151.4h17.87Zm0-25.017H60.668v-2.234a1.342,1.342,0,0,1,1.34-1.34H77.2a1.342,1.342,0,0,1,1.34,1.34Zm14.3-8.935a8.945,8.945,0,0,1-8.935,8.935H82.111v-2.234a4.92,4.92,0,0,0-4.914-4.914H62.008a4.92,4.92,0,0,0-4.914,4.914v2.234H55.307a8.935,8.935,0,0,1-1.326-17.771,1.787,1.787,0,0,0,1.474-1.352,5.361,5.361,0,0,1,7.382-3.648,1.787,1.787,0,0,0,2.326-.841,8.881,8.881,0,0,1,6.226-4.8v7.275a5.361,5.361,0,1,0,3.574,0V119.41a8.95,8.95,0,0,1,7.148,8.755,1.787,1.787,0,0,0,1.787,1.787,8.945,8.945,0,0,1,8.935,8.935ZM98.2,104.938h21.443v8.935H98.194Zm7.84,19.656.6-1.787H111.2l.6,1.787Zm13.6-5.361H98.194v-1.787h21.445Z" transform="translate(0 -55.917)" fill="#575676"/>
                <path id="Path_106" data-name="Path 106" d="M47.148,134.3A7.148,7.148,0,1,0,40,127.148a7.148,7.148,0,0,0,7.148,7.152Zm0-10.722a3.567,3.567,0,1,1-2.529,1.044,3.574,3.574,0,0,1,2.529-1.044Z" transform="translate(-18.645 -74.557)" fill="#575676"/>
                <rect id="Rectangle_23" data-name="Rectangle 23" width="3.425" height="3.425" transform="translate(53.709 77.511)" fill="#575676"/>
                <rect id="Rectangle_24" data-name="Rectangle 24" width="3.425" height="3.425" transform="translate(60.559 77.511)" fill="#575676"/>
                <rect id="Rectangle_25" data-name="Rectangle 25" width="3.425" height="3.425" transform="translate(82.249 77.511)" fill="#575676"/>
                <path id="Path_107" data-name="Path 107" d="M389.025,359.2l-6.418-1.6a.805.805,0,0,0-.1-.079l-3.148-4.722a1.787,1.787,0,0,0-1.487-.8H365.361a1.787,1.787,0,0,0-1.487.8L360.3,358.16a1.785,1.785,0,0,0-.3.991v8.935a1.787,1.787,0,0,0,1.787,1.787h2.094a5.361,5.361,0,0,0,10.107,0h2.4a5.361,5.361,0,0,0,10.107,0h2.094a1.787,1.787,0,0,0,1.787-1.787v-7.148A1.787,1.787,0,0,0,389.025,359.2Zm-10.92-1.84h-5.6v-1.787h4.4Zm-11.787-1.787h2.618v1.787h-3.809Zm2.618,14.3a1.787,1.787,0,1,1,1.787-1.787,1.787,1.787,0,0,1-1.787,1.787Zm12.509,0a1.787,1.787,0,1,1,1.787-1.787,1.787,1.787,0,0,1-1.787,1.787ZM386.8,366.3h-.3a5.361,5.361,0,0,0-10.107,0h-2.4a5.361,5.361,0,0,0-10.107,0h-.307v-5.361h17.65l5.581,1.4Z" transform="translate(-267.167 -254.735)" fill="#575676"/>
              </g>
              <g id="Group_84" data-name="Group 84" transform="translate(829.863 832.347)">
                <text id="Platforme_IOT" data-name="Platforme IOT" transform="translate(13.137 15.653)" fill="#707070" font-size="14" font-family="HelveticaNeue, Helvetica Neue"><tspan x="0" y="0"><Trans>{t("iotCard")}</Trans></tspan></text>
              </g>
            </g>
          </svg>
        </a>
    )
    }
  
    const RICard = () => {
      return (
        <Link to="/dashboard">
                  <svg xmlns="http://www.w3.org/2000/svg" width="202" height="186" viewBox="0 0 202 186">
                    <g id="Group_9" data-name="Group 9" transform="translate(-624 -447)">
                      <g id="Group_64" data-name="Group 64" transform="translate(624.372 447)">
                        <rect id="Rectangle_4" data-name="Rectangle 4" width="202" height="186" rx="18" transform="translate(-0.372)" fill="#b5f3f5"/>
                      </g>
                      <g id="descriptor" transform="translate(667.241 486.494)">
                        <path id="Path_119" data-name="Path 119" d="M13,14h3.662v3.662H13Z" transform="translate(9.971 10.802)" fill="#575676"/>
                        <path id="Path_120" data-name="Path 120" d="M9,14h3.662v3.662H9Z" transform="translate(6.647 10.802)" fill="#575676"/>
                        <path id="Path_121" data-name="Path 121" d="M5,14H8.662v3.662H5Z" transform="translate(3.324 10.802)" fill="#575676"/>
                        <path id="Path_122" data-name="Path 122" d="M41.787,22H12.493A5.5,5.5,0,0,0,7,27.493v3.662a5.485,5.485,0,0,0,3.662,5.156v4.337A5.481,5.481,0,0,0,7,45.8v3.662a5.485,5.485,0,0,0,3.662,5.156v4.337A5.481,5.481,0,0,0,7,64.111v3.662a5.5,5.5,0,0,0,5.493,5.493H41.787a5.5,5.5,0,0,0,5.493-5.493V64.111a5.485,5.485,0,0,0-3.662-5.156V54.618a5.485,5.485,0,0,0,3.662-5.156V45.8a5.485,5.485,0,0,0-3.662-5.156V36.307a5.485,5.485,0,0,0,3.662-5.156V27.489A5.5,5.5,0,0,0,41.787,22ZM14.324,40.309V36.647H39.957v3.662Zm0,18.309V54.957H39.957v3.662Zm29.295,9.155A1.833,1.833,0,0,1,41.787,69.6H12.493a1.833,1.833,0,0,1-1.831-1.831V64.111a1.833,1.833,0,0,1,1.831-1.831H41.787a1.833,1.833,0,0,1,1.831,1.831Zm0-18.309a1.833,1.833,0,0,1-1.831,1.831H12.493a1.833,1.833,0,0,1-1.831-1.831V45.8a1.833,1.833,0,0,1,1.831-1.831H41.787A1.833,1.833,0,0,1,43.618,45.8Zm0-18.309a1.833,1.833,0,0,1-1.831,1.831H12.493a1.833,1.833,0,0,1-1.831-1.831V27.493a1.833,1.833,0,0,1,1.831-1.831H41.787a1.833,1.833,0,0,1,1.831,1.831Z" transform="translate(4.986 17.449)" fill="#575676"/>
                        <path id="Path_123" data-name="Path 123" d="M83.391,33.957h25.633a5.5,5.5,0,0,0,5.493-5.493V6.493A5.5,5.5,0,0,0,109.024,1H83.391A5.5,5.5,0,0,0,77.9,6.493v9.155H72.406a5.5,5.5,0,0,0-5.493,5.493v21.97a1.833,1.833,0,0,1-1.831,1.831H63.251V22.971a5.5,5.5,0,0,0-5.493-5.493H6.493A5.5,5.5,0,0,0,1,22.971V92.546a5.5,5.5,0,0,0,5.493,5.493H57.759a5.5,5.5,0,0,0,5.493-5.493V70.575h1.831a1.833,1.833,0,0,1,1.831,1.831V94.377a5.5,5.5,0,0,0,5.493,5.493H77.9v9.155a5.5,5.5,0,0,0,5.493,5.493h25.633a5.5,5.5,0,0,0,5.493-5.493V87.053a5.5,5.5,0,0,0-5.493-5.493H83.391A5.5,5.5,0,0,0,77.9,87.053v9.155H72.406a1.833,1.833,0,0,1-1.831-1.831V72.406a5.5,5.5,0,0,0-5.493-5.493H63.251V59.589H77.9v9.155a5.5,5.5,0,0,0,5.493,5.493h25.633a5.5,5.5,0,0,0,5.493-5.493V46.773a5.5,5.5,0,0,0-5.493-5.493H83.391A5.5,5.5,0,0,0,77.9,46.773v9.155H63.251V48.6h1.831a5.5,5.5,0,0,0,5.493-5.493V21.14a1.833,1.833,0,0,1,1.831-1.831H77.9v9.155a5.5,5.5,0,0,0,5.491,5.493Zm25.633,76.9H83.391a1.833,1.833,0,0,1-1.831-1.831V92.546h29.295v16.478a1.833,1.833,0,0,1-1.831,1.831ZM83.391,85.222h25.633a1.833,1.833,0,0,1,1.831,1.831v1.831H81.56V87.053a1.833,1.833,0,0,1,1.831-1.831Zm25.633-14.647H83.391a1.833,1.833,0,0,1-1.831-1.831V52.266h29.295V68.744a1.833,1.833,0,0,1-1.831,1.831ZM83.391,44.942h25.633a1.833,1.833,0,0,1,1.831,1.831V48.6H81.56V46.773a1.833,1.833,0,0,1,1.831-1.831Zm-76.9-23.8H57.759a1.833,1.833,0,0,1,1.831,1.831v9.155H4.662V22.971A1.833,1.833,0,0,1,6.493,21.14ZM57.759,94.377H6.493a1.833,1.833,0,0,1-1.831-1.831V35.787H59.589V92.546a1.833,1.833,0,0,1-1.83,1.831Zm51.266-64.082H83.391a1.833,1.833,0,0,1-1.831-1.831V11.986h29.295V28.464a1.833,1.833,0,0,1-1.831,1.831ZM83.391,4.662h25.633a1.833,1.833,0,0,1,1.831,1.831V8.324H81.56V6.493a1.833,1.833,0,0,1,1.831-1.831Z" fill="#575676"/>
                        <path id="Path_124" data-name="Path 124" d="M47,9H68.971v3.662H47Z" transform="translate(38.222 6.647)" fill="#575676"/>
                        <path id="Path_125" data-name="Path 125" d="M57,13h3.662v3.662H57Z" transform="translate(46.531 9.971)" fill="#575676"/>
                        <path id="Path_126" data-name="Path 126" d="M47,13H61.647v3.662H47Z" transform="translate(38.222 9.971)" fill="#575676"/>
                        <path id="Path_127" data-name="Path 127" d="M47,53H68.971v3.662H47Z" transform="translate(38.222 43.208)" fill="#575676"/>
                        <path id="Path_128" data-name="Path 128" d="M57,57h3.662v3.662H57Z" transform="translate(46.531 46.531)" fill="#575676"/>
                        <path id="Path_129" data-name="Path 129" d="M47,57H61.647v3.662H47Z" transform="translate(38.222 46.531)" fill="#575676"/>
                        <path id="Path_130" data-name="Path 130" d="M47,31H68.971v3.662H47Z" transform="translate(38.222 24.928)" fill="#575676"/>
                        <path id="Path_131" data-name="Path 131" d="M57,35h3.662v3.662H57Z" transform="translate(46.531 28.251)" fill="#575676"/>
                        <path id="Path_132" data-name="Path 132" d="M47,35H61.647v3.662H47Z" transform="translate(38.222 28.251)" fill="#575676"/>
                      </g>
                      <g id="Group_100" data-name="Group 100" transform="translate(679.147 606.347)">
                        <text id="Ressources" transform="translate(6.853 13.653)" fill="#707070" font-size="14" font-family="HelveticaNeue, Helvetica Neue"><tspan x="0" y="0"><Trans>{t("resourcesCard")}</Trans></tspan></text>
                      </g>
                    </g>
                  </svg>
        </Link>
      )
    }

    const SettingsCard = () => {
      return (
        <Link to="/admin">
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="186" viewBox="0 0 200 186">
            <g id="Group_11" data-name="Group 11" transform="translate(-624 -177)">
              <g id="Group_67" data-name="Group 67" transform="translate(623.933 176.782)">
                <rect id="Rectangle_8" data-name="Rectangle 8" width="200" height="186" rx="18" transform="translate(0.067 0.218)" fill="#c7ceea"/>
                <g id="Group_43" data-name="Group 43" transform="translate(55.581 51.797)">
                  <g id="Group_35" data-name="Group 35" transform="translate(29.992 29.992)">
                    <path id="Path_46" data-name="Path 46" d="M15.5,24A7.5,7.5,0,1,1,23,16.5,7.5,7.5,0,0,1,15.5,24Zm0-9.373A1.875,1.875,0,1,0,17.373,16.5,1.875,1.875,0,0,0,15.5,14.627Z" transform="translate(-8 -9)" fill="#575676"/>
                  </g>
                  <g id="Group_36" data-name="Group 36" transform="translate(40.302 34.679)">
                    <path id="Path_47" data-name="Path 47" d="M46.366,15.874h-32.8a2.812,2.812,0,1,1,0-5.624h32.8a2.812,2.812,0,1,1,0,5.624Z" transform="translate(-10.75 -10.25)" fill="#575676"/>
                  </g>
                  <g id="Group_37" data-name="Group 37" transform="translate(11.247 34.679)">
                    <path id="Path_48" data-name="Path 48" d="M23.62,15.874H5.812a2.812,2.812,0,1,1,0-5.624H23.62a2.812,2.812,0,1,1,0,5.624Z" transform="translate(-3 -10.25)" fill="#575676"/>
                  </g>
                  <g id="Group_38" data-name="Group 38" transform="translate(48.738 52.487)">
                    <path id="Path_49" data-name="Path 49" d="M20.5,30A7.5,7.5,0,1,1,28,22.5,7.5,7.5,0,0,1,20.5,30Zm0-9.373A1.875,1.875,0,1,0,22.373,22.5,1.875,1.875,0,0,0,20.5,20.627Z" transform="translate(-13 -15)" fill="#575676"/>
                  </g>
                  <g id="Group_39" data-name="Group 39" transform="translate(59.048 57.173)">
                    <path id="Path_50" data-name="Path 50" d="M32.621,21.874H18.562a2.812,2.812,0,0,1,0-5.624H32.621a2.812,2.812,0,1,1,0,5.624Z" transform="translate(-15.75 -16.25)" fill="#575676"/>
                  </g>
                  <g id="Group_40" data-name="Group 40" transform="translate(11.247 57.173)">
                    <path id="Path_51" data-name="Path 51" d="M42.365,21.874H5.812a2.812,2.812,0,0,1,0-5.624H42.365a2.812,2.812,0,1,1,0,5.624Z" transform="translate(-3 -16.25)" fill="#575676"/>
                  </g>
                  <g id="Group_41" data-name="Group 41">
                    <path id="Path_52" data-name="Path 52" d="M79.667,83.479H10.31A10.318,10.318,0,0,1,0,73.169V11.31A10.318,10.318,0,0,1,10.31,1H79.667a10.318,10.318,0,0,1,10.31,10.31V73.169a10.318,10.318,0,0,1-10.31,10.31ZM10.31,6.624A4.693,4.693,0,0,0,5.624,11.31V73.169a4.693,4.693,0,0,0,4.686,4.686H79.667a4.693,4.693,0,0,0,4.686-4.686V11.31a4.693,4.693,0,0,0-4.686-4.686Z" transform="translate(0 -1)" fill="#575676"/>
                  </g>
                  <g id="Group_42" data-name="Group 42" transform="translate(0 13.122)">
                    <path id="Path_53" data-name="Path 53" d="M87.165,10.124H2.812a2.812,2.812,0,1,1,0-5.624H87.165a2.812,2.812,0,0,1,0,5.624Z" transform="translate(0 -4.5)" fill="#575676"/>
                  </g>
                </g>
              </g>
              <text id="Réglages" transform="translate(682 350)" fill="#707070" font-size="14" font-family="HelveticaNeue, Helvetica Neue"><tspan x="0" y="0"><Trans>{t("settingsCard")}</Trans></tspan></text>
            </g>
          </svg>
        </Link>
      )
    }
    
    const HELPCard = () => {
      return (
        <a target="_blank" href="https://support.forumconcepts.fr">
          <svg xmlns="http://www.w3.org/2000/svg" width="199" height="186" viewBox="0 0 199 186">
            <g id="Group_10" data-name="Group 10" transform="translate(-1009 -210)">
              <rect id="Rectangle_9" data-name="Rectangle 9" width="199" height="186" rx="18" transform="translate(1009 210)" fill="#faf7b5"/>
              <g id="customer-service" transform="translate(1047.057 241.989)">
                <g id="Group_86" data-name="Group 86" transform="translate(0.574 19.681)">
                  <g id="Group_85" data-name="Group 85">
                    <path id="Path_108" data-name="Path 108" d="M99.464,166.6l-4.556-13.67a13.777,13.777,0,0,0-10.606-9.2l-13.153-2.393v-1.019a19.808,19.808,0,0,0,5.867-5.21H80.99a5.912,5.912,0,0,0,5.9-5.9V105.585a25.586,25.586,0,1,0-51.171,0v13.777A7.885,7.885,0,0,0,42,127.071a19.718,19.718,0,0,0,9.469,13.245v1.019l-13.155,2.393a13.774,13.774,0,0,0-10.6,9.2l-.787,2.364-6.7-6.7a1.972,1.972,0,0,1,0-2.785L28,138.035l-14.6-14.6-8.786,8.786a13.777,13.777,0,0,0,0,19.482l26.6,26.6a13.77,13.77,0,0,0,19.421.059l9.587-8.784-2.99-2.984ZM82.957,129.2a1.97,1.97,0,0,1-1.968,1.968H79.334a19.548,19.548,0,0,0,1.283-4.1,7.8,7.8,0,0,0,2.34-.931Zm-1.968-6.451v-6.778a3.9,3.9,0,0,1,0,6.778Zm-39.362,0a3.9,3.9,0,0,1,0-6.778Zm0-13.23v2.248a7.806,7.806,0,0,0-1.968.815v-7a21.65,21.65,0,0,1,43.3,0v7a7.734,7.734,0,0,0-1.968-.815v-2.248h-1.97a21.654,21.654,0,0,1-15.408-6.383l-2.3-2.3-2.3,2.3a21.654,21.654,0,0,1-15.408,6.383ZM45.563,123.3v-9.915a25.516,25.516,0,0,0,15.745-7,25.506,25.506,0,0,0,15.745,7V123.3a15.624,15.624,0,0,1-2.128,7.87l-13.617,0v3.936h10.38A15.72,15.72,0,0,1,45.563,123.3Zm21.649,18.774v.093l-5.9,5.9-5.9-5.9v-.093a19.665,19.665,0,0,0,11.809,0ZM31.44,154.17a9.844,9.844,0,0,1,7.575-6.572l13.757-2.5,8.536,8.536,8.534-8.534L83.6,147.6a9.841,9.841,0,0,1,7.575,6.572L94,162.661H53.3l-7.666-7.666L37.112,162.7a2.01,2.01,0,0,1-2.783,0l-4.3-4.3ZM13.4,129l9.026,9.026-2.137,2.137-9.026-9.026Zm34.511,46.522a9.843,9.843,0,0,1-13.916,0l-26.6-26.6a9.843,9.843,0,0,1,0-13.916l1.082-1.082L17.5,142.95l-.071.071a5.914,5.914,0,0,0,0,8.351l14.113,14.113a5.873,5.873,0,0,0,4.176,1.73,5.8,5.8,0,0,0,4.1-1.661l.148-.132,9.067,9.067Zm4.035-3.7L42.9,162.779l2.6-2.35,9.032,9.032Z" transform="translate(-0.58 -80)" fill="#575676"/>
                  </g>
                </g>
                <g id="Group_88" data-name="Group 88" transform="translate(82.951)">
                  <g id="Group_87" data-name="Group 87">
                    <path id="Path_109" data-name="Path 109" d="M368.886,0H341.332a5.912,5.912,0,0,0-5.9,5.9V21.649a5.912,5.912,0,0,0,5.9,5.9h5.257l-2.035,11.87,18.992-11.87h5.339a5.912,5.912,0,0,0,5.9-5.9V5.9A5.912,5.912,0,0,0,368.886,0Zm1.968,21.649a1.971,1.971,0,0,1-1.968,1.968h-6.469l-12.5,7.811,1.34-7.811h-9.925a1.971,1.971,0,0,1-1.968-1.968V5.9a1.971,1.971,0,0,1,1.968-1.968h27.553A1.971,1.971,0,0,1,370.854,5.9Z" transform="translate(-335.428)" fill="#575676"/>
                  </g>
                </g>
                <g id="Group_90" data-name="Group 90" transform="translate(90.824 7.872)">
                  <g id="Group_89" data-name="Group 89">
                    <rect id="Rectangle_26" data-name="Rectangle 26" width="23.617" height="3.936" fill="#575676"/>
                  </g>
                </g>
                <g id="Group_92" data-name="Group 92" transform="translate(90.824 15.745)">
                  <g id="Group_91" data-name="Group 91">
                    <rect id="Rectangle_27" data-name="Rectangle 27" width="15.745" height="3.936" fill="#575676"/>
                  </g>
                </g>
                <g id="Group_94" data-name="Group 94" transform="translate(110.505 15.745)">
                  <g id="Group_93" data-name="Group 93">
                    <rect id="Rectangle_28" data-name="Rectangle 28" width="3.936" height="3.936" fill="#575676"/>
                  </g>
                </g>
                <g id="Group_96" data-name="Group 96" transform="translate(0.572 5.904)">
                  <g id="Group_95" data-name="Group 95">
                    <path id="Path_110" data-name="Path 110" d="M61.3,24A55.072,55.072,0,0,0,7.677,66.6l-3.73-6.217L.572,62.408,7.49,73.935l11.527-6.918-2.025-3.375-5.334,3.2A51.184,51.184,0,0,1,76.464,30.219l1.165-3.759A55.071,55.071,0,0,0,61.3,24Z" transform="translate(-0.572 -24)" fill="#575676"/>
                  </g>
                </g>
                <g id="Group_98" data-name="Group 98" transform="translate(101.06 36.66)">
                  <g id="Group_97" data-name="Group 97">
                    <path id="Path_111" data-name="Path 111" d="M429.333,155.934l-11.527-6.918-6.916,11.529,3.375,2.025,3.444-5.741a51.214,51.214,0,0,1-8.673,48.756l3.056,2.48a55.114,55.114,0,0,0,9.431-52.226l5.784,3.47Z" transform="translate(-409.036 -149.016)" fill="#575676"/>
                  </g>
                </g>
              </g>
              <text id="Bureau_d_Aide" data-name="Bureau d’Aide" transform="translate(1083 383)" fill="#707070" font-size="14" font-family="HelveticaNeue, Helvetica Neue"><tspan x="0" y="0"><Trans>{t("supportCard")}</Trans></tspan></text>
            </g>
          </svg>
        </a>
      )
    }
    const { t, i18n } = this.props;
    const myStyle={
      backgroundImage:`url(${wallpaper})`,
      height:'100vh',
      marginTop:'0px',
      fontSize:'50px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
  };
    return (
      
      <div className="Home"  style={myStyle} >
        <header>
          <div className="container">
            <div className="row">
            
                <Typography variant="h1" id="home-page-title">
                  <Trans>{t("HubTitle")}</Trans>
                </Typography>


               
              
              
              <div className="col s1 m1">
                    <img id="logo-evolve" alt="_" src={evolvelogo}/>      
                </div> 
              <div  className="col offset-s10 offset-m12">
                <button  id="lgout-btn-home" onClick={this.onLogoutClick} style={{ 
                              width: "150px",
                              borderRadius: "3px",
                              letterSpacing: "1.5px",
                              marginTop: "1rem"}}
                              className="btn btn-large waves-effect waves-dark hoverable white black-text accent-3">
                                  <Trans>{t("logOut")}</Trans>
                              </button>
              </div>
            </div>
          </div>
        </header>

         <div id="main-menu-item-block"className="container">
          <div className="row">
            <div className="col s12 m4">
              <div>
                {/** All Options */}
              {this.state.hubOpts === "[CIRSKBScH]" && (
                  <CAFMCard />
                )}
                {/** Only 1 */}
                {this.state.hubOpts === "[C]" && (
                  <CAFMCard />
                )}
                {/** 2 Cards */}
                {this.state.hubOpts === "[CI]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[IC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CR]" && (
                  <CAFMCard />
                )}
                {this.state.hubOpts === "[RC]" && (
                  <CAFMCard />
                )}
                {this.state.hubOpts === "[CS]" && (
                  <CAFMCard />
                )}
                {this.state.hubOpts === "[SC]" && (
                  <CAFMCard />
                )}
                {this.state.hubOpts === "[CK]" && (
                  <CAFMCard />
                )}
                {this.state.hubOpts === "[KC]" && (
                  <CAFMCard />
                )}
                {this.state.hubOpts === "[CB]" && (
                  <CAFMCard />
                )}
                {this.state.hubOpts === "[BC]" && (
                  <CAFMCard />
                )}
                {this.state.hubOpts === "[CSc]" && (
                  <CAFMCard />
                )}
                {this.state.hubOpts === "[ScC]" && (
                  <CAFMCard />
                )}
                {this.state.hubOpts === "[CH]" && (
                  <CAFMCard />
                )}
                {this.state.hubOpts === "[HC]" && (
                  <CAFMCard />
                )}
                {/** 3 Cards */}
                {/** 3-way combination with CAFM and Intranet Cards */}
                {/** 3 Way combination with CAFM and Reports Cards */}
                {this.state.hubOpts === "[CRI]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CIR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RIC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RCI]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ICR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[IRC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CRS]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CSR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RCS]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RSC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SRC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SCR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CRB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CBR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RBC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RCB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BRC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BCR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CRSc]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CScR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ScCR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ScRC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RScC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RCSc]" && (
                  <CAFMCard />  
                )}
                {/** 3-Way Combination with CAFM and SSRS Cards */}
                {this.state.hubOpts === "[CSI]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CIS]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ICS]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ISC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SIC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SCI]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CSR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CRS]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RCS]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RSC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SCR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SRC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CSK]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CKS]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SCK]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SKC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[KCS]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[KSC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CSB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CBS]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SBC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SCB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BSC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BCS]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CSSc]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CScS]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SScC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SCSc]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ScCS]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ScSC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CSH]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CHS]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SHC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SCH]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[HCS]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[HSC]" && (
                  <CAFMCard />  
                )}
                {/** 3-way Combination with CAFM & IOT Cards */}
                {this.state.hubOpts === "[CKI]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CIK]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[KIC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[KCI]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ICK]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[IKC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CKR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CRK]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[KCR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[KRC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RCK]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RKC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CKS]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CSK]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SCK]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SKC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[KSC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[KCS]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CKB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CBK]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BCK]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BKC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[KCB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[KBC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CKSc]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CScK]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[KScC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[KCSc]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ScKC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ScCK]" && (
                  <CAFMCard />  
                )}
                {/** 3-way combination CAFM & RI Cards */}
                {this.state.hubOpts === "[CBI]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CIB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BIC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BCI]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ICB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[IBC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CBR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CRB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BRC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BCR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RBC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RCB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CBS]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CSB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BSC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BCS]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SBC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SCB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CBK]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CKB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BKC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BCK]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[KBC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[KCB]" && (
                  <CAFMCard />  
                )}
                {/** 3-way Combination CAFM and Settings Cards */}
                {this.state.hubOpts === "[CScI]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CISc]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ScIC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ScCI]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ICSc]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[IScC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CScS]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CSSc]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ScSC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ScCS]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SCSc]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SScC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CScB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CBSc]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ScCB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ScBC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BCSc]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BScC]" && (
                  <CAFMCard />  
                )}
                {/** 3-Way combination with CAFM, Intranet and Support Cards */}
                {this.state.hubOpts === "[CHI]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CIH]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[IHC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[HIC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[HCI]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ICH]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CHR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CRH]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[HRC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[HCR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RCH]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RHC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CHS]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CSH]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[HSC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[HCS]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SHC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SCH]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CHK]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CKH]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[HKC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[HCK]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[KCH]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[KHC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CHB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CBH]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[HBC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[HCB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BHC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BCH]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CHSc]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CScH]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ScCH]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ScHC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[HScC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[HCSc]" && (
                  <CAFMCard />  
                )}
                {/** 4 Cards */}
                {this.state.hubOpts === "[CRSI]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[CRSK]" && (
                  <CAFMCard />  
                )}  
                {this.state.hubOpts === "[CRSB]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[CRSSc]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[CRSH]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[CRKI]" && (
                  <CAFMCard />  
                )}   
                {/** complete above */}
                {this.state.hubOpts === "[CRKB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CRBK]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CKRB]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[CKBR]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[CBRK]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[CBKR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BCKR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BCRK]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BRCK]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BRKC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BKRC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BKCR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[KBRC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[KBCR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[KRCB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[KRBC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[KCBR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[KCRB]" && (
                  <CAFMCard />  
                )}  
                {this.state.hubOpts === "[RCKB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RCBK]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RKBC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RKCB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RBKC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RBCK]" && (
                  <CAFMCard />  
                )}

                {this.state.hubOpts === "[CRKSc]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[CRScK]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[CKScR]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[CKRSc]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[CScRK]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[CScKR]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[RKCSc]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[RKScC]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[RCKSc]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[RCScK]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[RScKC]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[RScCK]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[KRCSc]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[KRScC]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[KScRC]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[KScCR]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[KCScR]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[KCRSc]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[ScCRK]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[ScCKR]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[ScKRC]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[ScKCR]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[ScRCK]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[ScRKC]" && (
                  <CAFMCard />  
                )} 
                
                {this.state.hubOpts === "[CRKH]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[CRHK]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[CKRH]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[CKHR]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[CHKR]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[CHRK]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[RCKH]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[RCHK]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[RKCH]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[RKHC]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[RHKC]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[RHCK]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[KCRH]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[KCHR]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[KRCH]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[KRHC]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[KHRC]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[KHCR]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[HCRK]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[HCKR]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[HRCK]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[HRKC]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[HKRC]" && (
                  <CAFMCard />  
                )}   
                {this.state.hubOpts === "[HKCR]" && (
                  <CAFMCard />  
                )}   

                {this.state.hubOpts === "[CRBSc]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CRScB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CBScR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CBRSc]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CScRB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[CScBR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RCBSc]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RCScB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RBCSc]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RBScC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RScBC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[RScCB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BRCSc]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BRScC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BCRSc]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BCScR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BScRC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[BScCR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ScCRB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ScCBR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ScBCR]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ScBRC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ScRCB]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[ScRBC]" && (
                  <CAFMCard />  
                )}

                {this.state.hubOpts === "[CRBH]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[CRHB]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[CBRH]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[CBHR]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[CHBR]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[CHRB]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[RCBH]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[RCHB]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[RBHC]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[RBCH]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[RHBC]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[RHCB]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[BRCH]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[BRHC]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[BCHR]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[BCRH]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[BHCR]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[BHRC]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[HCRB]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[HCBR]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[HBRC]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[HBCR]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[HRCB]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[HRBC]" && (
                  <CAFMCard />  
                )} 

                {this.state.hubOpts === "[CRScH]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[CRHSc]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[CScHR]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[CScRH]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[CHScR]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[CHRSc]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[RCScH]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[RCHSc]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[RScCH]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[RScHC]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[RHScC]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[RHCSc]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[ScHCR]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[ScHRC]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[ScCRH]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[ScCHR]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[ScRCH]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[ScRHC]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[HRScC]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[HRCSc]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[HCRSc]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[HCScR]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[HScCR]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[HScRC]" && (
                  <CAFMCard />  
                )} 







                {/** complete below */}
                {this.state.hubOpts === "[CRBI]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[CRScI]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[CRHI]" && (
                  <CAFMCard />  
                )} 
                {/** 5 Cards */}

                {this.state.hubOpts === "[CRKBSc]" && (
                  <CAFMCard />  
                )} 
                {this.state.hubOpts === "[CRKBH]" && (
                  <CAFMCard />  
                )} 
                {/** 6 Cards */}
                {/** 7 Cards */}
              </div>
            </div>
            <div className="col s12 m4">
              <div>
                {/** All Options */}
              {this.state.hubOpts === "[CIRSKBScH]" && (
                  <REPCard />
                )}
                {/** Only 1 */}
                {this.state.hubOpts === "[R]" && (
                 <REPCard />
                )}
                {/** 2 Cards */}
                {this.state.hubOpts === "[RC]" && (
                 <REPCard />
                )}
                {this.state.hubOpts === "[CR]" && (
                 <REPCard />
                )}
                {this.state.hubOpts === "[RI]" && (
                 <REPCard />
                )}
                {this.state.hubOpts === "[IR]" && (
                 <REPCard />
                )}
                {this.state.hubOpts === "[RS]" && (
                 <REPCard />
                )}
                {this.state.hubOpts === "[SR]" && (
                 <REPCard />
                )}
                {this.state.hubOpts === "[RK]" && (
                 <REPCard />
                )}
                {this.state.hubOpts === "[KR]" && (
                 <REPCard />
                )}
                {this.state.hubOpts === "[RB]" && (
                 <REPCard />
                )}
                {this.state.hubOpts === "[BR]" && (
                 <REPCard />
                )}
                {this.state.hubOpts === "[RSc]" && (
                 <REPCard />
                )}
                {this.state.hubOpts === "[ScR]" && (
                  <REPCard />
                )}
                {this.state.hubOpts === "[RH]" && (
                 <REPCard />
                )}
                {this.state.hubOpts === "[HR]" && (
                 <REPCard />
                )}
                {/** 3 Cards */}
                {/** Incl. CAFM and Reports in 3-way Combi */}
                {this.state.hubOpts === "[CIR]" && (
                  <REPCard />
                )}
                {this.state.hubOpts === "[CRI]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[ICR]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[IRC]" && (
                  <REPCard />
                )}
                {this.state.hubOpts === "[RIC]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[RCI]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[CRS]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[CSR]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[RCS]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RSC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SRC]" && (
                  <CAFMCard />  
                )}
                {this.state.hubOpts === "[SCR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[CRK]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[CKR]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[RCK]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[RKC]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[KRC]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[KCR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[CRB]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[CBR]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[RBC]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RCB]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[BRC]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[BCR]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[CRSc]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[CScR]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[ScCR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[ScRC]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RScC]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RCSc]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[CRH]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[CHR]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[RHC]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RCH]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[HRC]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[HCR]" && (
                  <REPCard />   
                )}
                {/** 3-way Combination Report Cards excl. CAFM */}
                {this.state.hubOpts === "[RIS]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RSI]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[SIR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[SRI]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[ISR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[IRS]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RIK]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RKI]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[KIR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[KRI]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[IRK]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[IKR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RIB]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RBI]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[BIR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[BRI]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[IRB]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[IBR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RISc]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RScI]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[IScR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[IScR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[ScRI]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[ScIR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RIH]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RHI]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[IHR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[IRH]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[HRI]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[HIR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RSK]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RKS]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[KRS]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[KSR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[SRK]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[SKR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RSB]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RBS]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[SBR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[SRB]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[BSR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[BRS]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RSSc]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RScS]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[SScR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[SRSc]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[ScRS]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[ScSR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RSH]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RHS]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RSH]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[SHR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[SRH]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[HRS]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[HSR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RKB]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RBK]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[KBR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[KRB]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[BRK]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[BKR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RKSc]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RScK]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[ScRK]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[ScKR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[KRSc]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[KScR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RKH]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RHK]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[KRH]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[KHR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[HRK]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[HKR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RBSc]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RScB]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[BRSc]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[BScR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[ScRB]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[ScBR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RBH]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RHB]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[BRH]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[BHR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[HRB]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[HBR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RScH]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[RHSc]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[ScHR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[ScRH]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[HScR]" && (
                  <REPCard />   
                )}
                {this.state.hubOpts === "[HRSc]" && (
                  <REPCard />   
                )}
                {/** 4 Cards */}
                {this.state.hubOpts === "[CRKB]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[CRBK]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[CKRB]" && (
                  <REPCard />  
                )}   
                {this.state.hubOpts === "[CKBR]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[CBRK]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[CBKR]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[BCKR]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[BCRK]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[BRCK]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[BRKC]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[BKRC]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[BKCR]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[KBRC]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[KBCR]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[KRCB]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[KRBC]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[KCBR]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[KCRB]" && (
                  <REPCard />  
                )}  
                {this.state.hubOpts === "[RCKB]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[RCBK]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[RKBC]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[RKCB]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[RBKC]" && (
                  <REPCard />  
                )}
                {this.state.hubOpts === "[RBCK]" && (
                  <REPCard />  
                )}


                {this.state.hubOpts === "[CRKSc]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[CRScK]" && (
                  <REPCard />   
                )} 
                {this.state.hubOpts === "[CKScR]" && (
                  <REPCard />   
                )} 
                {this.state.hubOpts === "[CKRSc]" && (
                  <REPCard />   
                )} 
                {this.state.hubOpts === "[CScRK]" && (
                  <REPCard />   
                )} 
                {this.state.hubOpts === "[CScKR]" && (
                  <REPCard />   
                )} 
                {this.state.hubOpts === "[RKCSc]" && (
                  <REPCard />   
                )} 
                {this.state.hubOpts === "[RKScC]" && (
                  <REPCard />   
                )} 
                {this.state.hubOpts === "[RCKSc]" && (
                  <REPCard />   
                )} 
                {this.state.hubOpts === "[RCScK]" && (
                  <REPCard />   
                )} 
                {this.state.hubOpts === "[RScKC]" && (
                  <REPCard />   
                )} 
                {this.state.hubOpts === "[RScCK]" && (
                  <REPCard />   
                )} 
                {this.state.hubOpts === "[KRCSc]" && (
                  <REPCard />   
                )} 
                {this.state.hubOpts === "[KRScC]" && (
                  <REPCard />   
                )} 
                {this.state.hubOpts === "[KScRC]" && (
                  <REPCard />   
                )} 
                {this.state.hubOpts === "[KScCR]" && (
                  <REPCard />   
                )} 
                {this.state.hubOpts === "[KCScR]" && (
                  <REPCard />   
                )} 
                {this.state.hubOpts === "[KCRSc]" && (
                  <REPCard />   
                )} 
                {this.state.hubOpts === "[ScCRK]" && (
                  <REPCard />   
                )} 
                {this.state.hubOpts === "[ScCKR]" && (
                  <REPCard />   
                )} 
                {this.state.hubOpts === "[ScKRC]" && (
                  <REPCard />   
                )} 
                {this.state.hubOpts === "[ScKCR]" && (
                  <REPCard />   
                )} 
                {this.state.hubOpts === "[ScRCK]" && (
                  <REPCard />   
                )} 
                {this.state.hubOpts === "[ScRKC]" && (
                  <REPCard />   
                )} 
                
                {this.state.hubOpts === "[CRKH]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[CRHK]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[CKRH]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[CKHR]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[CHKR]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[CHRK]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[RCKH]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[RCHK]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[RKCH]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[RKHC]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[RHKC]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[RHCK]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[KCRH]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[KCHR]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[KRCH]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[KRHC]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[KHRC]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[KHCR]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[HCRK]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[HCKR]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[HRCK]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[HRKC]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[HKRC]" && (
                  <REPCard />   
                )}   
                {this.state.hubOpts === "[HKCR]" && (
                  <REPCard />   
                )}   
                
                {this.state.hubOpts === "[CRBSc]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[CRScB]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[CBScR]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[CBRSc]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[CScRB]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[CScBR]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[RCBSc]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[RCScB]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[RBCSc]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[RBScC]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[RScBC]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[RScCB]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[BRCSc]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[BRScC]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[BCRSc]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[BCScR]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[BScRC]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[BScCR]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[ScCRB]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[ScCBR]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[ScBCR]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[ScBRC]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[ScRCB]" && (
                  <REPCard /> 
                )}
                {this.state.hubOpts === "[ScRBC]" && (
                  <REPCard /> 
                )}


                {this.state.hubOpts === "[CRBH]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[CRHB]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[CBRH]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[CBHR]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[CHBR]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[CHRB]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[RCBH]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[RCHB]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[RBHC]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[RBCH]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[RHBC]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[RHCB]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[BRCH]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[BRHC]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[BCHR]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[BCRH]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[BHCR]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[BHRC]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[HCRB]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[HCBR]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[HBRC]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[HBCR]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[HRCB]" && (
                  <REPCard /> 
                )} 
                {this.state.hubOpts === "[HRBC]" && (
                  <REPCard /> 
                )} 

                {this.state.hubOpts === "[CRScH]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[CRHSc]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[CScHR]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[CScRH]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[CHScR]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[CHRSc]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[RCScH]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[RCHSc]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[RScCH]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[RScHC]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[RHScC]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[RHCSc]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[ScHCR]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[ScHRC]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[ScCRH]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[ScCHR]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[ScRCH]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[ScRHC]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[HRScC]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[HRCSc]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[HCRSc]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[HCScR]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[HScCR]" && (
                  <REPCard />  
                )} 
                {this.state.hubOpts === "[HScRC]" && (
                  <REPCard />  
                )} 


                {/** 5 Cards */}
                {this.state.hubOpts === "[CRKBSc]" && (
                  <REPCard />  
                )} 

                {this.state.hubOpts === "[CRKBH]" && (
                  <REPCard />    
                )} 

                {/** 6 Cards */}
                {/** 7 Cards */}
              </div>
            </div>
            <div className="col s12 m4">
              <div>
                {/** All Options */}
              {this.state.hubOpts === "[CIRSKBScH]" && (
                  <IOTCard />
                )}
                {/** Only 1 */}
              {this.state.hubOpts === "[K]" && (
                  <IOTCard />
                )}
                {/** 2 Cards */}
               {this.state.hubOpts === "[KC]" && (
                  <IOTCard />
                )}
                {this.state.hubOpts === "[CK]" && (
                  <IOTCard />
                )}
                {this.state.hubOpts === "[KI]" && (
                  <IOTCard />
                )}
                {this.state.hubOpts === "[IK]" && (
                  <IOTCard />
                )}
                {this.state.hubOpts === "[KR]" && (
                  <IOTCard />
                )}
                {this.state.hubOpts === "[RK]" && (
                  <IOTCard />
                )}
                {this.state.hubOpts === "[KS]" && (
                  <IOTCard />
                )}
                {this.state.hubOpts === "[SK]" && (
                  <IOTCard />
                )}
                {this.state.hubOpts === "[KB]" && (
                  <IOTCard />
                )}
                {this.state.hubOpts === "[BK]" && (
                  <IOTCard />
                )}
                {this.state.hubOpts === "[KSc]" && (
                  <IOTCard />
                )}
                {this.state.hubOpts === "[ScK]" && (
                  <IOTCard />
                )}
                {this.state.hubOpts === "[KH]" && (
                  <IOTCard />
                )}
                {this.state.hubOpts === "[HK]" && (
                  <IOTCard />
                )}
                {/** 3 Cards */}
                {/** Incl. CAFM and IOT 3-way combination */}
                {this.state.hubOpts === "[CKI]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[CIK]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[KIC]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[KCI]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[ICK]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[IKC]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[CKR]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[CRK]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[KCR]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[KRC]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[RCK]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[RKC]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[CKS]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[CSK]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[SCK]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[SKC]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[KSC]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[KCS]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[CKB]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[CBK]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[BCK]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[BKC]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[KCB]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[KBC]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[CKSc]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[CScK]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[KScC]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[KCSc]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[ScKC]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[ScCK]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[CKH]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[CHK]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[KHC]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[KCH]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[HKC]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[HCK]" && (
                  <IOTCard />  
                )}
                {/** 3 Card combi excl. CAFM */}
                {this.state.hubOpts === "[RKB]" && (
                   <IOTCard />   
                )}
                {this.state.hubOpts === "[RBK]" && (
                   <IOTCard />   
                )}
                {this.state.hubOpts === "[KBR]" && (
                   <IOTCard />   
                )}
                {this.state.hubOpts === "[KRB]" && (
                   <IOTCard />   
                )}
                {this.state.hubOpts === "[BRK]" && (
                   <IOTCard />   
                )}
                {this.state.hubOpts === "[BKR]" && (
                   <IOTCard />   
                )}

                {this.state.hubOpts === "[RKSc]" && (
                   <IOTCard />   
                )}
                {this.state.hubOpts === "[RScK]" && (
                   <IOTCard />   
                )}
                {this.state.hubOpts === "[ScRK]" && (
                   <IOTCard />   
                )}
                {this.state.hubOpts === "[ScKR]" && (
                   <IOTCard />   
                )}
                {this.state.hubOpts === "[KRSc]" && (
                   <IOTCard />   
                )}
                {this.state.hubOpts === "[KScR]" && (
                   <IOTCard />   
                )}

                {this.state.hubOpts === "[RKH]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[RHK]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[KRH]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[KHR]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[HRK]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[HKR]" && (
                   <IOTCard />    
                )}
                {/** 3 Cards combi exclu. Reports  */}
                {this.state.hubOpts === "[KISc]" && (
                   <IOTCard />    
                )}
                {/** complete with different comb of 3 letter for intranet+K */}
                {this.state.hubOpts === "[KBSc]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[KScB]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[BScK]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[BKSc]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[ScBK]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[ScKB]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[KBH]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[KHB]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[BHK]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[BKH]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[HKB]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[HBK]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[KBS]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[KSB]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[BSK]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[BKS]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[SKB]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[BSK]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[KScH]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[KHSc]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[ScHK]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[ScKH]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[HScK]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[HKSc]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[KScS]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[KSSc]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[ScSK]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[ScKS]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[SScK]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[SKSc]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[KHS]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[KSH]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[HKS]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[HSK]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[SKH]" && (
                   <IOTCard />    
                )}
                {this.state.hubOpts === "[SHK]" && (
                   <IOTCard />    
                )}
                {/** 4 Cards */}
                {this.state.hubOpts === "[CRKB]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[CRBK]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[CKRB]" && (
                  <IOTCard />  
                )}   
                {this.state.hubOpts === "[CKBR]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[CBRK]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[CBKR]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[BCKR]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[BCRK]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[BRCK]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[BRKC]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[BKRC]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[BKCR]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[KBRC]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[KBCR]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[KRCB]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[KRBC]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[KCBR]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[KCRB]" && (
                  <IOTCard />  
                )}  
                {this.state.hubOpts === "[RCKB]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[RCBK]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[RKBC]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[RKCB]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[RBKC]" && (
                  <IOTCard />  
                )}
                {this.state.hubOpts === "[RBCK]" && (
                  <IOTCard />  
                )}
                

                {this.state.hubOpts === "[CRKSc]" && (
                  <IOTCard />  
                )}   
                {this.state.hubOpts === "[CRScK]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[CKScR]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[CKRSc]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[CScRK]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[CScKR]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[RKCSc]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[RKScC]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[RCKSc]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[RCScK]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[RScKC]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[RScCK]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[KRCSc]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[KRScC]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[KScRC]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[KScCR]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[KCScR]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[KCRSc]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[ScCRK]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[ScCKR]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[ScKRC]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[ScKCR]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[ScRCK]" && (
                  <IOTCard />  
                )} 
                {this.state.hubOpts === "[ScRKC]" && (
                  <IOTCard />  
                )} 

{this.state.hubOpts === "[CRKH]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[CRHK]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[CKRH]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[CKHR]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[CHKR]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[CHRK]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[RCKH]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[RCHK]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[RKCH]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[RKHC]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[RHKC]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[RHCK]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[KCRH]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[KCHR]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[KRCH]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[KRHC]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[KHRC]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[KHCR]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[HCRK]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[HCKR]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[HRCK]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[HRKC]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[HKRC]" && (
                  <IOTCard />   
                )}   
                {this.state.hubOpts === "[HKCR]" && (
                  <IOTCard />   
                )}   
                {/** 5 Cards */}
                {this.state.hubOpts === "[CRKBSc]" && (
                  <IOTCard />  
                )} 

                {this.state.hubOpts === "[CRKBH]" && (
                  <IOTCard /> 
                )} 
                {/** 6 Cards */}
                {/** 7 Cards */}
              </div>
            </div>
            </div>
            <div className="row">
            <div className={col}>
              <div>
                {/** All Options */}
              {this.state.hubOpts === "[CIRSKBScH]" && (
                  <RICard />
                )}
                {/** Only 1 */}
              {this.state.hubOpts === "[B]" && (
                 <RICard />
                )}
                {/** 2 Cards */}
              {this.state.hubOpts === "[BC]" && (
                 <RICard />
                )}
                {this.state.hubOpts === "[CB]" && (
                 <RICard />
                )}
                {this.state.hubOpts === "[BI]" && (
                 <RICard />
                )}
                {this.state.hubOpts === "[IB]" && (
                 <RICard />
                )}
                {this.state.hubOpts === "[BR]" && (
                 <RICard />
                )}
                {this.state.hubOpts === "[RB]" && (
                 <RICard />
                )}
                {this.state.hubOpts === "[BS]" && (
                 <RICard />
                )}
                {this.state.hubOpts === "[SB]" && (
                 <RICard />
                )}
                {this.state.hubOpts === "[BK]" && (
                 <RICard />
                )}
                {this.state.hubOpts === "[KB]" && (
                 <RICard />
                )}
                {this.state.hubOpts === "[BSc]" && (
                 <RICard />
                )}
                {this.state.hubOpts === "[ScB]" && (
                  <RICard />
                )}
                {this.state.hubOpts === "[BH]" && (
                 <RICard />
                )}
                {this.state.hubOpts === "[HB]" && (
                 <RICard />
                )}
                {/** 3 Cards */}
                {/** Incl. 3-way Combination CAFM and RI Cards */}
                {this.state.hubOpts === "[CBI]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[CIB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BIC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BCI]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[ICB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[IBC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[CBR]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[CRB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BRC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BCR]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[RBC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[RCB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[CBS]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[CSB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BSC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BCS]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[SBC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[SCB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[CBK]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[CKB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BKC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BCK]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[KBC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[KCB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[CBSc]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[CScB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BCSc]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BScC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[ScCB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[ScBC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[CBH]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[CHB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BHC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BCH]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[HCB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[HBC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[RKB]" && (
                   <RICard />   
                )}
                {this.state.hubOpts === "[RBK]" && (
                   <RICard />   
                )}
                {this.state.hubOpts === "[KBR]" && (
                   <RICard />   
                )}
                {this.state.hubOpts === "[KRB]" && (
                   <RICard />   
                )}
                {this.state.hubOpts === "[BRK]" && (
                   <RICard />   
                )}
                {this.state.hubOpts === "[BKR]" && (
                   <RICard />   
                )}

                {this.state.hubOpts === "[RBSc]" && (
                   <RICard />    
                )}
                {this.state.hubOpts === "[RScB]" && (
                   <RICard />    
                )}
                {this.state.hubOpts === "[BRSc]" && (
                   <RICard />    
                )}
                {this.state.hubOpts === "[BScR]" && (
                   <RICard />    
                )}
                {this.state.hubOpts === "[ScRB]" && (
                   <RICard />    
                )}
                {this.state.hubOpts === "[ScBR]" && (
                   <RICard />    
                )}
                {this.state.hubOpts === "[RBH]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[RHB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BRH]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BHR]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[HRB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[HBR]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[KBSc]" && (
                   <RICard />   
                )}
                {this.state.hubOpts === "[KScB]" && (
                   <RICard />   
                )}
                {this.state.hubOpts === "[BScK]" && (
                   <RICard />   
                )}
                {this.state.hubOpts === "[BKSc]" && (
                   <RICard />   
                )}
                {this.state.hubOpts === "[ScBK]" && (
                   <RICard />   
                )}
                {this.state.hubOpts === "[ScKB]" && (
                   <RICard />   
                )}

                {this.state.hubOpts === "[KBH]" && (
                   <RICard />
                )}
                {this.state.hubOpts === "[KHB]" && (
                   <RICard />
                )}
                {this.state.hubOpts === "[BHK]" && (
                   <RICard />
                )}
                {this.state.hubOpts === "[BKH]" && (
                   <RICard />
                )}
                {this.state.hubOpts === "[HKB]" && (
                   <RICard />
                )}
                {this.state.hubOpts === "[HBK]" && (
                   <RICard />
                )}
                {/** 3-way combi excl. Reports Card */}
                {this.state.hubOpts === "[BHS]" && (
                   <RICard />
                )}
                {this.state.hubOpts === "[BHI]" && (
                   <RICard />
                )}
                {this.state.hubOpts === "[BScI]" && (
                   <RICard />
                )}
                {this.state.hubOpts === "[BScH]" && (
                   <RICard />
                )}
                {this.state.hubOpts === "[BHSc]" && (
                   <RICard />
                )}
                {this.state.hubOpts === "[HBSc]" && (
                   <RICard />
                )}
                {this.state.hubOpts === "[HScB]" && (
                   <RICard />
                )}
                {this.state.hubOpts === "[ScHB]" && (
                   <RICard />
                )}
                {this.state.hubOpts === "[ScBH]" && (
                   <RICard />
                )}
                {/** 4 Cards */}
                {this.state.hubOpts === "[CRKB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[CRBK]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[CKRB]" && (
                  <RICard />  
                )}   
                {this.state.hubOpts === "[CKBR]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[CBRK]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[CBKR]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BCKR]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BCRK]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BRCK]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BRKC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BKRC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BKCR]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[KBRC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[KBCR]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[KRCB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[KRBC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[KCBR]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[KCRB]" && (
                  <RICard />  
                )}  
                {this.state.hubOpts === "[RCKB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[RCBK]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[RKBC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[RKCB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[RBKC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[RBCK]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[CRBSc]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[CRScB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[CBScR]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[CBRSc]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[CScRB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[CScBR]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[RCBSc]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[RCScB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[RBCSc]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[RBScC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[RScBC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[RScCB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BRCSc]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BRScC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BCRSc]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BCScR]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BScRC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[BScCR]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[ScCRB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[ScCBR]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[ScBCR]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[ScBRC]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[ScRCB]" && (
                  <RICard />  
                )}
                {this.state.hubOpts === "[ScRBC]" && (
                  <RICard />  
                )}
                
                {this.state.hubOpts === "[CRBH]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[CRHB]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[CBRH]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[CBHR]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[CHBR]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[CHRB]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[RCBH]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[RCHB]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[RBHC]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[RBCH]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[RHBC]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[RHCB]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[BRCH]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[BRHC]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[BCHR]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[BCRH]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[BHCR]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[BHRC]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[HCRB]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[HCBR]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[HBRC]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[HBCR]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[HRCB]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[HRBC]" && (
                  <RICard />  
                )} 


                {/** 5 Cards */}
                {this.state.hubOpts === "[CRKBSc]" && (
                  <RICard />  
                )} 
                {this.state.hubOpts === "[CRKBH]" && (
                   <RICard />  
                )} 
                {/** 6 Cards */}
                {/** 7 Cards */}
              </div>
            </div>
            <div className="col s12 m4">
              <div>
                {/** All Options */}
              {this.state.hubOpts === "[CIRSKBScH]" && (
                  <SettingsCard />
                )}
                {/** Only 1 */}
                {this.state.hubOpts === "[Sc]" && (
                  <SettingsCard />
                )}
                {/** 2 Cards */}
                {this.state.hubOpts === "[CSc]" && (
                  <SettingsCard />
                )}
                {this.state.hubOpts === "[ScC]" && (
                  <SettingsCard />
                )}
                {this.state.hubOpts === "[ScI]" && (
                  <SettingsCard />
                )}
                {this.state.hubOpts === "[ISc]" && (
                  <SettingsCard />
                )}
                {this.state.hubOpts === "[ScR]" && (
                  <SettingsCard />
                )}
                {this.state.hubOpts === "[RSc]" && (
                  <SettingsCard />
                )}
                {this.state.hubOpts === "[ScS]" && (
                  <SettingsCard />
                )}
                {this.state.hubOpts === "[SSc]" && (
                  <SettingsCard />
                )}
                {this.state.hubOpts === "[ScK]" && (
                  <SettingsCard />
                )}
                {this.state.hubOpts === "[KSc]" && (
                  <SettingsCard />
                )}
                {this.state.hubOpts === "[ScB]" && (
                  <SettingsCard />
                )}
                {this.state.hubOpts === "[BSc]" && (
                  <SettingsCard />
                )}
                {this.state.hubOpts === "[ScH]" && (
                  <SettingsCard />
                )}
                {this.state.hubOpts === "[HSc]" && (
                  <SettingsCard />
                )}
                {/** 3 Cards */}
                {/** Incl. 3-way combination CAFM and Settings Cards */}
                {this.state.hubOpts === "[CScI]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[CISc]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[ScIC]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[ScCI]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[ICSc]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[IScC]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[CScR]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[CRSc]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[ScRC]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[ScCR]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[RScC]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[RCSc]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[CScS]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[CSSc]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[ScSC]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[ScCS]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[SCSc]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[SScC]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[CKSc]" && (
                   <SettingsCard />    
                )}
                {this.state.hubOpts === "[CScK]" && (
                   <SettingsCard />    
                )}
                {this.state.hubOpts === "[KScC]" && (
                   <SettingsCard />    
                )}
                {this.state.hubOpts === "[KCSc]" && (
                   <SettingsCard />    
                )}
                {this.state.hubOpts === "[ScKC]" && (
                   <SettingsCard />    
                )}
                {this.state.hubOpts === "[ScCK]" && (
                   <SettingsCard />    
                )}
                {this.state.hubOpts === "[CScB]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[CBSc]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[ScCB]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[ScBC]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[BCSc]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[BScC]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[CScH]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[CHSc]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[ScCH]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[ScHC]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[HScC]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[HCSc]" && (
                  <SettingsCard />  
                )}

                {this.state.hubOpts === "[RKSc]" && (
                  <SettingsCard />   
                )}
                {this.state.hubOpts === "[RScK]" && (
                  <SettingsCard />   
                )}
                {this.state.hubOpts === "[ScRK]" && (
                  <SettingsCard />   
                )}
                {this.state.hubOpts === "[ScKR]" && (
                  <SettingsCard />   
                )}
                {this.state.hubOpts === "[KRSc]" && (
                  <SettingsCard />   
                )}
                {this.state.hubOpts === "[KScR]" && (
                  <SettingsCard />   
                )}

                {this.state.hubOpts === "[RBSc]" && (
                   <SettingsCard />    
                )}
                {this.state.hubOpts === "[RScB]" && (
                   <SettingsCard />    
                )}
                {this.state.hubOpts === "[BRSc]" && (
                   <SettingsCard />    
                )}
                {this.state.hubOpts === "[BScR]" && (
                   <SettingsCard />    
                )}
                {this.state.hubOpts === "[ScRB]" && (
                   <SettingsCard />    
                )}
                {this.state.hubOpts === "[ScBR]" && (
                   <SettingsCard />    
                )}
                {this.state.hubOpts === "[RScH]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[RHSc]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[ScHR]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[ScRH]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[HScR]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[HRSc]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[KBSc]" && (
                   <SettingsCard />   
                )}
                {this.state.hubOpts === "[KScB]" && (
                   <SettingsCard />   
                )}
                {this.state.hubOpts === "[BScK]" && (
                   <SettingsCard />   
                )}
                {this.state.hubOpts === "[BKSc]" && (
                   <SettingsCard />   
                )}
                {this.state.hubOpts === "[ScBK]" && (
                   <SettingsCard />   
                )}
                {this.state.hubOpts === "[ScKB]" && (
                   <SettingsCard />   
                )}
                {this.state.hubOpts === "[KScH]" && (
                   <SettingsCard />     
                )}
                {this.state.hubOpts === "[KHSc]" && (
                   <SettingsCard />     
                )}
                {this.state.hubOpts === "[ScHK]" && (
                   <SettingsCard />     
                )}
                {this.state.hubOpts === "[ScKH]" && (
                   <SettingsCard />     
                )}
                {this.state.hubOpts === "[HScK]" && (
                   <SettingsCard />     
                )}
                {this.state.hubOpts === "[HKSc]" && (
                   <SettingsCard />     
                )}
                {this.state.hubOpts === "[BScH]" && (
                  <SettingsCard />   
                )}
                {this.state.hubOpts === "[BHSc]" && (
                  <SettingsCard />   
                )}
                {this.state.hubOpts === "[HBSc]" && (
                  <SettingsCard />   
                )}
                {this.state.hubOpts === "[HScB]" && (
                  <SettingsCard />   
                )}
                {this.state.hubOpts === "[ScHB]" && (
                  <SettingsCard />   
                )}
                {this.state.hubOpts === "[ScBH]" && (
                  <SettingsCard />   
                )}

                {/** 4 Cards */}
                
                {this.state.hubOpts === "[CRKSc]" && (
                  <SettingsCard />    
                )}   
                {this.state.hubOpts === "[CRScK]" && (
                  <SettingsCard />    
                )} 
                {this.state.hubOpts === "[CKScR]" && (
                  <SettingsCard />    
                )} 
                {this.state.hubOpts === "[CKRSc]" && (
                  <SettingsCard />    
                )} 
                {this.state.hubOpts === "[CScRK]" && (
                  <SettingsCard />    
                )} 
                {this.state.hubOpts === "[CScKR]" && (
                  <SettingsCard />    
                )} 
                {this.state.hubOpts === "[RKCSc]" && (
                  <SettingsCard />    
                )} 
                {this.state.hubOpts === "[RKScC]" && (
                  <SettingsCard />    
                )} 
                {this.state.hubOpts === "[RCKSc]" && (
                  <SettingsCard />    
                )} 
                {this.state.hubOpts === "[RCScK]" && (
                  <SettingsCard />    
                )} 
                {this.state.hubOpts === "[RScKC]" && (
                  <SettingsCard />    
                )} 
                {this.state.hubOpts === "[RScCK]" && (
                  <SettingsCard />    
                )} 
                {this.state.hubOpts === "[KRCSc]" && (
                  <SettingsCard />    
                )} 
                {this.state.hubOpts === "[KRScC]" && (
                  <SettingsCard />    
                )} 
                {this.state.hubOpts === "[KScRC]" && (
                  <SettingsCard />    
                )} 
                {this.state.hubOpts === "[KScCR]" && (
                  <SettingsCard />    
                )} 
                {this.state.hubOpts === "[KCScR]" && (
                  <SettingsCard />    
                )} 
                {this.state.hubOpts === "[KCRSc]" && (
                  <SettingsCard />    
                )} 
                {this.state.hubOpts === "[ScCRK]" && (
                  <SettingsCard />    
                )} 
                {this.state.hubOpts === "[ScCKR]" && (
                  <SettingsCard />    
                )} 
                {this.state.hubOpts === "[ScKRC]" && (
                  <SettingsCard />    
                )} 
                {this.state.hubOpts === "[ScKCR]" && (
                  <SettingsCard />    
                )} 
                {this.state.hubOpts === "[ScRCK]" && (
                  <SettingsCard />    
                )} 
                {this.state.hubOpts === "[ScRKC]" && (
                  <SettingsCard />    
                )} 

                {this.state.hubOpts === "[CRBSc]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[CRScB]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[CBScR]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[CBRSc]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[CScRB]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[CScBR]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[RCBSc]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[RCScB]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[RBCSc]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[RBScC]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[RScBC]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[RScCB]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[BRCSc]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[BRScC]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[BCRSc]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[BCScR]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[BScRC]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[BScCR]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[ScCRB]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[ScCBR]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[ScBCR]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[ScBRC]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[ScRCB]" && (
                  <SettingsCard />  
                )}
                {this.state.hubOpts === "[ScRBC]" && (
                  <SettingsCard />  
                )}


{this.state.hubOpts === "[CRScH]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[CRHSc]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[CScHR]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[CScRH]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[CHScR]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[CHRSc]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[RCScH]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[RCHSc]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[RScCH]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[RScHC]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[RHScC]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[RHCSc]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[ScHCR]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[ScHRC]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[ScCRH]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[ScCHR]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[ScRCH]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[ScRHC]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[HRScC]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[HRCSc]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[HCRSc]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[HCScR]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[HScCR]" && (
                  <SettingsCard />   
                )} 
                {this.state.hubOpts === "[HScRC]" && (
                  <SettingsCard />   
                )} 

                {/** 5 Cards */}
                {this.state.hubOpts === "[CRKBSc]" && (
                  <SettingsCard />  
                )} 
                {/** 6 Cards */}
                {/** 7 Cards */}
              </div> 
            </div>
            <div className={col}>
              <div>
                {/** All Options */}
              {this.state.hubOpts === "[CIRSKBScH]" && (
                  <HELPCard />
                )}
                {/** Only 1 */}
              {this.state.hubOpts === "[H]" && (
                  <HELPCard />
                )}
                {/** 2 Cards */}
                 {this.state.hubOpts === "[HC]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[CH]" && (
                  <HELPCard />
                )}
                 {this.state.hubOpts === "[HI]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[IH]" && (
                  <HELPCard />
                )}
                 {this.state.hubOpts === "[HR]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[RH]" && (
                  <HELPCard />
                )}
                 {this.state.hubOpts === "[HS]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[SH]" && (
                  <HELPCard />
                )}
                 {this.state.hubOpts === "[HK]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[KH]" && (
                  <HELPCard />
                )}
                 {this.state.hubOpts === "[HSc]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[ScH]" && (
                  <HELPCard />
                )}
                 {this.state.hubOpts === "[HB]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[BH]" && (
                  <HELPCard />
                )}
                {/** 3 Cards */}
                {/** Incl. 3-way combination with CAFM & Help Desk Card */}
                {this.state.hubOpts === "[CHI]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[CIH]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[IHC]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[HIC]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[HCI]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[ICH]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[CHR]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[CRH]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[HRC]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[HCR]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[RCH]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[RHC]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[CHS]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[CSH]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[HSC]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[HCS]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[SHC]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[SCH]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[CHK]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[CKH]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[HKC]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[HCK]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[KCH]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[KHC]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[CHB]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[CBH]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[HBC]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[HCB]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[BHC]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[BCH]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[CHSc]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[CScH]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[ScCH]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[ScHC]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[HScC]" && (
                  <HELPCard />
                )}
                {this.state.hubOpts === "[HCSc]" && (
                  <HELPCard />
                )}

                {this.state.hubOpts === "[RKH]" && (
                   <HELPCard />    
                )}
                {this.state.hubOpts === "[RHK]" && (
                   <HELPCard />    
                )}
                {this.state.hubOpts === "[KRH]" && (
                   <HELPCard />    
                )}
                {this.state.hubOpts === "[KHR]" && (
                   <HELPCard />    
                )}
                {this.state.hubOpts === "[HRK]" && (
                   <HELPCard />    
                )}
                {this.state.hubOpts === "[HKR]" && (
                   <HELPCard />    
                )}

                {this.state.hubOpts === "[RBH]" && (
                  <HELPCard />   
                )}
                {this.state.hubOpts === "[RHB]" && (
                  <HELPCard />   
                )}
                {this.state.hubOpts === "[BRH]" && (
                  <HELPCard />   
                )}
                {this.state.hubOpts === "[BHR]" && (
                  <HELPCard />   
                )}
                {this.state.hubOpts === "[HRB]" && (
                  <HELPCard />   
                )}
                {this.state.hubOpts === "[HBR]" && (
                  <HELPCard />   
                )}  
                {this.state.hubOpts === "[RScH]" && (
                  <HELPCard />  
                )}
                {this.state.hubOpts === "[RHSc]" && (
                  <HELPCard />  
                )}
                {this.state.hubOpts === "[ScHR]" && (
                  <HELPCard />  
                )}
                {this.state.hubOpts === "[ScRH]" && (
                  <HELPCard />  
                )}
                {this.state.hubOpts === "[HScR]" && (
                  <HELPCard />  
                )}
                {this.state.hubOpts === "[HRSc]" && (
                  <HELPCard />  
                )}

                {this.state.hubOpts === "[KHS]" && (
                   <HELPCard />      
                )}
                {this.state.hubOpts === "[KSH]" && (
                   <HELPCard />      
                )}
                {this.state.hubOpts === "[HKS]" && (
                   <HELPCard />      
                )}
                {this.state.hubOpts === "[HSK]" && (
                   <HELPCard />      
                )}
                {this.state.hubOpts === "[SKH]" && (
                   <HELPCard />      
                )}
                {this.state.hubOpts === "[SHK]" && (
                   <HELPCard />      
                )}
                {this.state.hubOpts === "[KBH]" && (
                   <HELPCard />   
                )}
                {this.state.hubOpts === "[KHB]" && (
                   <HELPCard />   
                )}
                {this.state.hubOpts === "[BHK]" && (
                   <HELPCard />   
                )}
                {this.state.hubOpts === "[BKH]" && (
                   <HELPCard />   
                )}
                {this.state.hubOpts === "[HKB]" && (
                   <HELPCard />   
                )}
                {this.state.hubOpts === "[HBK]" && (
                   <HELPCard />   
                )}

                {this.state.hubOpts === "[KScH]" && (
                   <HELPCard />      
                )}
                {this.state.hubOpts === "[KHSc]" && (
                   <HELPCard />      
                )}
                {this.state.hubOpts === "[ScHK]" && (
                   <HELPCard />      
                )}
                {this.state.hubOpts === "[ScKH]" && (
                   <HELPCard />      
                )}
                {this.state.hubOpts === "[HScK]" && (
                   <HELPCard />      
                )}
                {this.state.hubOpts === "[HKSc]" && (
                   <HELPCard />      
                )}
                {this.state.hubOpts === "[BScH]" && (
                   <HELPCard />  
                )}
                {this.state.hubOpts === "[BHSc]" && (
                   <HELPCard />  
                )}
                {this.state.hubOpts === "[HBSc]" && (
                   <HELPCard />  
                )}
                {this.state.hubOpts === "[HScB]" && (
                   <HELPCard />  
                )}
                {this.state.hubOpts === "[ScHB]" && (
                   <HELPCard />  
                )}
                {this.state.hubOpts === "[ScBH]" && (
                   <HELPCard />  
                )}
                {/** 4 Cards */}

                {this.state.hubOpts === "[CRKH]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[CRHK]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[CKRH]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[CKHR]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[CHKR]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[CHRK]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[RCKH]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[RCHK]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[RKCH]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[RKHC]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[RHKC]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[RHCK]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[KCRH]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[KCHR]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[KRCH]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[KRHC]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[KHRC]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[KHCR]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[HCRK]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[HCKR]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[HRCK]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[HRKC]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[HKRC]" && (
                  <HELPCard />    
                )}   
                {this.state.hubOpts === "[HKCR]" && (
                  <HELPCard />    
                )}   

                {this.state.hubOpts === "[CRBH]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[CRHB]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[CBRH]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[CBHR]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[CHBR]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[CHRB]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[RCBH]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[RCHB]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[RBHC]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[RBCH]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[RHBC]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[RHCB]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[BRCH]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[BRHC]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[BCHR]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[BCRH]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[BHCR]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[BHRC]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[HCRB]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[HCBR]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[HBRC]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[HBCR]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[HRCB]" && (
                  <HELPCard />   
                )} 
                {this.state.hubOpts === "[HRBC]" && (
                  <HELPCard />   
                )} 
                
                {this.state.hubOpts === "[CRScH]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[CRHSc]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[CScHR]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[CScRH]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[CHScR]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[CHRSc]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[RCScH]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[RCHSc]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[RScCH]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[RScHC]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[RHScC]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[RHCSc]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[ScHCR]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[ScHRC]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[ScCRH]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[ScCHR]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[ScRCH]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[ScRHC]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[HRScC]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[HRCSc]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[HCRSc]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[HCScR]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[HScCR]" && (
                  <HELPCard /> 
                )} 
                {this.state.hubOpts === "[HScRC]" && (
                  <HELPCard /> 
                )} 


                {/** 5 Cards */}
                {this.state.hubOpts === "[CRKBH]" && (
                  <HELPCard />  
                )} 
                {/** 6 Cards */}
                {/** 7 Cards */}
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
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  token: state.auth.token
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(withTranslation("translations")(Home));

