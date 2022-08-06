import React, { Component} from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { withTranslation, Trans } from 'react-i18next';

class Workflows_card extends Component {
    render() {
      const {t, i18n} = this.props;
      return (
        <div className="workflows-card">
            <Link to="/Workflows">
            <svg id="worflow-card" xmlns="http://www.w3.org/2000/svg" width="186" height="172" viewBox="0 0 186 172">
                <g id="Group_65" data-name="Group 65" transform="translate(0.482 0.246)">
                  <g id="Group_32" data-name="Group 32" transform="translate(44.78 38.511)">
                    <path id="Path_25" data-name="Path 25" d="M24,6H49.394V9.174H24Z" transform="translate(10.917 0.349)" fill="#575676"/>
                    <path id="Path_26" data-name="Path 26" d="M24,10H49.394v3.174H24Z" transform="translate(10.917 2.697)" fill="#575676"/>
                    <path id="Path_27" data-name="Path 27" d="M24,14H49.394v3.174H24Z" transform="translate(10.917 5.045)" fill="#575676"/>
                    <path id="Path_28" data-name="Path 28" d="M27,27H49.22v3.174H27Z" transform="translate(12.678 12.678)" fill="#575676"/>
                    <path id="Path_29" data-name="Path 29" d="M25,31H47.22v3.174H25Z" transform="translate(11.504 15.027)" fill="#575676"/>
                    <path id="Path_30" data-name="Path 30" d="M23,35H45.22v3.174H23Z" transform="translate(10.33 17.375)" fill="#575676"/>
                    <path id="Path_31" data-name="Path 31" d="M24,48H39.762v3.125H24Z" transform="translate(10.917 25.008)" fill="#575676"/>
                    <path id="Path_32" data-name="Path 32" d="M24,52H49.394v3.174H24Z" transform="translate(10.917 27.356)" fill="#575676"/>
                    <path id="Path_33" data-name="Path 33" d="M24,56H49.394v3.174H24Z" transform="translate(10.917 29.705)" fill="#575676"/>
                    <path id="Path_34" data-name="Path 34" d="M20.252,84.53H30.568V95.64a1.587,1.587,0,0,0,1.587,1.587H67.072a1.587,1.587,0,0,0,1.587-1.587V84.53h3.284a12.7,12.7,0,1,0,0-3.174H68.659V70.246a1.587,1.587,0,0,0-1.587-1.587H32.155a1.587,1.587,0,0,0-1.587,1.587v11.11H20.252a15.078,15.078,0,1,1,0-30.155h9.613L25.908,61.754A1.587,1.587,0,0,0,27.394,63.9H62.311a1.588,1.588,0,0,0,1.486-1.03L68.172,51.2h10.8a18.252,18.252,0,0,0,0-36.5H68.659V3.587A1.587,1.587,0,0,0,67.072,2H32.155a1.587,1.587,0,0,0-1.587,1.587V28.981a1.587,1.587,0,0,0,1.587,1.587H67.072a1.587,1.587,0,0,0,1.587-1.587V17.871H78.976a15.078,15.078,0,0,1,0,30.155H69.363L73.32,37.474a1.587,1.587,0,0,0-1.486-2.144H36.917a1.588,1.588,0,0,0-1.486,1.03L31.055,48.027h-10.8a18.252,18.252,0,0,0,0,36.5ZM84.53,73.421a9.523,9.523,0,1,1-9.523,9.523A9.533,9.533,0,0,1,84.53,73.421ZM33.742,71.833H65.485v22.22H33.742ZM65.485,27.394H33.742V5.174H65.485ZM38.017,38.5H69.543L61.21,60.724H29.685Z" transform="translate(-2 -2)" fill="#575676"/>
                    <path id="Path_35" data-name="Path 35" d="M54.589,59.351a1.582,1.582,0,0,0,1.122-.465l6.348-6.348-2.244-2.244-5.226,5.226-2.052-2.052-2.244,2.244,3.174,3.174a1.582,1.582,0,0,0,1.122.465Z" transform="translate(26.354 26.354)" fill="#575676"/>
                  </g>
                </g>
                <text id="Procédures" transform="translate(57 154)" fill="#707070" font-size="14" font-family="HelveticaNeue, Helvetica Neue"><tspan x="0" y="0"><Trans>{t("workflowsCard")}</Trans></tspan></text>
              </svg>             
            </Link>
        </div>
      );
    }
  }
  
  export default(withTranslation("translations")(Workflows_card));