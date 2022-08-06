import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Select from "react-select";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";
import axios from "src/axios-config";

class ClientForm extends Component {
  constructor() {
    super();
    this.state = {
      client: "",
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

  onSubmit = (e) => {
    e.preventDefault();

    const newClient = {
      name: this.state.client,
    };

    axios
      .post("/api/clients/createClient", newClient)
      .then((res) => {
        console.log(res.data);
        this.props.history.push("/admin");
      })
      .catch((err) => console.log(err));

    console.log(newClient);
  };

  render() {
    const { errors } = this.state;
    const roles = [
      { label: "Admin", value: "admin" },
      { label: "User", value: "user" },
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
                <b>Register New Client</b>
              </h4>
            </div>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={this.onChange}
                value={this.state.client}
                id="client"
                type="text"
              />
              <label htmlFor="client">Client</label>
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
                Register New Client
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

ClientForm.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { registerUser })(
  withRouter(ClientForm)
);
