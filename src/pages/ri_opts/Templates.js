// styling 
import '../style/dashboard.css';
import evolvelogo from "../img/evolvelogo.png";

// dependencies 
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import Templates_card from "../components/Menu-items/templates-card";
import Checklists_card from "../components/Menu-items/checklists-card";
import Workflows_card from "../components/Menu-items/workflows-card";
import Contractor_card from "../components/Menu-items/contractor-card";
import Trainingmedia_card from "../components/Menu-items/trainingmedia-card";
import Admin_card from "../components/Menu-items/admin-card";
import CAFM_card from '../components/Menu-items/CAFM-card';
import SSRSrep_card from '../components/Menu-items/ssrsRep-card';

class Home extends Component {
  constructor() {
    super();
    this.state = {
        user: {
          id: "",
          name: "",
          role: "",
          client: ""
        }
    };
}

  
  getData = () => {
    this.state.userRole  = this.props.auth.role;
    this.state.user = {
      id: this.props.auth.user._id,
      name: this.props.auth.user.name,
      role: this.props.auth.user.role,
      client: this.props.auth.user.client
      // add other opts
    }
    return this.state.user;
    ///console.log(this.state.user);
    //console.log(this.state.userRole);
  }


  componentDidMount() { 
    this.getData();
    this.cafm();
    this.reps();
    console.log(this.state)
   }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  }

  colpts  = () => {
    let col = {};
    if(this.state.user.role === "admin"){
      col = "col s12 m3";
      return col;
    } else {
      col = "col s12 m4";
      return col;
    }
  }

  cafm = () => {
    const client = this.state.user.client;
    var link = {};
    if(client === "CMC LTD") {
      link = "https://serv.pfms.mu/IntraMobile/security/login";
      return link;
    } else if (client === "Helexia") {
      link = "https://demo.pfmi.eu/Intranet/security/login";
      return link;
    } else if(client === "E-VOLVE") {
      link = "https://serv.pfms.mu/IntraMobile/security/login";
      return link;
    }
  }

  reps = () => {
    const client = this.state.user.client;
    var link = {};
    if(client === "CMC LTD"){
      link = "https://serv.pfms.mu/reports/";
      return link;
    } 
    else if (client === "Helexia") {
      link = "https://demo.pfmi.eu/reports/browse/";
      return link;
    } else if(client === "E-VOLVE"){
      link = "https://serv.pfms.mu/reports/";
      return link;
    } 
  }
  

  render() {
    
    const user = this.getData();
    // console.log(user)
    const col= this.colpts();
    const CAFMSlink = this.cafm();
    const RepLink = this.reps();
    return (
      
      <div className="Home">
        <header>
          <div className="container">
            <div className="row">
            <h1 id="home-page-title">Resource Interface</h1>  
              <div className="col s1 m1">
                          <img id="logo-evolve" alt="_" src={evolvelogo}/>
                </div> 
              <div  className="col offset-s10 offset-m12">
                <button  id="lgout-btn-home" onClick={this.onLogoutClick} style={{ 
                              width: "100px",
                              borderRadius: "3px",
                              letterSpacing: "1.5px",
                              marginTop: "1rem"}}
                              className="btn btn-large waves-effect waves-dark hoverable white black-text accent-3">
                                  Logout
                              </button>
              </div>
            </div>
          </div>
        </header>

        
         <div id="main-menu-item-block"className="container">
          <div className="row">
            <div className="col s12 m3">
              <div>
                
                  <Templates_card />
                
              </div>
            </div>
            <div className="col s12 m3">
              <div>
                <Checklists_card />
              </div>
            </div>
            <div className="col s12 m3">
              <div>
                <Workflows_card id="workflows-card-test" />
              </div>
            </div>
            <div className="col s12 m3">
              <div>
                <Contractor_card />
              </div>
            </div>
            </div>
            <div className="row">
            <div className={col}>
              <div>
                <Trainingmedia_card />
              </div>
            </div>
            <div className={col}>
              <div>
                <a target="_blank" href={RepLink}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="186" height="172" viewBox="0 0 186 172">
                    <g id="Group_79" data-name="Group 79" transform="translate(0.355 0.043)">
                      <rect id="Rectangle_5" data-name="Rectangle 5" width="186" height="172" rx="18" transform="translate(-0.355 -0.043)" fill="#bed6ef"/>
                    </g>
                    <g id="research" transform="translate(23.98 17.479)">
                      <path id="Path_87" data-name="Path 87" d="M120,264h5.3v3.53H120Z" transform="translate(-81.053 -193.659)" fill="#575676"/>
                      <path id="Path_88" data-name="Path 88" d="M176,304h5.3v3.53H176Z" transform="translate(-124.696 -224.833)" fill="#575676"/>
                      <path id="Path_89" data-name="Path 89" d="M120,304h8.826v3.53H120Z" transform="translate(-81.053 -224.833)" fill="#575676"/>
                      <path id="Path_90" data-name="Path 90" d="M56,304H66.591v3.53H56Z" transform="translate(-31.175 -224.833)" fill="#575676"/>
                      <path id="Path_91" data-name="Path 91" d="M104,344h21.183v3.53H104Z" transform="translate(-68.583 -256.007)" fill="#575676"/>
                      <path id="Path_92" data-name="Path 92" d="M56,344h7.061v3.53H56Z" transform="translate(-31.175 -256.007)" fill="#575676"/>
                      <path id="Path_93" data-name="Path 93" d="M152,384h10.591v3.53H152Z" transform="translate(-105.992 -287.181)" fill="#575676"/>
                      <path id="Path_94" data-name="Path 94" d="M56,384H73.652v3.53H56Z" transform="translate(-31.175 -287.181)" fill="#575676"/>
                      <path id="Path_95" data-name="Path 95" d="M104,424h10.591v3.53H104Z" transform="translate(-68.583 -318.355)" fill="#575676"/>
                      <path id="Path_96" data-name="Path 96" d="M56,424h7.061v3.53H56Z" transform="translate(-31.175 -318.355)" fill="#575676"/>
                      <path id="Path_97" data-name="Path 97" d="M118.383,215.061a1.765,1.765,0,0,0-1.765-1.765H106.027a1.765,1.765,0,0,0-1.765,1.765v8.826H95.435a1.765,1.765,0,0,0-1.765,1.765v8.826H84.844a1.765,1.765,0,0,0-1.765,1.765v8.826H74.253a1.765,1.765,0,0,0-1.765,1.765v10.591H59.827a5.3,5.3,0,1,0,0,3.53H61.9v5.3a1.767,1.767,0,0,1-1.765,1.765H21.3a1.767,1.767,0,0,1-1.765-1.765v-40.6h8.826a5.3,5.3,0,0,0,5.3-5.3V211.53H60.131A1.767,1.767,0,0,1,61.9,213.3v1.765h3.53V213.3a5.3,5.3,0,0,0-5.3-5.3H33.349a5.261,5.261,0,0,0-3.745,1.551L17.551,221.6A5.261,5.261,0,0,0,16,225.349v40.9a5.3,5.3,0,0,0,5.3,5.3H60.131a5.3,5.3,0,0,0,5.3-5.3v-5.3h56.487v-3.53h-3.53Zm-88.262-1.034v6.33a1.767,1.767,0,0,1-1.765,1.765h-6.33Zm24.713,46.93a1.765,1.765,0,1,1,1.765-1.765A1.765,1.765,0,0,1,54.835,260.957ZM76.018,248.6h7.061v8.826H76.018Zm10.591-10.591H93.67v19.418H86.609ZM97.2,227.417h7.061v30.009H97.2Zm10.591,30.009v-40.6h7.061v40.6Z" transform="translate(-0.001 -150.016)" fill="#575676"/>
                      <path id="Path_98" data-name="Path 98" d="M21.3,91.3a5.294,5.294,0,0,0,4.778-7.577l5.3-5.3a5.293,5.293,0,0,0,7.274-3.013h7.668a5.295,5.295,0,0,0,10.214-.89l9.969-8.545a5.3,5.3,0,1,0-2.4-2.592l-8.445,7.239a5.292,5.292,0,0,0-9.337,1.257H38.644a5.3,5.3,0,1,0-9.77,4.047l-5.3,5.3A5.3,5.3,0,1,0,21.3,91.3ZM68.956,59.522a1.765,1.765,0,1,1-1.765,1.765,1.765,1.765,0,0,1,1.765-1.765ZM51.3,71.878a1.765,1.765,0,1,1-1.765,1.765A1.765,1.765,0,0,1,51.3,71.878Zm-17.652,0a1.765,1.765,0,1,1-1.765,1.765A1.765,1.765,0,0,1,33.652,71.878ZM21.3,84.235A1.765,1.765,0,1,1,19.53,86,1.765,1.765,0,0,1,21.3,84.235Z" transform="translate(0 -31.547)" fill="#575676"/>
                      <path id="Path_99" data-name="Path 99" d="M197.412,56.907,185.744,68.575h-15.46a5.3,5.3,0,1,0,0,3.53h3.834V103.88h3.53V72.106h8.826a1.765,1.765,0,0,0,1.248-.517l12.74-12.74a23.011,23.011,0,1,0-3.052-1.941Zm-32.12,15.2a1.765,1.765,0,1,1,1.765-1.765A1.765,1.765,0,0,1,165.293,72.106Zm60.055-20.267L215.12,40.332h15.405A19.353,19.353,0,0,1,225.348,51.839ZM230.525,36.8H212.954V19.23A19.449,19.449,0,0,1,230.525,36.8Zm-21.1-17.571V38.566a1.756,1.756,0,0,0,.447,1.171h0l12.841,14.447A19.414,19.414,0,1,1,209.424,19.23Z" transform="translate(-112.224)" fill="#575676"/>
                    </g>
                    <g id="Group_80" data-name="Group 80" transform="translate(66.569 136.758)">
                      <text id="Reports_Portal" data-name="Reports Portal" transform="translate(-18.569 20.242)" fill="#707070" font-size="14" font-family="HelveticaNeue, Helvetica Neue"><tspan x="0" y="0">Reports Portal</tspan></text>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
            <div className={col}>
              <div>
              <a  target="_blank" href={CAFMSlink}>
                <svg xmlns="http://www.w3.org/2000/svg" width="186" height="172" viewBox="0 0 186 172">
                  <g id="Group_78" data-name="Group 78" transform="translate(0.355 0.043)">
                    <rect id="Rectangle_5" data-name="Rectangle 5" width="186" height="172" rx="18" transform="translate(-0.355 -0.043)" fill="rgba(209,175,199,0.97)"/>
                  </g>
                  <g id="management" transform="translate(42.933 36.432)">
                    <path id="Path_80" data-name="Path 80" d="M114.765,54.524v-3.3a1.653,1.653,0,0,0,1.652-1.652V39.654A1.653,1.653,0,0,0,114.765,38h-8.922l-.32-1.241a30.532,30.532,0,0,0-3.371-8.073l-.661-1.106,6.335-6.346a1.638,1.638,0,0,0,0-2.313L100.808,11.9a1.676,1.676,0,0,0-2.314,0l-6.346,6.346-1.1-.661a30.6,30.6,0,0,0-8.083-3.372l-1.24-.323V4.957A1.652,1.652,0,0,0,80.067,3.3H70.154A1.652,1.652,0,0,0,68.5,4.957v8.922l-1.241.321a30.594,30.594,0,0,0-8.074,3.368l-1.106.662L51.737,11.9a1.676,1.676,0,0,0-2.322,0L42.4,18.913a1.641,1.641,0,0,0,0,2.323l6.346,6.346-.661,1.106a30.531,30.531,0,0,0-3.37,8.073L44.387,38H35.457A1.652,1.652,0,0,0,33.8,39.654v9.913a1.652,1.652,0,0,0,1.652,1.652v3.3A4.957,4.957,0,0,1,30.5,49.567V39.654A4.957,4.957,0,0,1,35.457,34.7H41.85A33.74,33.74,0,0,1,44.6,28.117l-4.544-4.544a4.94,4.94,0,0,1,0-7l7.022-7.022a5.06,5.06,0,0,1,7,0L58.617,14.1A33.745,33.745,0,0,1,65.2,11.351V4.957A4.957,4.957,0,0,1,70.154,0h9.913a4.957,4.957,0,0,1,4.957,4.957v6.394A33.752,33.752,0,0,1,91.6,14.1l4.544-4.544a5.061,5.061,0,0,1,7,0l7.021,7.02a4.943,4.943,0,0,1,0,7l-4.544,4.544a33.867,33.867,0,0,1,2.749,6.583h6.393a4.957,4.957,0,0,1,4.957,4.957v9.913A4.957,4.957,0,0,1,114.765,54.524Zm0,0" transform="translate(-25.043)" fill="#575676"/>
                    <path id="Path_81" data-name="Path 81" d="M206.763,153.131h-3.3a19.827,19.827,0,0,0-39.654,0h-3.3a23.131,23.131,0,0,1,46.263,0Zm0,0" transform="translate(-133.564 -108.521)" fill="#575676"/>
                    <path id="Path_82" data-name="Path 82" d="M250.413,249.827a9.913,9.913,0,1,1,9.913-9.913A9.914,9.914,0,0,1,250.413,249.827Zm0-16.522a6.609,6.609,0,1,0,6.609,6.609A6.609,6.609,0,0,0,250.413,233.3Zm0,0" transform="translate(-200.346 -191.998)" fill="#575676"/>
                    <path id="Path_83" data-name="Path 83" d="M420.413,289.827a9.913,9.913,0,1,1,9.914-9.913A9.914,9.914,0,0,1,420.413,289.827Zm0-16.522a6.609,6.609,0,1,0,6.609,6.609A6.609,6.609,0,0,0,420.413,273.3Zm0,0" transform="translate(-342.258 -225.389)" fill="#575676"/>
                    <path id="Path_84" data-name="Path 84" d="M80.413,289.827a9.913,9.913,0,1,1,9.913-9.913A9.914,9.914,0,0,1,80.413,289.827Zm0-16.522a6.609,6.609,0,1,0,6.609,6.609A6.609,6.609,0,0,0,80.413,273.3Zm0,0" transform="translate(-58.434 -225.389)" fill="#575676"/>
                    <path id="Path_85" data-name="Path 85" d="M93.134,369.2a14.7,14.7,0,0,0-8.37-2.587H71.547a14.786,14.786,0,0,0-2.4.218,14.826,14.826,0,0,0-4.046-4.2,6.41,6.41,0,0,0-.762-.5A14.754,14.754,0,0,0,56.676,360H43.458a14.7,14.7,0,0,0-12.468,6.827,14.848,14.848,0,0,0-2.4-.218H15.37a14.7,14.7,0,0,0-8.365,2.584A14.87,14.87,0,0,0,.5,381.479v6.609a11.576,11.576,0,0,0,6.728,10.5,11.2,11.2,0,0,0,4.837,1.068H28.588v-3.3H13.718V378.174h-3.3v18.009a7.756,7.756,0,0,1-1.8-.6,8.274,8.274,0,0,1-4.81-7.5v-6.609a11.577,11.577,0,0,1,5.066-9.56,11.428,11.428,0,0,1,6.5-2.005H28.588c.291,0,.572.031.856.05a14.869,14.869,0,0,0-.856,4.906v16.522a8.272,8.272,0,0,0,8.261,8.261h4.957V373.217H38.5v23.131H36.849a4.957,4.957,0,0,1-4.957-4.957V374.87A11.566,11.566,0,0,1,43.458,363.3H56.676A11.545,11.545,0,0,1,62.7,365a4.125,4.125,0,0,1,.482.309,11.7,11.7,0,0,1,3.7,4.131,11.54,11.54,0,0,1,1.357,5.427v16.522a4.957,4.957,0,0,1-4.957,4.957H61.633V373.217h-3.3v26.436h4.957a8.271,8.271,0,0,0,8.261-8.261V374.87a14.9,14.9,0,0,0-.855-4.906c.285-.019.565-.05.855-.05H84.765a11.436,11.436,0,0,1,6.5,2.008,11.58,11.58,0,0,1,5.061,9.557v6.609a8.273,8.273,0,0,1-4.837,7.511,7.6,7.6,0,0,1-1.772.585V378.174h-3.3v18.175H71.547v3.3H88.069a11.174,11.174,0,0,0,4.81-1.055,11.58,11.58,0,0,0,6.756-10.511v-6.609A14.87,14.87,0,0,0,93.134,369.2Zm0,0" transform="translate(0 -300.519)" fill="#575676"/>
                    <path id="Path_86" data-name="Path 86" d="M260.5,580h13.218v3.3H260.5Zm0,0" transform="translate(-217.042 -484.17)" fill="#575676"/>
                  </g>
                  <g id="Group_81" data-name="Group 81" transform="translate(31.569 135.758)">
                    <text id="Management_Portal" data-name="Management Portal" transform="translate(0.431 21.242)" fill="#707070" font-size="14" font-family="HelveticaNeue, Helvetica Neue"><tspan x="0" y="0">Management Portal</tspan></text>
                  </g>
                </svg>
            </a>
              </div>
            </div>
            <div className="col s12 m3">
              <div>
                {user.role === "admin" && (
                  <Admin_card />
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
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Home);