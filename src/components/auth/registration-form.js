import React, { Component} from "react";
import { Link, withRouter } from "react-router-dom";
import Select from 'react-select';
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import axios from "axios";
import { withTranslation, Trans } from 'react-i18next';
import wallpaper from '../../assets/BACKGROUNDS/3.svg';


class RegisterForm extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            client: "",
            role: "",
            password: "",
            password2: "",
            reportlink: "",
            cafmlink: "",
            errors: {},
        };
    }

    componentDidMount() {
        this.getClients();
        console.log(this.state.client)
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
            //role: this.state.role.value,
            password: this.state.password,
            password2: this.state.password2,
            //reportlink: this.state.reportlink,
            //cafmlink: this.state.cafmlink,
        };
        
        this.props.registerUser(newUser, this.props.history);
    
        console.log(newUser);
    };

    getClients = () => {
        axios.get('https://api.forumconcepts.fr/api/clients/getClients')
            .then(res => {{
                if(res.data){
                    //console.log(res.data.data);
                    this.setState({clientList: res.data});
                    console.log(this.state.clientList);
                    var arr = this.state.clientList;
                    arr.forEach(function(data){
                        data['value'] = data['id'];
                        data['label'] = data['name']
                        delete data['id'];
                        delete data['name'];
                    });
                    console.log(arr);
                    this.setState({clients: arr})
                }
            }})
    }

    render() {
        const { errors } = this.state;
        const roles = [
            {label: "Admin", value:"admin"},
            {label: "User", value:"user"}
        ];
        const {t, i18n} = this.props;

        return (
            <div className="RegisterForm" style={{
                backgroundImage:`url(${wallpaper})`,
                height:'100vh',
                marginTop:'0px',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}>
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/admin">
                            <h1> 
                                Register New User 
                            </h1>
                        </Link>
                    </div>
                    <form noValidate autoComplete="off" onSubmit={this.onSubmit}>

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
                                autoComplete="new-password"
                            />
                            <label htmlFor="email">Email</label>
                            <span className="red-text">{errors.email}</span>
                        </div>
                        <div className="input-field col s12">
                            
                        </div>
                        <div className="input-field col s12">
                            <Select onChange={ (e) => {this.state.client = e.value}}
                            options={this.state.clients}
                            id="client"
                            placeholder="Select Client"
                            className={classnames("",{
                                invalid: errors.client
                            })}
                            />
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
                        <div className="input-field col s12">
                            <input onChange={this.onChange}
                                autoComplete="new-password"
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                                type="password"
                                className={classnames("",{
                                    invalid: errors.password
                                })}
                                />
                                <label htmlFor="password">Password</label>
                                <span className="red-text">{errors.password}</span>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={this.onChange}
                                value={this.state.password2}
                                error={errors.password2}
                                id="password2"
                                type="password"
                                className={classnames("",{
                                    invalid: errors.password2
                                })}
                            />
                            <label htmlFor="password2">Confirm Password</label>
                            <span className="red-text">{errors.password2}</span>
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
                                Register New User
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.errors
});

RegisterForm.propTypes = {
    registerUser : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    error : PropTypes.object.isRequired
};

export default connect (
    mapStateToProps,
    { registerUser }
)(withRouter(RegisterForm));


