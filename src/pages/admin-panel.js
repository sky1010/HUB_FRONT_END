// Styling
import "../App.css";
// Dependencies
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import axios from "axios";
import { Checkbox, Grid, Stack } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import { InputLabel } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabPanel } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import { TabList } from "@mui/lab";
import Select from "react-select";
import { withTranslation, Trans } from "react-i18next";

import hubParametre from "../assets/Logos/LOGOS - BLACK/LEHUBPARAMETRE.png";
import hubSettings from "../assets/Logos/LOGOS - BLACK/LEHUBSETTING.png";
import { blue } from "@mui/material/colors";
import { black } from "material-ui/styles/colors";

class AdminPanel extends Component {
  constructor() {
    super();
    this.state = {
      usersList: [],
      usersNameList: [],
      clientList: [],
      NameList: [],
      user: {},
      isChecked: false,
      selectedopts: new Map(),
      rowData: {},
      reportlink: "",
      cafmlink: "",
      ssrslink: "",
      supportlink: "",
      iotlink: "",
      code: "",
      resourceOpts: {},
      hubOpts: {},
      value: "0",
      selectedUser: {},
      selectedClient: {},
      lang: "",
      client: "",
      name: "",
      email: "",
      password: "",
      userli: "black",
      OptionsId: null,
    };
  }
  // Initiates functions at every load
  // Make use of the user's iD from the decoded token
  componentDidMount() {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      setAuthToken(token);
      const decoded = jwt_decode(token);
      console.log(decoded.id);
      this.setState({ decoded: decoded.id });
      console.log(this.state.decoded);
      this.getCurrentUser(decoded.id);
      this.getLng(decoded.id);
      this.Translation(decoded.id);
    }
    this.getUsers();
    this.getUsersNames();
    this.getClients();
    this.getClientsforEdit();
  }

  settingsCard = () => {
    if (localStorage.i18nextLng === "fr") {
      return <img width="215" height="95" src={hubParametre} />;
    } else {
      return <img width="215" height="95" src={hubSettings} />;
    }
  };
  // Getting the gurrent logged in user
  getCurrentUser = (id) => {
    axios
      .get("/api/users/getUser/" + id)
      .then((res) => {
        this.setState({ currentuser: res.data });
        //this.props.i18n.changeLanguage(this.state.currentuser.lang);
        console.log(this.state.currentuser);
      })
      .catch((err) => console.log(err));
  };

  // Getting the language for the current user
  getLng = (id) => {
    let category = "language";
    axios.get("/api/users/getUserOpts/" + id + "/" + category).then((res) => {
      this.props.i18n.changeLanguage(res.data.code);
    });
  };

  // Getting clients from the API
  getClients = () => {
    axios.get("/api/clients/getClients").then((res) => {
      {
        if (res.data) {
          //console.log(res.data);
          this.setState({ clientList: res.data });
          console.log(this.state.clientList);
        }
      }
    });
  };

  getCafmId = (id) => {
    let cat = "CAFM";
    axios.get("/api/users/userLinks/" + id + "/" + cat).then((res) => {
      {
        if (res.data) {
          this.setState({ CAFMiD: res.data.id });
          console.log(this.state.CAFMiD);
        } else {
          this.setState({ CAFMiD: null });
        }
      }
    });
  };

  getReportsId = (id) => {
    let cat = "Reports";
    axios.get("/api/users/userLinks/" + id + "/" + cat).then((res) => {
      {
        if (res.data) {
          this.setState({ ReportsId: res.data.id });
        } else {
          this.setState({ ReportsId: null });
        }
      }
    });
  };

  getSsrsId = (id) => {
    let cat = "SSRS";
    axios.get("/api/users/userLinks/" + id + "/" + cat).then((res) => {
      {
        if (res.data) {
          this.setState({ SSRSiD: res.data.id });
        } else {
          this.setState({ SSRSiD: null });
        }
      }
    });
  };
  getIotId = (id) => {
    let cat = "IOT";
    axios.get("/api/users/userLinks/" + id + "/" + cat).then((res) => {
      {
        if (res.data) {
          this.setState({ IOTiD: res.data.id });
        } else {
          this.setState({ IOTiD: null });
        }
      }
    });
  };
  // Getting options iD for selected option category
  getOptsid = (id, category) => {
    //this.setState({OptionId: null});
    axios
      .get("/api/users/getUserOptsbycat/" + id + "/" + category)
      .then((res) => {
        {
          if (res.data) {
            this.setState({ OptionsId: res.data.id });
            this.setState({ LngCode: res.data.code });
            console.log(this.state.LngCode);
          } else {
            this.setState({ OptionsId: null });
          }
          console.log(this.state.OptionsId);
          console.log(this.state.optsCat);
        }
      });
  };

  //@ACCESS Private
  //@ROUTE PAGE /Admin, API PUT /users/userOpts/:id/:opts
  // @DESC Getting the Option's iD from state of the Option Tab
  // Getting the User's iD from state of selected user
  // Editing x category of Options from user iD & options's iD
  // If opts for category exists -> edit Option's code for selected Category
  // Else -> Create option code for selected category
  editPermissionsRI = () => {
    if (this.state.OptionsId === null) {
      // axios post with user id (this.state.selectedUser) & category (this.state.optsCat)
      const opts = { code: this.state.resourceOpts };
      axios
        .post(
          "/api/users/newOpts/" +
            this.state.selectedUser +
            "/" +
            this.state.optsCat,
          opts
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      // axios put with user's id (this.state.selectedUser) and option's id (this.state.OptionsId)
      const opts = { code: this.state.resourceOpts };
      axios
        .put(
          "/api/users/userOpts/" +
            this.state.OptionsId +
            "/" +
            this.state.selectedUser,
          opts
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  };
  editPermissionsHUB = () => {
    if (this.state.OptionsId === null) {
      // axios post with user id (this.state.selectedUser) & category (this.state.optsCat)
      const opts = { code: this.state.hubOpts };
      axios
        .post(
          "/api/users/newOpts/" +
            this.state.selectedUser +
            "/" +
            this.state.optsCat,
          opts
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      // axios put with user's id (this.state.selectedUser) and option's id (this.state.OptionsId)
      const opts = { code: this.state.hubOpts };
      console.log(opts);
      console.log(this.state.OptionsId);
      console.log(this.state.selectedUser);
      axios
        .put(
          "/api/users/userOpts/" +
            this.state.OptionsId +
            "/" +
            this.state.selectedUser,
          opts
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err.message));
    }
  };

  //Gets client for selection list
  getClientsforEdit = () => {
    axios.get("/api/clients/getClients").then((res) => {
      {
        if (res.data) {
          //console.log(res.data.data);
          var arr = res.data;
          arr.forEach(function (data) {
            data["value"] = data["id"];
            data["label"] = data["name"];
            delete data["id"];
            delete data["name"];
          });
          console.log(arr);
          this.setState({ clientListForSelect: arr });
        }
      }
    });
  };

  getUsersNames = () => {
    axios.get("/api/usersNameList").then((res) => {
      {
        if (res.data) {
          //console.log(res.data);
          this.setState({ usersNameList: res.data.data });
          console.log(this.state.usersNameList);
          //var arr = this.state.usersNameList;
          //let names = arr.map(({ name }) => name);
          //this.setState({NameList: names});
          //console.log(this.state.usersNameList);
        }
      }
    });
  };

  handleLngChange = (event) => {
    console.log("select val:", event.target.value);
    let newLang = event.target.value;
    this.setState((prevState) => ({ lang: newLang }));
    console.log("newLang:", newLang);
    //this.props.i18n.changeLanguage(newLang);
  };

  // @route DEL deletes user
  // @desc requesting row._id from User's Table to delete selected user
  // @access Admin only
  deleteUser(user_id, resolve) {
    axios
      .delete("/api/deleteuser/" + user_id)
      .then((res) => {
        console.log(res.data);
        resolve();
        this.getUsers();
      })
      .catch((err) => console.log(err));
  }

  // @route GET users list from DB
  // @desc Used to fill table with User's data
  // @access Admin only
  getUsers = () => {
    axios
      .get("/api/usersList")
      .then((res) => {
        if (res.data) {
          this.setState({
            usersList: res.data.data,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  // @route PUT updates seleceted user's data
  // @desc Updates user's data with row._id from Data
  // @access Admin only
  editUser = (newData) => {
    axios
      .put("/api/users/userData/" + this.state.UserSelectedData.id, newData)
      .then((res) => {
        console.log(newData);
        console.log(res.data);
        this.getUsers();
      })
      .catch((err) => console.log(err));
  };

  editlink = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  ChckhandleChangeService = (e) => {
    this.setState({ isCheckedService: e.target.checked });
  };
  eChckhandleChange = (e) => {
    this.setState({ isCheckedCAFM: e.target.checked });
  };
  ChckhandleChangeREP = (e) => {
    this.setState({ isCheckedREP: e.target.checked });
  };
  ChckhandleChangeIOT = (e) => {
    this.setState({ isCheckedIOT: e.target.checked });
  };
  ChckhandleChangeRES = (e) => {
    this.setState({ isCheckedRES: e.target.checked });
  };
  ChckhandleChangeSc = (e) => {
    console.log(e.target.checked);
    this.setState({ isCheckedSc: e.target.checked });
  };
  ChckhandleChangeHD = (e) => {
    this.setState({ isCheckedHD: e.target.checked });
  };
  //Generates code for selected HUB Menu option
  HubcheckboxChange = (e) => {
    var item = e.target.name;
    if (e.target.checked) {
      this.setState({
        selectedopts: this.state.selectedopts.set(item, e.target.checked),
      });
    } else if (!e.target.checked) {
      this.setState({
        selectedopts: this.state.selectedopts.set(item, e.target.checked),
      });
    }
    let obj = Array.from(this.state.selectedopts).reduce(
      (obj, [key, value]) => {
        obj[key] = value;
        return obj;
      },
      {}
    );
    console.log(obj);
    let optsraw = JSON.stringify(obj);

    this.state.hubOpts = optsraw;
    console.log(this.state.optionsHUB);
    console.log(this.state.hubOpts);
    console.log(JSON.parse(this.state.hubOpts));
  };

  //PUT code generated for HUB Menu option for selected user
  hubgenCode = () => {
    const hubOpts = { hubOpts: this.state.hubOpts };
    axios
      .put("/api/updateuser/" + this.state.UserSelectedData._id, hubOpts)
      .then((res) => {
        console.log(this.state.hubOpts);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  //Generates code for selected RI Menu option
  checkboxChange = (e) => {
    var item = e.target.name;
    if (e.target.checked) {
      this.setState({
        selectedopts: this.state.selectedopts.set(item, e.target.checked),
      });
    } else if (!e.target.checked) {
      this.setState({
        selectedopts: this.state.selectedopts.set(item, e.target.checked),
      });
    }
    let obj = Array.from(this.state.selectedopts).reduce(
      (obj, [key, value]) => {
        obj[key] = value;
        return obj;
      },
      {}
    );
    //console.log(obj)

    let optsraw = JSON.stringify(obj);
    this.state.resourceOpts = optsraw;
    console.log(this.state.resourceOpts);
  };
  //PUT code generated for RI Menu option for selected user
  genCode = () => {
    const resourceOpts = { resourceOpts: this.state.resourceOpts };
    axios
      .put("/api/updateuser/" + this.state.UserSelectedData._id, resourceOpts)
      .then((res) => {
        console.log(this.state.resourceOpts);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  //Redirects user to user's uploaded document
  onViewUp = (e) => {
    e.preventDefault();
    this.props.history.push("/admin/uploaded");
  };
  //Redirects user to available resources in RI
  availRes = (e) => {
    e.preventDefault();
    this.props.history.push("/admin/uploadedResources");
  };

  translationsTable = (e) => {
    e.preventDefault();
    this.props.history.push("/admin/translations");
  };
  //Redirects user to file upload form
  onUploadClick = (e) => {
    e.preventDefault();
    this.props.history.push("/admin/upload");
  };

  //Redirects user to HUB Menu
  onBackClick = (e) => {
    e.preventDefault();
    this.props.history.push("/hub");
  };

  //Redirects user to User Registration form
  onRegClick = (e) => {
    e.preventDefault();
    this.props.history.push("/admin/register");
  };

  //Redirect user to Client Registration form
  onNewClientClick = (e) => {
    e.preventDefault();
    this.props.history.push("admin/clientreg");
  };

  // Performs the tab change for the User Details Panel
  tabsChange = (event, newValue) => {
    this.setState({ value: newValue });
    if (newValue === "3") {
      this.getOptsid(this.state.selectedUser, "HUB");
      this.setState({ optsCat: "HUB" });
    } else if (newValue === "4") {
      this.getOptsid(this.state.selectedUser, "RI");
      this.setState({ optsCat: "RI" });
    } else if (newValue === "1") {
      this.getOptsid(this.state.selectedUser, "language");
      this.setState({ optsCat: "language" });
    } else if (newValue === "2") {
      this.getCafmId(this.state.selectedUser);
      this.getReportsId(this.state.selectedUser);
      this.getSsrsId(this.state.selectedUser);
      this.getIotId(this.state.selectedUser);
    }
  };

  //Sets the selected user for editing
  userSelction = (id) => {
    this.setState({
      selectedUser: id,
    });
    this.setState({ userli: "rgb(70, 117, 206)" });
    console.log(this.state.selectedUser);
    this.getSelectedDetails();
  };

  //GET Selected user's details
  getSelectedDetails = () => {
    axios.get("/api/users/getUser/" + this.state.selectedUser).then((res) => {
      {
        if (res.data) {
          this.setState({ UserSelectedData: res.data });
        }
        console.log(this.state.UserSelectedData);
      }
    });
    axios
      .get(
        "/api/users/getUserOpts/" +
          this.state.selectedUser +
          "/" +
          this.state.optsCat
      )
      .then((res) => {
        {
          if (res.data) {
            this.setState({ userSavedOpts: res.data });
          }
          console.log(this.state.userSavedOpts);
        }
      });
    axios
      .get("/api/users/usersLinks/" + this.state.selectedUser + "/CAFM")
      .then((res) => {
        {
          if (res.data) {
            this.setState({ selectedUserCAFM: res.data.url });
          }
        }
      });

    axios
      .get("/api/users/usersLinks/" + this.state.selectedUser + "/Reports")
      .then((res) => {
        {
          if (res.data) {
            this.setState({ selectedUserReports: res.data.url });
          }
        }
      });

    axios
      .get("/api/users/usersLinks/" + this.state.selectedUser + "/SSRS")
      .then((res) => {
        {
          if (res.data) {
            this.setState({ selectedUserSSRS: res.data.url });
          }
        }
      });

    axios
      .get("/api/users/usersLinks/" + this.state.selectedUser + "/IOT")
      .then((res) => {
        {
          if (res.data) {
            this.setState({ selectedUserIOT: res.data.url });
          }
        }
      });
  };

  //Sets the client selected for user list panel
  clientSelection = (id) => {
    this.setState({
      selectedClient: id,
    });
    console.log(this.state.selectedClient);
    this.getClientSelectedDetails();
  };

  //GET User list from selected Client
  getClientSelectedDetails = () => {
    axios
      .get("/api/users/getUsersName/" + this.state.selectedClient)
      .then((res) => {
        {
          if (res.data) {
            this.setState({ ClientSelectedData: res.data });
          }
        }
      });
    console.log(this.state.ClientSelectedData);
  };
  IsChecked = () => {
    if (this.state.isTrue === true) {
      return true;
    } else if (this.state.isChecked === true) {
      return true;
    } else {
      return false;
    }
  };
  //Checkbox test (placeholder for saved options)
  IsCheckedCAFM = () => {
    if (this.state.isTrue === true) {
      return true;
    } else if (this.state.isCheckedCAFM === true) {
      return true;
    } else {
      return false;
    }
  };
  IsCheckedService = () => {
    if (this.state.isTrue === true) {
      return true;
    } else if (this.state.isCheckedService === true) {
      return true;
    } else {
      return false;
    }
  };
  IsCheckedRep = () => {
    if (this.state.isTrue === true) {
      return true;
    } else if (this.state.isCheckedREP === true) {
      return true;
    } else {
      return false;
    }
  };
  IsCheckedRes = () => {
    if (this.state.isTrue === true) {
      return true;
    } else if (this.state.isCheckedRES === true) {
      return true;
    } else {
      return false;
    }
  };
  IsCheckedIOT = () => {
    if (this.state.isTrue === true) {
      return true;
    } else if (this.state.isCheckedIOT === true) {
      return true;
    } else {
      return false;
    }
  };
  IsCheckedSc = () => {
    if (this.state.isTrue === true) {
      return true;
    } else if (this.state.isCheckedSc === true) {
      return true;
    } else {
      return false;
    }
  };
  IsCheckedHD = () => {
    if (this.state.isTrue === true) {
      return true;
    } else if (this.state.isCheckedHD === true) {
      return true;
    } else {
      return false;
    }
  };

  //Sets value & key from input fields
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  //SET New User Data to be saved
  newUserData = () => {
    let newData = {};
    if (
      !this.state.name &&
      !this.state.email &&
      !this.state.password &&
      !this.state.lang
    ) {
      newData = {
        client: this.state.client,
      };
    } else if (
      !this.state.email &&
      !this.state.client &&
      !this.state.password &&
      !this.state.lang
    ) {
      newData = {
        name: this.state.name,
      };
    } else if (
      !this.state.name &&
      !this.state.client &&
      !this.state.password &&
      !this.state.lang
    ) {
      newData = {
        email: this.state.email,
      };
    } else if (
      !this.state.name &&
      !this.state.email &&
      !this.state.client &&
      !this.state.lang
    ) {
      newData = {
        password: this.state.password,
      };
    } else if (
      !this.state.name &&
      !this.state.client &&
      !this.state.email &&
      !this.state.password
    ) {
      newData = {
        code: this.state.lang,
      };
      if (this.state.OptionsId === null) {
        axios
          .post(
            "/api/users/newOpts/" +
              this.state.selectedUser +
              "/" +
              this.state.optsCat,
            newData
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .put(
            "/api/users/userOpts/" +
              this.state.OptionsId +
              "/" +
              this.state.selectedUser,
            newData
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      }
    } else if (!this.state.client && !this.state.password && !this.state.lang) {
      newData = {
        name: this.state.name,
        email: this.state.email,
      };
    } else if (!this.state.name && !this.state.password && !this.state.lang) {
      newData = {
        email: this.state.email,
        client: this.state.client,
      };
    } else if (!this.state.email && !this.state.password && !this.state.lang) {
      newData = {
        name: this.state.name,
        client: this.state.client,
      };
    } else if (!this.state.password) {
      newData = {
        name: this.state.name,
        email: this.state.email,
        client: this.state.client,
        lang: this.state.lang,
      };
    } else if (!this.state.client) {
      newData = {
        name: this.state.name,
        password: this.state.password,
        email: this.state.email,
        lang: this.state.lang,
      };
    } else if (!this.state.name) {
      newData = {
        email: this.state.email,
        client: this.state.client,
        password: this.state.password,
        lang: this.state.lang,
      };
    } else if (!this.state.lang) {
      newData = {
        email: this.state.email,
        client: this.state.client,
        password: this.state.password,
      };
    } else {
      newData = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        client: this.state.client,
        lang: this.state.lang,
      };
      this.editUser(newData);
    }
    this.editUser(newData);
    this.getClients();
  };

  //SET New links to be saved
  UpdateLinks = () => {
    let newLinks = {};
    // Editing 1 link only
    if (this.state.Reports) {
      let category = "Reports";
      newLinks = {
        url: this.state.Reports,
      };
      //check if link for Reports already exists
      if (this.state.ReportsId === null) {
        axios
          .post(
            "/api/users/addLink" + this.state.selectedUser + "/" + category,
            newLinks
          )
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      } else {
        axios
          .put(
            "/api/users/editlinks/" + this.state.ReportsId + "/" + category,
            newLinks
          )
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      }
    }
    if (this.state.CAFM) {
      let category = "CAFM";
      newLinks = {
        url: this.state.CAFM,
      };
      if (this.state.CAFMiD === null) {
        axios
          .post(
            "/api/users/addLink" + this.state.selectedUser + "/" + category,
            newLinks
          )
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      } else {
        axios
          .put(
            "/api/users/editlinks/" + this.state.CAFMiD + "/" + category,
            newLinks
          )
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      }
    }
    if (this.state.Service) {
      let category = "SSRS";
      newLinks = {
        url: this.state.Service,
      };
      if (this.state.SSRSiD === null) {
        axios
          .post(
            "/api/users/addLink" + this.state.selectedUser + "/" + category,
            newLinks
          )
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      } else {
        axios
          .put(
            "/api/users/editlinks/" + this.state.SSRSiD + "/" + category,
            newLinks
          )
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      }
    }
    if (this.state.IOT) {
      let category = "IOT";
      newLinks = {
        url: this.state.IOT,
      };
      if (this.state.IOTiD === null) {
        axios
          .post(
            "/api/users/addLink" + this.state.selectedUser + "/" + category,
            newLinks
          )
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      } else {
        axios
          .put(
            "/api/users/editlinks/" + this.state.IOTiD + "/" + category,
            newLinks
          )
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      }
    }
  };

  //Renders user list for selection
  renderUserList = () => {
    if (this.state.ClientSelectedData) {
      console.log(this.state.ClientSelectedData);
      return (
        <Grid
          item
          columns={{ xs: 2, s: 3, md: 4 }}
          justifyContent="center"
          alignItems="center"
        >
          <Box
            sx={{
              width: 250,
              height: 500,
              position: "relative",
              top: "-92px",
              backgroundColor: "white",
              boxShadow: 3,
            }}
          >
            <ul>
              {this.state.ClientSelectedData.map((item) => (
                <li id="li-names" key={item._id}>
                  <div
                    className="user-list-item"
                    style={{ color: "black" }}
                    onClick={() => this.userSelction(item.id)}
                  >
                    <span>{item.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Box>
        </Grid>
      );
    }
  };

  Translation = (id) => {
    return (
      <Grid container justifyContent="center">
        <Grid item columns={{ xs: 2, s: 3, md: 4 }}>
          <button
            id="translation-btn"
            onClick={this.translationsTable}
            style={{
              width: "300px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }}
            className="btn btn-large waves-effect waves-dark hoverable white black-text accent-3"
          >
            Translations
          </button>
        </Grid>
      </Grid>
    );
  };

  //Renders User detail Panel for editing
  renderDetailsPanel = () => {
    if (this.state.UserSelectedData) {
      console.log(this.state.UserSelectedData);
      //console.log(this.state.UserSelectedData.client.name);
      console.log(this.state.UserSelectedData.name);
      console.log(this.state.email);
      console.log(this.state.password);
      console.log(this.state.UserSelectedData.Client.name);
      console.log(this.state.CAFM);
      console.log(this.state.REPORT);
      console.log(this.state.SSRS);
      console.log(this.state.IOT);
      const lng = [
        { value: "en", label: "English" },
        { value: "fr", label: "Français" },
      ];
      const { t, i18n } = this.props;
      return (
        <Grid
          item
          columns={{ xs: 2, s: 3, md: 4 }}
          justifyContent="center"
          alignItems="center"
        >
          <Box
            sx={{
              width: 715,
              height: 500,
              position: "relative",
              top: "-85px",
              backgroundColor: "white",
              boxShadow: 3,
            }}
            overflow="auto"
            textOverflow="auto"
          >
            <TabContext value={this.state.value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={this.tabsChange}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab label={<Trans>{t("userDetailsTab")}</Trans>} value="1" />
                  <Tab label={<Trans>{t("linksTab")}</Trans>} value="2" />
                  <Tab label={<Trans>{t("hubMenuOptsTab")}</Trans>} value="3" />
                  <Tab
                    label={<Trans>{t("resourcesMenuOptsTab")}</Trans>}
                    value="4"
                  />
                  <Tab label={<Trans>{t("reportsOptsTab")}</Trans>} value="5" />
                </TabList>
              </Box>
              <TabPanel value="1">
                User Details
                <Box component="form" autoComplete="off" noValidate>
                  <Stack spacing={2}>
                    <div>
                      <input
                        id="name"
                        onChange={this.onChange}
                        value={this.state.name}
                        type="text"
                        placeholder={this.state.UserSelectedData.name}
                      />
                      <label htmlFor="name">
                        <Trans>{t("nameInput")}</Trans>
                      </label>
                    </div>
                    <div>
                      <input
                        onChange={this.onChange}
                        value={this.state.email}
                        id="email"
                        type="text"
                        autoComplete="new-password"
                        placeholder={this.state.UserSelectedData.email}
                      />
                      <label htmlFor="email">
                        <Trans>{t("emailInput")}</Trans>
                      </label>
                    </div>
                    <div>
                      <Select
                        onChange={(e) => {
                          this.state.client = e.value;
                        }}
                        options={this.state.clientListForSelect}
                        id="client"
                        placeholder={this.state.UserSelectedData.Client.name}
                      />
                      <label htmlFor="client">
                        <Trans>{t("clientInput")}</Trans>
                      </label>
                    </div>
                    <div>
                      <input
                        onChange={this.onChange}
                        value={this.state.password}
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        placeholder={this.state.UserSelectedData.password}
                      />
                      <label htmlFor="password">
                        <Trans>{t("passwordInput")}</Trans>
                      </label>
                    </div>
                    <div>
                      <Select
                        labelId="lgn-selector"
                        id="lgn-select"
                        options={lng}
                        placeholder={this.state.LngCode}
                        onChange={(e) => {
                          this.state.lang = e.value;
                          console.log(this.state.lang);
                        }}
                      />
                      <label id="lgn-selector">
                        <Trans>{t("languageInput")}</Trans>
                      </label>
                    </div>
                    <button
                      id="editUdata-btn-save"
                      onClick={() => this.newUserData()}
                      className="btn btn-small waves-effect waves-dark hoverable white black-text accent-3"
                    >
                      <Trans>{t("save")}</Trans>
                    </button>
                  </Stack>
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Box component="form" autoComplete="off" noValidate>
                  <Stack>
                    <div>
                      <label htmlFor="REPORT">
                        <Trans>{t("reportsLink")}</Trans>
                      </label>
                      <input
                        type="text"
                        id="REPORT"
                        name="Reports"
                        onChange={this.editlink}
                        value={this.state.REPORT}
                        placeholder={this.state.selectedUserReports}
                      />
                    </div>
                    <div>
                      <label htmlFor="CAFM">
                        <Trans>{t("managementLink")}</Trans>
                      </label>
                      <input
                        type="text"
                        onChange={this.editlink}
                        value={this.state.CAFM}
                        id="CAFM"
                        name="CAFM"
                        placeholder={this.state.selectedUserCAFM}
                      />
                    </div>
                    <div>
                      <label htmlFor="SSRS">
                        <Trans>{t("ssrsLink")}</Trans>
                      </label>
                      <input
                        type="text"
                        onChange={this.editlink}
                        value={this.state.SSRS}
                        id="SSRS"
                        name="Service"
                        placeholder={this.state.selectedUserSSRS}
                      />
                    </div>
                    <div>
                      <label htmlFor="IOT">
                        <Trans>{t("iotLink")}</Trans>
                      </label>
                      <input
                        type="text"
                        onChange={this.editlink}
                        value={this.state.IOT}
                        id="IOT"
                        placeholder={this.state.selectedUserIOT}
                        name="IOT"
                      />
                    </div>

                    <button
                      id="editUlinks-btn-save"
                      onClick={() => this.UpdateLinks()}
                      className="btn btn-small waves-effect waves-dark hoverable white black-text accent-3"
                    >
                      <Trans>{t("save")}</Trans>
                    </button>
                  </Stack>
                </Box>
              </TabPanel>
              <TabPanel value="3">
                <Box component="form" noValidate autoComplete="off">
                  <FormGroup onChange={this.HubcheckboxChange}>
                    <Stack>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={(e) => {
                                this.setState({ isTrue: e.target.checked });
                                console.log(this.state.isTrue);
                              }}
                              name="All"
                              value="{All: true}"
                            />
                          }
                          label={<Trans>{t("SelectAllLabel")}</Trans>}
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={this.ChckhandleChangeService}
                              checked={this.IsCheckedService()}
                              name="Service"
                            />
                          }
                          label={<Trans>{t("ServiceLabel")}</Trans>}
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={this.ChckhandleChange}
                              checked={this.IsCheckedCAFM()}
                              name="CAFM"
                            />
                          }
                          label={<Trans>{t("CAFMLabel")}</Trans>}
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={this.ChckhandleChangeREP}
                              checked={this.IsCheckedRep()}
                              name="Reports"
                            />
                          }
                          label={<Trans>{t("ReportsLabel")}</Trans>}
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={this.ChckhandleChangeIOT}
                              checked={this.IsCheckedIOT()}
                              name="IOT"
                              value="K"
                            />
                          }
                          label={<Trans>{t("IOTLabel")}</Trans>}
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={this.ChckhandleChangeRES}
                              checked={this.IsCheckedRes()}
                              name="Resource"
                              value="B"
                            />
                          }
                          label={<Trans>{t("ResourcesLabel")}</Trans>}
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={this.ChckhandleChangeSc}
                              checked={this.IsCheckedSc()}
                              name="Settings"
                              value="Sc"
                            />
                          }
                          label={<Trans>{t("SettingsLabel")}</Trans>}
                        />
                      </div>
                      <div>
                        {/** <FormControlLabel control={<Checkbox name="Intranet" value="I"/>} label="Intranet" />  */}
                        {/** <FormControlLabel control={<Checkbox name="SSRS" value="S"/>} label="Rapports SSRS" />  */}
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={this.ChckhandleChangeHD}
                              checked={this.IsCheckedHD()}
                              name="Contact"
                              value="H"
                            />
                          }
                          label={<Trans>{t("SupportLabel")}</Trans>}
                        />
                      </div>
                      <button
                        id="opts-btn-save"
                        onClick={() => {
                          this.editPermissionsHUB();
                        }}
                        className="btn btn-small waves-effect waves-dark hoverable white black-text accent-3"
                      >
                        <Trans>{t("save")}</Trans>
                      </button>
                    </Stack>
                  </FormGroup>
                </Box>
              </TabPanel>
              <TabPanel value="4">
                <Box component="form" noValidate autoComplete="off">
                  <FormGroup onChange={this.checkboxChange}>
                    <Stack>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={(e) => {
                                this.setState({ isTrue: e.target.checked });
                                console.log(this.state.isTrue);
                              }}
                              name="All"
                              value="TCWCtM"
                            />
                          }
                          label={<Trans>{t("SelectAllLabel")}</Trans>}
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={this.ChckhandleChange}
                              checked={this.IsCheckedCAFM()}
                              name="Templates"
                              value="T"
                            />
                          }
                          label={<Trans>{t("TemplatesLabel")}</Trans>}
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={this.ChckhandleChangeREP}
                              checked={this.IsCheckedRep()}
                              name="Checklist"
                              value="C"
                            />
                          }
                          label={<Trans>{t("ChecklistsLabel")}</Trans>}
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={this.ChckhandleChangeIOT}
                              checked={this.IsCheckedIOT()}
                              name="Workflows"
                              value="W"
                            />
                          }
                          label={<Trans>{t("WorkflowsLabel")}</Trans>}
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={this.ChckhandleChangeRES}
                              checked={this.IsCheckedRes()}
                              name="Contractor"
                              value="Ct"
                            />
                          }
                          label={<Trans>{t("ContractorLabel")}</Trans>}
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={this.ChckhandleChangeSc}
                              checked={this.IsCheckedSc()}
                              name="Medias"
                              value="M"
                            />
                          }
                          label={<Trans>{t("MediaLabel")}</Trans>}
                        />
                      </div>
                      <button
                        id="opts-btn-save"
                        onClick={() => {
                          this.editPermissionsRI();
                        }}
                        className="btn btn-small waves-effect waves-dark hoverable white black-text accent-3"
                      >
                        <Trans>{t("save")}</Trans>
                      </button>
                    </Stack>
                  </FormGroup>
                </Box>
              </TabPanel>
              <TabPanel value="5">
                <p>Reporting Services Options</p>

                <p>Coming soon...</p>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      );
    }
  };

  render() {
    const { t, i18n } = this.props;
    return (
      <div className="AdminPanel">
        <header>
          <h1 id="settings-title">
            <Link to="/hub">
              <this.settingsCard />
            </Link>
          </h1>

          <this.Translation />

          <div className="container">
            <div className="row">
              <div id="back-btn" className="col offset-s1 offset-m1">
                <button
                  onClick={this.onBackClick}
                  style={{
                    width: "125px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  className="btn btn-large waves-effect waves-dark hoverable white black-text accent-3"
                >
                  <Trans>{t("back")}</Trans>
                </button>
              </div>
            </div>
          </div>
        </header>

        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            id="admin-btns"
            direction="row"
            spacing={1}
          >
            <Grid item columns={{ xs: 2, s: 3, md: 4 }}>
              <button
                onClick={this.onRegClick}
                style={{
                  width: "300px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                className="btn btn-large waves-effect waves-dark hoverable white black-text accent-3"
              >
                <Trans>{t("regBtn")}</Trans>
              </button>
            </Grid>
            <Grid item columns={{ xs: 2, s: 3, md: 4 }}>
              <button
                onClick={this.onUploadClick}
                style={{
                  width: "300px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                className="btn btn-large waves-effect waves-dark hoverable white black-text accent-3"
              >
                <Trans>{t("upldResBtn")}</Trans>
              </button>
            </Grid>
            <Grid item columns={{ xs: 2, s: 3, md: 4 }}>
              <button
                onClick={this.availRes}
                style={{
                  width: "300px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                className="btn btn-large waves-effect waves-dark hoverable white black-text accent-3"
              >
                <Trans>{t("availResBtn")}</Trans>
              </button>
            </Grid>
            <Grid item columns={{ xs: 2, s: 3, md: 4 }}>
              <button
                onClick={this.onViewUp}
                style={{
                  width: "300px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                className="btn btn-large waves-effect waves-dark hoverable white black-text accent-3"
              >
                <Trans>{t("upldDocsBtn")}</Trans>
              </button>
            </Grid>
          </Grid>

          <Box sx={{ position: "relative", left: "30px;" }}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item columns={{ xs: 2, s: 3, md: 4 }}>
                <Box
                  sx={{
                    width: 250,
                    height: 500,
                    position: "relative",
                    top: "-85px",
                    backgroundColor: "white",
                    boxShadow: 3,
                  }}
                >
                  <button
                    onClick={this.onNewClientClick}
                    style={{
                      width: "150px",
                      height: "30px",
                      left: "70px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem",
                    }}
                    className="btn btn-small waves-effect waves-dark hoverable white black-text accent-3"
                  >
                    + Client
                  </button>

                  <ul id="client-list">
                    {this.state.clientList.map((item) => (
                      <li id="li-client" key={item.id}>
                        <div
                          className="client-list-item"
                          style={{ color: "black" }}
                          onClick={() => this.clientSelection(item.id)}
                        >
                          <span>{item.name}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Box>
              </Grid>

              {this.state.ClientSelectedData && <this.renderUserList />}

              {this.state.UserSelectedData && <this.renderDetailsPanel />}
            </Grid>
          </Box>
        </Box>
      </div>
    );
  }
}
AdminPanel.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(
  withTranslation("translations")(AdminPanel)
);
