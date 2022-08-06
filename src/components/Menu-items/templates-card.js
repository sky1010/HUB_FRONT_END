import React, { Component} from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { withTranslation, Trans } from 'react-i18next';

class Templates_card extends Component {
    render() {
      const {t, i18n} = this.props;
      return (
        <div className="templates-card">
          <Link to="/templates">
          <div >
                <Link to="/templates">
                <svg id="templates-card" xmlns="http://www.w3.org/2000/svg" width="186" height="172" viewBox="0 0 186 172">
                    <g id="Group_63" data-name="Group 63" transform="translate(0.227 0.246)">
                      <g id="Group_2" data-name="Group 2" transform="translate(57.319 40.53)">
                        <path id="Path_1" data-name="Path 1" d="M159.864,43.611l-.067-.01-.06-.007-.081,0-.035,0H109.434l-.035,0-.08,0-.062.007a1.341,1.341,0,0,0-1.155,1.177c0,.016,0,.033,0,.049s0,.058,0,.087c0,.005,0,.01,0,.015.06,23.442-.177,23.135.223,23.74a1.351,1.351,0,0,0,1.119.6h50.2a1.341,1.341,0,0,0,1.326-1.326s0-.009,0-.014v-23s0-.009,0-.014a1.342,1.342,0,0,0-1.1-1.3Zm-6.388,2.659-18.948,8.684L115.579,46.27Zm-42.7.749,20.534,9.41-20.534,9.41Zm4.8,19.569L134.527,57.9l18.948,8.684Zm42.7-.749-20.533-9.41,20.533-9.41Z" transform="translate(-99.225 -35.805)" fill="#575676"/>
                        <path id="Path_2" data-name="Path 2" d="M125.01,0H62.517A4.022,4.022,0,0,0,58.5,4.017v23a1.339,1.339,0,1,0,2.678,0v-23a1.341,1.341,0,0,1,1.339-1.339H125.01a1.341,1.341,0,0,1,1.339,1.339V87.4a1.341,1.341,0,0,1-1.339,1.339H62.517A1.341,1.341,0,0,1,61.178,87.4V32.37a1.339,1.339,0,1,0-2.678,0V87.4a4.022,4.022,0,0,0,4.017,4.017H125.01a4.022,4.022,0,0,0,4.017-4.017V4.017A4.022,4.022,0,0,0,125.01,0Z" transform="translate(-58.5)" fill="#575676"/>
                        <path id="Path_3" data-name="Path 3" d="M108.167,236.042a1.341,1.341,0,0,0,1.341,1.341h19.437a1.341,1.341,0,0,0,1.341-1.341V221.294a1.341,1.341,0,0,0-1.341-1.341H109.508a1.341,1.341,0,0,0-1.341,1.341Zm2.682-13.407H127.6V234.7H110.849Z" transform="translate(-99.299 -180.634)" fill="#575676"/>
                        <path id="Path_4" data-name="Path 4" d="M303.138,219.953H284a1.341,1.341,0,1,0,0,2.682h19.134a1.341,1.341,0,1,0,0-2.682Z" transform="translate(-242.593 -180.634)" fill="#575676"/>
                        <path id="Path_5" data-name="Path 5" d="M303.138,261.191H284a1.341,1.341,0,1,0,0,2.682h19.134a1.341,1.341,0,1,0,0-2.682Z" transform="translate(-242.593 -214.498)" fill="#575676"/>
                        <path id="Path_6" data-name="Path 6" d="M303.138,302.43H284a1.341,1.341,0,1,0,0,2.682h19.134a1.341,1.341,0,1,0,0-2.682Z" transform="translate(-242.593 -248.363)" fill="#575676"/>
                        <path id="Path_7" data-name="Path 7" d="M301.751,366.785H282.315a1.341,1.341,0,0,0-1.341,1.341v14.748a1.341,1.341,0,0,0,1.341,1.341h19.436a1.341,1.341,0,0,0,1.341-1.341V368.126A1.341,1.341,0,0,0,301.751,366.785Zm-1.341,14.748H283.656V369.467H300.41Z" transform="translate(-241.206 -301.21)" fill="#575676"/>
                        <path id="Path_8" data-name="Path 8" d="M109.508,369.467h19.134a1.341,1.341,0,1,0,0-2.682H109.508a1.341,1.341,0,1,0,0,2.682Z" transform="translate(-99.299 -301.21)" fill="#575676"/>
                        <path id="Path_9" data-name="Path 9" d="M109.508,410.705h19.134a1.341,1.341,0,0,0,0-2.682H109.508a1.341,1.341,0,0,0,0,2.682Z" transform="translate(-99.299 -335.074)" fill="#575676"/>
                        <path id="Path_10" data-name="Path 10" d="M109.508,451.944h19.134a1.341,1.341,0,1,0,0-2.682H109.508a1.341,1.341,0,1,0,0,2.682Z" transform="translate(-99.299 -368.939)" fill="#575676"/>
                      </g>
                    </g>
                    <text id="Fichier_Import" data-name="Fichier Import" transform="translate(50 154)" fill="#707070" font-size="14" text-anchor="start" font-family="HelveticaNeue, Helvetica Neue"><tspan x="0" y="0"><Trans>{t("templatesCard")}</Trans></tspan></text>
                  </svg> 
                </Link>            
            </div>
          </Link>
        </div>
      );
    }
  }
  
export default (withTranslation("translations")(Templates_card));