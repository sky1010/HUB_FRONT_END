// Styling 
import "../App.css";
// Dependencies 
import axios from "axios";
import $ from "jquery";
import React, { Component } from "react";
import MaterialTable from 'material-table';
import { withTranslation, Trans } from 'react-i18next';

class Rep_Finance extends Component {
    constructor() {
        super();
        this.state = {
            resources: [],
            resource: { },
        };
    }
    
    
    render() {
        const {t, i18n} = this.props;
        return(
            <div className="Rep_Finance">
                
            </div>
        );
    }
}

export default (withTranslation("translations")(Rep_Finance));


                                                