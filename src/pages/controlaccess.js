import React, { Component} from "react";
import { Link, withRouter } from "react-router-dom";
import Select from 'react-select';
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";


class ControlAccess extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            client: "",
            role: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            client: this.state.client,
            role: this.state.role.value,
            password: this.state.password,
            password2: this.state.password2
        };
        
        this.props.registerUser(newUser, this.props.history);
    
        console.log(newUser);
    };

    render() {
        const { errors } = this.state;
        const roles = [
            {label: "Admin", value:"admin"},
            {label: "User", value:"user"}
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
                                <b>Register New User</b> 
                            </h4>
                        </div>
                    </div>
                    <form noValidate onSubmit={this.onSubmit}>

                        <div className="input-field col s12">
                            <input
                                onChange={this.onChange}
                                value={this.state.name}
                                error={errors.name}
                                id="name"
                                type="text"
                                className={classnames("",{
                                    invalid: errors.name
                                })}
                            />
                            <label htmlFor="name">Name</label>
                            <span className="red-text">{errors.name}</span>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                type="text"
                                className={classnames("",{
                                    invalid: errors.email
                                })}
                            />
                            <label htmlFor="email">Email</label>
                            <span className="red-text">{errors.email}</span>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={this.onChange}
                                value={this.state.client}
                                error={errors.client}
                                id="client"
                                type="text"
                                className={classnames("",{
                                    invalid: errors.client
                                })}
                            />
                            <label htmlFor="client">Client</label>
                            <span className="red-text">{errors.client}</span>
                        </div>
                        <div className="input-field col s12">
                            <Select onChange={ (e) => {this.state.role = e}}
                            options={roles}
                            id="role"
                            placeholder="Select Role"
                            className={classnames("",{
                                invalid: errors.role
                            })}
                            />
                            <span className="red-text">{errors.role}</span>
                        </div>
                        <div className="col s12" style={{ paddingLeft: "11.250px"}}>
                            <button style={{ 
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            type="submit"
                            onSubmit={this.onSubmit}
                            className="btn btn-large waves-effect waves-ligth hoverable blue accent-3">
                                Confirm Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.errors
});

ControlAccess.propTypes = {
    registerUser : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    error : PropTypes.object.isRequired
};

export default connect (
    mapStateToProps,
    { registerUser }
)(withRouter(ControlAccess));


