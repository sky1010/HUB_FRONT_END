// Styling 
import './App.css';
import './index.css';
// Dependencies Import
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import store from "./store";
// Components import
import Login from "./components/auth/login";
import Register from "./components/auth/registration-form";
import PrivateRoute from "./components/private-route/PrivateRoute";
// Pages import
import Home from "./pages/home";
import Templates from "./pages/templates";
import FileExplr from './pages/fileExplr';
import Checklists from "./pages/checklists";
import Workflows from './pages/workflows';
import Contractor from './pages/contractor';
import CForm from './pages/contractor-form';
import TrainingMedia from './pages/training-media';
import AdminPanel from './pages/admin-panel';
import UploadResources from './pages/upload-resources';
import UploadDocs from './pages/user-upload';
import UploadedDocs from './pages/uploaded-docs';
import UploadedRes from './pages/uploaded-res';
import UploadDocs2 from './pages/user-upload2';
import AccessControl from './pages/controlaccess';
import Hub from "./pages/hub";
import Client from "./pages/client-reg";
import Translations from './pages/translations';
import ReportsModule from './pages/Rep_main';
import Rep_assets from './pages/Rep_assets';
import Rep_Building from './pages/Rep_Building';
import Rep_Contractor from './pages/Rep_Contractor';
import Rep_Finance from './pages/Rep_Finance';
import Rep_request from './pages/Rep_request';
import Rep_summary from './pages/Rep_summary';
import Rep_workOrder from './pages/Rep_workOrder';
//Checks token
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser);
    window.location.href = "./"
  }
}

class App extends Component {
  // HTML rendering
  render() {
    return (
      <div className="App">
      
      <Provider store={store}>
        
        <Router>
            <div className="App"></div>
          <Route exact path="/" component={Login} />   
        
          <Route exact path="/contractor" component={Contractor} />
          <Route exact path="/contractor-form" component={CForm} />
          
          <Switch>
            <PrivateRoute exact path="/admin/register" component={Register} />
            <PrivateRoute exact path="/module/reports" component={ReportsModule} />
            <PrivateRoute exact path="/module/reports/assets" component={Rep_assets} />
            <PrivateRoute exact path="/module/reports/building" component={Rep_Building} />
            <PrivateRoute exact path="/module/reports/contractor" component={Rep_Contractor} />
            <PrivateRoute exact path="/module/reports/finance" component={Rep_Finance} />
            <PrivateRoute exact path="/module/reports/request" component={Rep_request} />            
            <PrivateRoute exact path="/module/reports/summary" component={Rep_summary} />            
            <PrivateRoute exact path="/module/reports/workOrder" component={Rep_workOrder} />            
            <PrivateRoute exact path="/admin/clientreg" component={Client} />
            <PrivateRoute exact path="/admin" component={AdminPanel} />
            <PrivateRoute exact path="/admin/translations" component={Translations} />
            <PrivateRoute exact path="/admin/controlaccess" component={AccessControl} />
            <PrivateRoute exact path="/hub" component={Hub}/>
            <PrivateRoute exact path="/dashboard" component={Home} />
            <PrivateRoute exact path="/templates" component={Templates} />
            <PrivateRoute exact path="/templates-test" component={FileExplr} />
            <PrivateRoute exact path="/checklists" component={Checklists} />
            <PrivateRoute exact path="/workflows" component={Workflows} />
            <PrivateRoute exact path="/training-media" component={TrainingMedia} />
            <PrivateRoute exact path="/admin/upload" component={UploadResources} />
            <PrivateRoute exact path="/admin/uploadedResources" component={UploadedRes} />
            <PrivateRoute exact path="/admin/uploaded" component={UploadedDocs} />
            <PrivateRoute exact path="/user/TemplatesUpload" component={UploadDocs} />
            <PrivateRoute exact path="/user/ChecklistsUpload" component={UploadDocs2} />
          </Switch>
        </Router>
      <footer id="footer">
        <p>© E-Volve, 2022</p>  
      </footer>
      
      </Provider>
      
      </div>
      
      
    );
  }
}

export default App;
