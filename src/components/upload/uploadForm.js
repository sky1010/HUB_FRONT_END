import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Select from "react-select";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import axios from "src/axios-config";
//change to uplaodResource method form /actions/upload
import { upload } from "../../actions/upload";

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      category: "",
      file: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChangeFile = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    this.setState({ file: reader });
    const filedata = reader;
    console.log(filedata);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newFile = {
      name: this.state.name,
      description: this.state.description,
      category: this.state.category.value,
      file: this.state.file.result,
    };

    const data = new FormData();
    data.append("file", this.state.file);
    data.append("name", this.state.name);
    data.append("category", this.state.category);
    data.append("description", this.state.description);

    axios
      .post("/api/uploadResources", newFile)
      .then((res) => console.log(res.statusText));
    console.log(newFile);
  };

  render() {
    const categories = [
      { label: "Templates", value: "Templates" },
      { label: "Checklists", value: "Checklists" },
      { label: "Workflows", value: "Workflows" },
      { label: "Contractor", value: "Contractor" },
      { label: "Training Media", value: "Training Media" },
    ];
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/admin" className="btn-flat waves effect">
              <i className="material-icons left">keyboard_backspace</i>
              Back
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Déposer des Ressources</b>
              </h4>
            </div>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="input-field col s6 m6">
              <input
                onChange={this.onChange}
                value={this.state.name}
                id="name"
                type="text"
              />
              <label htmlFor="name">File Name</label>
            </div>
            <div className="input-field col s6 m6">
              <Select
                onChange={(e) => {
                  this.state.category = e;
                }}
                options={categories}
                id="cat"
                placeholder="Select Category"
                style={{ width: "50%" }}
              />
            </div>
            <div className="input-field col s12">
              <input
                onChange={this.onChange}
                value={this.state.description}
                id="description"
                type="text"
              />
              <label htmlFor="description">Description</label>
            </div>

            <div className="input-field col s12">
              <input
                type="file"
                onChange={this.onChangeFile}
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
  upload: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { upload })(withRouter(UploadForm));
