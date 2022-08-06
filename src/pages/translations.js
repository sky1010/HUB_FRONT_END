import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Select from "react-select";
import axios from "src/axios-config";
import "../App.css";
import { Box, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { withTranslation, Trans } from "react-i18next";
//import translationEN from '../locales/en/translations';
import translationFR from "../locales/fr/translations.json";
import translationENG from "../locales/en/translations.json";
import ReactJson from "react-json-view";
import wallpaper from "../assets/BACKGROUNDS/3.svg";
import { Thermostat } from "@mui/icons-material";

export class Translations extends Component {
  constructor() {
    super();
    this.state = {
      file: {},
      filename: "",
    };
  }

  componentDidMount() {
    //console.log(Object.keys(translationEN))
    this.getENGJson();
    this.getFRJSON();
    this.saveJSON();
    //console.log(this.state.client)
  }

  getENGJson = () => {
    axios
      .get("/en")
      .then((res) => {
        this.setState({ english: res.data });
        //console.log(this.state.ENGjson)
      })
      .catch((err) => console.log(err));
  };

  getFRJSON = () => {
    axios
      .get("/fr")
      .then((res) => {
        this.setState({ french: res.data });
        //console.log(this.state.ENGjson)
      })
      .catch((err) => console.log(err));
  };

  saveRes = (res) => {
    const data = res.data;
    this.setState({ jsonData: data });
    console.log(data);
    return data;
  };

  saveJSON = () => {
    axios.get("/eng").then((res) => {
      this.saveRes(res);
    });
    if (this.state.jsonData) {
      return this.state.jsonData;
    }
  };

  saveFile = (e) => {
    this.setState({
      file: e.target.files[0],
    });
    this.setState({
      filename: e.target.files[0].name,
    });
    //console.log(e.target.files[0])
  };

  onUploadClick = (e) => {
    e.preventDefault();
    this.props.history.push("/admin/upload");
  };

  onBackClick = (e) => {
    e.preventDefault();
    this.props.history.push("/admin");
  };
  save = (e) => {
    e.preventDefault();
    this.saveJSON();
  };

  onJsonChange(key, value, parent, data) {
    console.log(key, value, parent, data);
  }

  render() {
    const columns = [
      { field: "id", headerName: "ID", width: 50 },
      { field: "Key", headerName: "Translation Key", width: 360 },
      { field: "English", headerName: "English", width: 360, editable: true },
      { field: "French", headerName: "French", width: 360, editable: true },
    ];
    const rows = [
      {
        id: 1,
        Key: "back",
        English: "Back",
        French: "Retour",
      },
      {
        id: 2,
        Key: "logOut",
        English: "Log Out",
        French: "Déconnexion",
      },
    ];
    const myStyle = {
      backgroundImage: `url(${wallpaper})`,
      height: "100vh",
      marginTop: "0px",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };
    return (
      <div
        className="Translations"
        style={{
          backgroundImage: `url(${wallpaper})`,
          maxWidth: "auto",
          minHeight: "105vh",
          height: "auto",
          marginTop: "0px",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
        }}
      >
        <header>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent="center" spacing={2} direction="row">
              <Grid
                container
                justifyContent="center"
                sx={{ position: "relative", top: "5px" }}
              >
                <Link to="/admin">
                  <h1>Translations</h1>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </header>
        <div class="json-panel">
          <Grid container justifyContent="center" direction="row">
            <Grid container justifyContent="center" item xs={4}>
              <h3>English</h3>
              <ReactJson
                src={this.state.english}
                enableClipboard={false}
                theme={{
                  base00: "transparent",
                  base01: "white",
                  base02: "#ddd",
                  base03: "#444",
                  base04: "white",
                  base05: "#444",
                  base06: "#444",
                  base07: "white",
                  base08: "white",
                  base09: "orangered",
                  base0A: "orangered",
                  base0B: "black",
                  base0C: "orangered",
                  base0D: "orangered",
                  base0E: "green",
                  base0F: "orangered",
                }}
                iconStyle="square"
                onEdit={(e) => {
                  const data = e.updated_src;
                  axios
                    .post("/translation/update/english", data)
                    .then((res) => {
                      console.log(data);
                      res.json(data);
                    })
                    .catch((err) => console.log(err));
                  console.log(data);
                }}
              />
            </Grid>
            <Grid container justifyContent="center" item xs={4}>
              <h3>French</h3>
              <ReactJson
                src={this.state.french}
                enableClipboard={false}
                theme={{
                  base00: "transparent",
                  base01: "white",
                  base02: "#ddd",
                  base03: "#444",
                  base04: "white",
                  base05: "#444",
                  base06: "#444",
                  base07: "white",
                  base08: "white",
                  base09: "orangered",
                  base0A: "orangered",
                  base0B: "black",
                  base0C: "orangered",
                  base0D: "orangered",
                  base0E: "green",
                  base0F: "orangered",
                }}
                iconStyle="square"
                onEdit={(e) => {
                  const data = e.updated_src;
                  axios
                    .post("/translation/update/french", data)
                    .then((res) => {
                      console.log(data);
                      res.json(data);
                    })
                    .catch((err) => console.log(err));
                  console.log(data);
                }}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
export const getJson = new Translations();
export default withTranslation("translations")(Translations);
