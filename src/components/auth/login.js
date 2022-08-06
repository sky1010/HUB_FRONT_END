import React, { Component} from "react";
import { Link } from "react-router-dom";
import evolvelogo from "../../img/fcfl.png";
import LeHUB from '../../assets/Logos/LOGOS - WHITE/LEHUB_BLEU.png';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import '../../App.css';
import wallpaper from '../../img/background.png';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            //Redirects authenticated user to home dashboard
            this.props.history.push("/hub");
        }
        if (nextProps.errors) {
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
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData);
        
    };

    render() {
        const myStyle={
            backgroundImage:`url(${wallpaper})`,
            height:'100vh',
            marginTop:'0',
            fontSize:'50px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        };
        const { errors } = this.state;
        return (
        <div className="Login" style={myStyle}>
            <div className="container">
                <div class="button-container">
                    <Link to="/contractor" className="col s1 m1 offset-s1 offset-m10" id="cont-pub-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="70" viewBox="0 0 216 73">
                                <g id="Rectangle_17" data-name="Rectangle 17" fill="#b5ead7" stroke="#707070" stroke-width="0.5">
                                <rect width="216" height="58" rx="13" stroke="none"/>
                                <rect x="0.25" y="0.25" width="215.5" height="57.5" rx="12.75" fill="none"/>
                                </g>
                                <g id="Group_34" data-name="Group 34" transform="translate(10 5)">
                                <path id="Path_44" data-name="Path 44" d="M25.848,24H24.386a1.462,1.462,0,0,1-2.924,0H20a2.924,2.924,0,0,0,5.848,0Z" transform="translate(-4.036 -5.919)" fill="#575676"/>
                                <rect id="Rectangle_14" data-name="Rectangle 14" width="2" height="1" transform="translate(15 15)" fill="#575676"/>
                                <rect id="Rectangle_15" data-name="Rectangle 15" width="2" height="1" transform="translate(21 15)" fill="#575676"/>
                                <path id="Path_45" data-name="Path 45" d="M44.391,36.026,42.929,33.1a.722.722,0,0,0-.651-.4H37.893V30.507a.731.731,0,0,0-.731-.731H32.637A5.164,5.164,0,0,0,29.019,26l-6.476-1.886v-1.17A7.326,7.326,0,0,0,26.2,16.619V14.295a2.183,2.183,0,0,0-.029-4.13A7.236,7.236,0,0,0,21.081,3.8V3.462A1.466,1.466,0,0,0,19.619,2H18.157A1.466,1.466,0,0,0,16.7,3.462V3.8a7.236,7.236,0,0,0-5.087,6.367,2.183,2.183,0,0,0-.029,4.13v2.324a7.326,7.326,0,0,0,3.655,6.323v1.17L8.764,26A5.132,5.132,0,0,0,5,30.931v14.2a.731.731,0,0,0,.731.731h38.01a.731.731,0,0,0,.731-.731V36.355A.731.731,0,0,0,44.391,36.026Zm-7.96-4.788V32.7H30.583V31.238ZM24,26.056v.921a2.275,2.275,0,0,0-1.462,0V25.632ZM21.081,5.348a5.927,5.927,0,0,1,3.6,4.693h-3.6ZM18.157,3.462h1.462v6.579H18.157ZM16.7,5.348v4.693h-3.6a5.927,5.927,0,0,1,3.6-4.693Zm-5.117,6.886a.731.731,0,0,1,.731-.731H25.467a.731.731,0,0,1,0,1.462H12.31A.731.731,0,0,1,11.579,12.233Zm1.462,4.386V14.426h11.7v2.193a5.848,5.848,0,1,1-11.7,0Zm8.041,6.973v2.895l-2.193,1.645L16.7,26.487V23.592a7.319,7.319,0,0,0,4.386,0Zm-7.31,2.463,1.462-.424v1.345a2.275,2.275,0,0,0-1.462,0Zm5.928,9.97a.731.731,0,0,0-.08.329V44.4H11.579V33.431H10.117V44.4H6.462V30.931a3.68,3.68,0,0,1,2.7-3.531l3.143-.914v2.558a.731.731,0,0,0,1.462,0,.731.731,0,1,1,1.462,0,.731.731,0,0,0,1.462,0v-.731L18.45,29.63a.731.731,0,0,0,.877,0l1.754-1.316v.731a.731.731,0,0,0,1.462,0,.731.731,0,1,1,1.462,0,.731.731,0,0,0,1.462,0V26.487l3.15.914a3.655,3.655,0,0,1,2.5,2.376H29.853a.731.731,0,0,0-.731.731V32.7h-7.31a.722.722,0,0,0-.651.4ZM28.391,44.4h-7.31V36.53l1.184-2.368h4.941l1.184,2.368Zm14.619,0H29.853V39.279h4.386a2.193,2.193,0,1,0,4.386,0H43.01ZM35.7,39.279V37.817a.731.731,0,0,1,1.462,0v1.462a.731.731,0,0,1-1.462,0Zm7.31-1.462H38.624a2.193,2.193,0,0,0-4.386,0H29.853V36.355a.731.731,0,0,0-.08-.329l-.928-1.864H41.826L43.01,36.53Z" transform="translate(0 0)" fill="#575676"/>
                                </g>
                                <text id="Contractor_" data-name="Contractor
                            " transform="translate(71 38)" fill="#575676" font-size="25" font-family="HelveticaNeue, Helvetica Neue"><tspan x="0" y="0">Contractor</tspan><tspan x="0" y="30"></tspan></text>
                            </svg>
                    </Link>
                </div>
                

                <div class="login-container">
                    <img id="login-logo" alt="_" src={LeHUB}/>
                    <form noValidate onSubmit={this.onSubmit} id="form-lgn">
                    <div className="input-field col s12 m6">
                        <input 
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            id="email"
                            type="email"
                            placeholder="Enter email"
                            className="email-input-login"
                        />
                        <label htmlFor="email">Email</label>
                        <span className="red-text">{errors.email}</span>
                    </div>
                    <div className="input-field col s12 m6">
                        <input 
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            className="password-input-login"
                        />
                        <label htmlFor="password">Password</label>
                        
                    </div>
                    <span className="red-text">
                            {errors.password}
                            {errors.passwordincorrect}
                        </span>
                    <div className="col s10" id="logn-btn">
                        <button id="lgn-btn" style={{ 
                            width: "200px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px"}}
                            type="submit"
                            className="btn btn-large waves-effect waves-dark hoverable white black-text accent-3">
                                Se Connecter
                            </button>
                    </div>
                </form>
                </div>
                
            </div>
        </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});

export default connect (
    mapStateToProps, 
    {loginUser}
    )(Login);