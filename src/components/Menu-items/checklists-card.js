import React, { Component} from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { withTranslation, Trans } from 'react-i18next';

class Checklists_card extends Component {
    render() {
        const {t, i18n} = this.props;
      return (
        <div className="checklists-card">
            <Link to="/Checklists">
            <svg id="checklist-card" xmlns="http://www.w3.org/2000/svg" width="186" height="172" viewBox="0 0 186 172">
                    <g id="Group_64" data-name="Group 64" transform="translate(0.355 0.246)">
                        <g id="Group_31" data-name="Group 31" transform="translate(51.945 36.72)">
                        <g id="Group_4" data-name="Group 4" transform="translate(38.983 29.334)">
                        <g id="Group_3" data-name="Group 3" transform="translate(0)">
                        <path id="Path_11" data-name="Path 11" d="M275.721,152H247.931a1.93,1.93,0,0,0,0,3.86h27.791a1.93,1.93,0,0,0,0-3.86Z" transform="translate(-246.001 -152)" fill="#575676"/>
                        </g>
                    </g>
                    <g id="Group_6" data-name="Group 6" transform="translate(58.657 38.598)">
                        <g id="Group_5" data-name="Group 5">
                        <path id="Path_12" data-name="Path 12" d="M351.235,200.566a1.929,1.929,0,1,0,.565,1.364A1.944,1.944,0,0,0,351.235,200.566Z" transform="translate(-347.941 -200.001)" fill="#575676"/>
                        </g>
                    </g>
                    <g id="Group_8" data-name="Group 8" transform="translate(38.982 8.299)">
                        <g id="Group_7" data-name="Group 7" transform="translate(0)">
                            <path id="Path_13" data-name="Path 13" d="M249.285,43.566a1.929,1.929,0,1,0,.565,1.364A1.944,1.944,0,0,0,249.285,43.566Z" transform="translate(-245.991 -43.001)" fill="#575676"/>
                        </g>
                    </g>
                    <g id="Group_10" data-name="Group 10" transform="translate(38.983 38.598)">
                        <g id="Group_9" data-name="Group 9">
                            <path id="Path_14" data-name="Path 14" d="M259.486,200H247.931a1.93,1.93,0,0,0,0,3.86h11.556a1.93,1.93,0,0,0,0-3.86Z" transform="translate(-246.001 -200)" fill="#575676"/>
                        </g>
                    </g>
                    <g id="Group_12" data-name="Group 12" transform="translate(38.983 50.177)">
                        <g id="Group_11" data-name="Group 11" transform="translate(0)">
                            <path id="Path_15" data-name="Path 15" d="M275.721,260H247.931a1.93,1.93,0,0,0,0,3.86h27.791a1.93,1.93,0,1,0,0-3.86Z" transform="translate(-246.001 -260)" fill="#575676"/>
                        </g>
                    </g>
                    <g id="Group_14" data-name="Group 14" transform="translate(58.657 59.44)">
                        <g id="Group_13" data-name="Group 13">
                            <path id="Path_16" data-name="Path 16" d="M351.235,308.566a1.929,1.929,0,1,0,.565,1.364A1.944,1.944,0,0,0,351.235,308.566Z" transform="translate(-347.941 -308.001)" fill="#575676"/>
                        </g>
                    </g>
                    <g id="Group_16" data-name="Group 16" transform="translate(38.983 59.44)">
                        <g id="Group_15" data-name="Group 15">
                        <path id="Path_17" data-name="Path 17" d="M259.486,308H247.931a1.93,1.93,0,0,0,0,3.86h11.556a1.93,1.93,0,0,0,0-3.86Z" transform="translate(-246.001 -308)" fill="#575676"/>
                    </g>
                    </g>
                    <g id="Group_18" data-name="Group 18" transform="translate(38.983 71.019)">
                        <g id="Group_17" data-name="Group 17" transform="translate(0)">
                            <path id="Path_18" data-name="Path 18" d="M275.721,368H247.931a1.93,1.93,0,1,0,0,3.86h27.791a1.93,1.93,0,1,0,0-3.86Z" transform="translate(-246.001 -368)" fill="#575676"/>
                        </g>
                    </g>
                    <g id="Group_20" data-name="Group 20" transform="translate(58.657 80.283)">
                        <g id="Group_19" data-name="Group 19">
                            <path id="Path_19" data-name="Path 19" d="M351.235,416.566a1.929,1.929,0,1,0,.565,1.364A1.944,1.944,0,0,0,351.235,416.566Z" transform="translate(-347.941 -416.001)" fill="#575676"/>
                        </g>
                    </g>
                    <g id="Group_22" data-name="Group 22" transform="translate(38.983 80.283)">
                        <g id="Group_21" data-name="Group 21">
                            <path id="Path_20" data-name="Path 20" d="M259.486,416H247.931a1.93,1.93,0,0,0,0,3.86h11.556a1.93,1.93,0,0,0,0-3.86Z" transform="translate(-246.001 -416)" fill="#575676"/>
                        </g>
                    </g>
                    <g id="Group_24" data-name="Group 24" transform="translate(0)">
                        <g id="Group_23" data-name="Group 23" transform="translate(0)">
                            <path id="Path_21" data-name="Path 21" d="M116.418,7.527h-14.74A11.824,11.824,0,0,0,93.5,4.246H91.808a7.719,7.719,0,0,0-13.787,0H76.326a11.824,11.824,0,0,0-8.18,3.281H53.411A9.42,9.42,0,0,0,44,16.936V89.4a9.42,9.42,0,0,0,9.41,9.41h63.007a9.42,9.42,0,0,0,9.41-9.41V16.936A9.42,9.42,0,0,0,116.418,7.527Zm-40.092.579h3.008a1.93,1.93,0,0,0,1.86-1.416,3.86,3.86,0,0,1,7.439,0,1.93,1.93,0,0,0,1.86,1.416h3a8.02,8.02,0,0,1,7.981,7.334H68.346A8.02,8.02,0,0,1,76.326,8.105ZM121.968,89.4a5.556,5.556,0,0,1-5.55,5.55H53.411a5.556,5.556,0,0,1-5.55-5.55V16.936a5.556,5.556,0,0,1,5.55-5.55H65.443a11.8,11.8,0,0,0-.985,4.728v1.254a1.93,1.93,0,0,0,1.93,1.93h37.05a1.93,1.93,0,0,0,1.93-1.93V16.115a11.8,11.8,0,0,0-.985-4.728h12.036a5.556,5.556,0,0,1,5.55,5.55Z" transform="translate(-44.001 0)" fill="#575676"/>
                        </g>
                    </g>
                    <g id="Group_26" data-name="Group 26" transform="translate(11.822 28.305)">
                        <g id="Group_25" data-name="Group 25">
                            <path id="Path_22" data-name="Path 22" d="M122.08,147.232a1.93,1.93,0,0,0-2.729,0l-8.253,8.253-2.542-2.542a1.93,1.93,0,0,0-2.729,2.729l3.907,3.907a1.93,1.93,0,0,0,2.729,0l9.617-9.617A1.93,1.93,0,0,0,122.08,147.232Z" transform="translate(-105.261 -146.667)" fill="#575676"/>
                        </g>
                    </g>
                    <g id="Group_28" data-name="Group 28" transform="translate(12.737 71.019)">
                        <g id="Group_27" data-name="Group 27" transform="translate(0)">
                            <path id="Path_23" data-name="Path 23" d="M121.194,368h-9.263a1.93,1.93,0,0,0-1.93,1.93v9.263a1.93,1.93,0,0,0,1.93,1.93h9.263a1.93,1.93,0,0,0,1.93-1.93V369.93A1.93,1.93,0,0,0,121.194,368Zm-1.93,9.263h-5.4v-5.4h5.4Z" transform="translate(-110.001 -368)" fill="#575676"/>
                        </g>
                    </g>
                    <g id="Group_30" data-name="Group 30" transform="translate(12.737 50.177)">
                        <g id="Group_29" data-name="Group 29" transform="translate(0)">
                            <path id="Path_24" data-name="Path 24" d="M121.194,260h-9.263a1.93,1.93,0,0,0-1.93,1.93v9.263a1.93,1.93,0,0,0,1.93,1.93h9.263a1.93,1.93,0,0,0,1.93-1.93V261.93A1.93,1.93,0,0,0,121.194,260Zm-1.93,9.263h-5.4v-5.4h5.4Z" transform="translate(-110.001 -260)" fill="#575676"/>
                        </g>
                    </g>
                    </g>
                    </g>
                    <text id="Checklists" transform="translate(60 154)" fill="#707070" font-size="14" font-family="HelveticaNeue, Helvetica Neue"><tspan x="0" y="0"><Trans>{t("checklistCard")}</Trans></tspan></text>
                </svg> 
            </Link>
        </div>
      );
    }
  }
  
export default (withTranslation("translations")(Checklists_card));