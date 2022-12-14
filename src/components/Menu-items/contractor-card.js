import React, { Component} from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import "../../App.css";import { withTranslation, Trans } from 'react-i18next';


class Contractor_card extends Component {
    render() {
      const {t, i18n} = this.props;
      return (
        <div className="contractor-card">
          <Link to="/contractor">
          <svg id="contractor-card" xmlns="http://www.w3.org/2000/svg" width="186" height="172" viewBox="0 0 186 172">
              <g id="Group_33" data-name="Group 33" transform="translate(48.717 36.763)">
                <path id="Path_44" data-name="Path 44" d="M33.175,24H29.881a3.294,3.294,0,0,1-6.587,0H20a6.587,6.587,0,0,0,13.175,0Z" transform="translate(4.702 12.23)"/>
                <rect id="Rectangle_14" data-name="Rectangle 14" width="4" height="3" transform="translate(23.283 29.237)"/>
                <rect id="Rectangle_15" data-name="Rectangle 15" width="3" height="3" transform="translate(36.283 29.237)"/>
                <path id="Path_45" data-name="Path 45" d="M93.748,78.66l-3.294-6.587a1.627,1.627,0,0,0-1.466-.906H79.107v-4.94a1.647,1.647,0,0,0-1.647-1.647H67.267a11.635,11.635,0,0,0-8.152-8.514L44.524,51.817V49.182a16.506,16.506,0,0,0,8.234-14.245V29.7a4.917,4.917,0,0,0-.066-9.3A16.3,16.3,0,0,0,41.23,6.051V5.294A3.3,3.3,0,0,0,37.937,2H34.643a3.3,3.3,0,0,0-3.294,3.294v.758A16.3,16.3,0,0,0,19.887,20.4a4.917,4.917,0,0,0-.066,9.3v5.237a16.506,16.506,0,0,0,8.234,14.245v2.635L13.481,56.065A11.562,11.562,0,0,0,5,67.182V99.163a1.647,1.647,0,0,0,1.647,1.647H92.282a1.647,1.647,0,0,0,1.647-1.647V79.4A1.647,1.647,0,0,0,93.748,78.66ZM75.814,67.873v3.294H62.639V67.873Zm-28-11.676v2.075a5.127,5.127,0,0,0-3.294,0v-3.03ZM41.23,9.542a13.352,13.352,0,0,1,8.119,10.573H41.23ZM34.643,5.294h3.294V20.115H34.643ZM31.349,9.542V20.115H23.23A13.353,13.353,0,0,1,31.349,9.542ZM19.821,25.056a1.647,1.647,0,0,1,1.647-1.647H51.111a1.647,1.647,0,0,1,0,3.294H21.468A1.647,1.647,0,0,1,19.821,25.056Zm3.294,9.881V30H49.464v4.94a13.175,13.175,0,0,1-26.349,0ZM41.23,50.647v6.521l-4.94,3.705-4.941-3.705V50.647a16.49,16.49,0,0,0,9.881,0ZM24.762,56.2l3.294-.955v3.03a5.127,5.127,0,0,0-3.294,0ZM38.118,78.66a1.647,1.647,0,0,0-.181.741V97.516H19.821v-24.7H16.528v24.7H8.294V67.182a8.292,8.292,0,0,1,6.093-7.954l7.081-2.059v5.764a1.647,1.647,0,1,0,3.294,0,1.647,1.647,0,1,1,3.294,0,1.647,1.647,0,1,0,3.294,0V61.286L35.3,64.25a1.647,1.647,0,0,0,1.976,0l3.952-2.964v1.647a1.647,1.647,0,1,0,3.294,0,1.647,1.647,0,1,1,3.294,0,1.647,1.647,0,1,0,3.294,0V57.169l7.1,2.059a8.234,8.234,0,0,1,5.632,5.352H60.992a1.647,1.647,0,0,0-1.647,1.647v4.94H42.877a1.627,1.627,0,0,0-1.466.906ZM57.7,97.516H41.23V79.8L43.9,74.461H55.031L57.7,79.8Zm32.937,0H60.992V85.988h9.881a4.94,4.94,0,1,0,9.881,0h9.881ZM74.167,85.988V82.695a1.647,1.647,0,0,1,3.294,0v3.294a1.647,1.647,0,0,1-3.294,0Zm16.468-3.294H80.754a4.94,4.94,0,0,0-9.881,0H60.992V79.4a1.647,1.647,0,0,0-.181-.741l-2.091-4.2H87.967L90.635,79.8Z" transform="translate(-5 -2)"/>
              </g>
              <g id="Group_68" data-name="Group 68" transform="translate(0.355 0.043)">
                <g id="Group_34" data-name="Group 34" transform="translate(48.181 36.552)">
                  <path id="Path_44-2" data-name="Path 44" d="M33.175,24H29.881a3.294,3.294,0,0,1-6.587,0H20a6.587,6.587,0,0,0,13.175,0Z" transform="translate(4.702 12.23)" fill="#575676"/>
                  <rect id="Rectangle_14-2" data-name="Rectangle 14" width="3.582" height="2.687" transform="translate(23.286 29.555)" fill="#575676"/>
                  <rect id="Rectangle_15-2" data-name="Rectangle 15" width="2.687" height="2.687" transform="translate(36.72 29.555)" fill="#575676"/>
                  <path id="Path_45-2" data-name="Path 45" d="M93.748,78.66l-3.294-6.587a1.627,1.627,0,0,0-1.466-.906H79.107v-4.94a1.647,1.647,0,0,0-1.647-1.647H67.267a11.635,11.635,0,0,0-8.152-8.514L44.524,51.817V49.182a16.506,16.506,0,0,0,8.234-14.245V29.7a4.917,4.917,0,0,0-.066-9.3A16.3,16.3,0,0,0,41.23,6.051V5.294A3.3,3.3,0,0,0,37.937,2H34.643a3.3,3.3,0,0,0-3.294,3.294v.758A16.3,16.3,0,0,0,19.887,20.4a4.917,4.917,0,0,0-.066,9.3v5.237a16.506,16.506,0,0,0,8.234,14.245v2.635L13.481,56.065A11.562,11.562,0,0,0,5,67.182V99.163a1.647,1.647,0,0,0,1.647,1.647H92.282a1.647,1.647,0,0,0,1.647-1.647V79.4A1.647,1.647,0,0,0,93.748,78.66ZM75.814,67.873v3.294H62.639V67.873Zm-28-11.676v2.075a5.127,5.127,0,0,0-3.294,0v-3.03ZM41.23,9.542a13.352,13.352,0,0,1,8.119,10.573H41.23ZM34.643,5.294h3.294V20.115H34.643ZM31.349,9.542V20.115H23.23A13.353,13.353,0,0,1,31.349,9.542ZM19.821,25.056a1.647,1.647,0,0,1,1.647-1.647H51.111a1.647,1.647,0,0,1,0,3.294H21.468A1.647,1.647,0,0,1,19.821,25.056Zm3.294,9.881V30H49.464v4.94a13.175,13.175,0,0,1-26.349,0ZM41.23,50.647v6.521l-4.94,3.705-4.941-3.705V50.647a16.49,16.49,0,0,0,9.881,0ZM24.762,56.2l3.294-.955v3.03a5.127,5.127,0,0,0-3.294,0ZM38.118,78.66a1.647,1.647,0,0,0-.181.741V97.516H19.821v-24.7H16.528v24.7H8.294V67.182a8.292,8.292,0,0,1,6.093-7.954l7.081-2.059v5.764a1.647,1.647,0,1,0,3.294,0,1.647,1.647,0,1,1,3.294,0,1.647,1.647,0,1,0,3.294,0V61.286L35.3,64.25a1.647,1.647,0,0,0,1.976,0l3.952-2.964v1.647a1.647,1.647,0,1,0,3.294,0,1.647,1.647,0,1,1,3.294,0,1.647,1.647,0,1,0,3.294,0V57.169l7.1,2.059a8.234,8.234,0,0,1,5.632,5.352H60.992a1.647,1.647,0,0,0-1.647,1.647v4.94H42.877a1.627,1.627,0,0,0-1.466.906ZM57.7,97.516H41.23V79.8L43.9,74.461H55.031L57.7,79.8Zm32.937,0H60.992V85.988h9.881a4.94,4.94,0,1,0,9.881,0h9.881ZM74.167,85.988V82.695a1.647,1.647,0,0,1,3.294,0v3.294a1.647,1.647,0,0,1-3.294,0Zm16.468-3.294H80.754a4.94,4.94,0,0,0-9.881,0H60.992V79.4a1.647,1.647,0,0,0-.181-.741l-2.091-4.2H87.967L90.635,79.8Z" transform="translate(-5 -2)" fill="#575676"/>
                </g>
              </g>
              <g id="Group_71" data-name="Group 71" transform="translate(73.569 122.758)">
                <text id="Prestataire" transform="translate(-13.569 30.242)" fill="#707070" font-size="14" font-family="HelveticaNeue, Helvetica Neue"><tspan x="0" y="0"><Trans>{t("contractorCard")}</Trans></tspan></text>
              </g>
            </svg>
          </Link>
        </div>        
      );
    }
  }
  
  export default (withTranslation("translations")(Contractor_card));