import React, { useRef, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
//change to uplaodDoc method form /actions/upload
import { registerUser } from "../actions/authActions";
import WebViewer from "@pdftron/webviewer";


import pdf from "./files/Contractor-form.pdf";

const MyComponent = () => {
    

    const viewer = useRef(null);

    useEffect(() => {
      WebViewer(
        {
          path: '../lib',
          initialDoc: pdf,
        },
        viewer.current,
      ).then((instance) => {
          const { docViewer } = instance;
          // you can now call WebViewer APIs here...
        });
    }, []);
    



    return (
      <div className="MyComponent">
        <div className="container">
                    <div className="row">
                        <div className="col s8 offset-s2">
                            <Link to="/contractor" className="btn-flat waves effect">
                                <i className="material-icons left">keyboard_backspace</i>
                                Back
                            </Link>
                        </div>
                    </div>
                </div>
        <div className="webviewer" ref={viewer} style={{height: "90vh"}}></div>
      </div>
    );
};

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.errors
});

MyComponent.propTypes = {
    uploadFile : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    error : PropTypes.object.isRequired
};

export default connect (
    mapStateToProps,
    { registerUser }
)(withRouter(MyComponent));






