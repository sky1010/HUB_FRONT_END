import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
//change to uplaodDoc method form /actions/upload
import { registerUser } from "../../actions/authActions";

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      uploadedby: "",
      file: null,
      date: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChangeFile = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    this.setState({ file: reader });
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newFile = {
      name: this.state.name,
      file: this.state.file.result,
    };
    axios
      .post("/api/uploadUser", newFile)
      .then((res) => console.log(res.statusText));
    console.log(newFile);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/templates" className="btn-flat waves effect">
              <i className="material-icons left">keyboard_backspace</i>
              Back
            </Link>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="input-field col s6 m6"></div>

            <div className="input-field col s12">
              <input
                onChange={this.onChangeFile}
                type="file"
                className="custom-file-input"
              />
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                onSubmit={this.onSubmit}
                className="btn btn-large waves-effect waves-ligth hoverable blue accent-3"
              >
                Upload New File
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.errors,
});

UploadForm.propTypes = {
  uploadFile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { registerUser })(
  withRouter(UploadForm)
);
