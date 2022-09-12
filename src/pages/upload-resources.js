import { Component } from "react";
import { Trans, withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Select from "react-select";
import axios from "src/axios-config";
import "../App.css";
import wallpaper from "../assets/BACKGROUNDS/3.svg";

class UploadResources extends Component {
  constructor() {
    super();
    this.state = {
      file: {},
      filename: "",
    };
  }

  componentDidMount() {
    this.getClients();
    //console.log(this.state.client)
  }

  getClients = () => {
    axios.get("/api/clients/getClients").then((res) => {
      {
        if (res.data) {
          //console.log(res.data.data);
          this.setState({ clientList: res.data });
          console.log(this.state.clientList);
          var arr = this.state.clientList;
          arr.forEach(function (data) {
            data["value"] = data["id"];
            data["label"] = data["name"];
            delete data["id"];
            delete data["name"];
          });
          console.log(arr);
          this.setState({ clients: arr });
        }
      }
    });
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

  uploadFile = (e) => {
    let Data = new FormData();
    const file = this.state.file;
    const fileName = this.state.filename;
    const category = this.state.category;
    const clientId = this.state.client.id;
    const clientName = this.state.client.name;
    //console.log(file)
    Data.set("file", file);
    Data.set("fileName", fileName);
    Data.set("clientId", clientId);
    Data.set("clientName", clientName);
    Data.set("category", category);
    const get = Data.getAll("file");
    const newFile = {
      file: Data.get("file"),
      fileName: Data.get("fileName"),
    };
    var config = { headers: { "Content-Type": undefined } };
    //console.log(get);
    console.log(Data);

    axios
      .post("/uploadResource", Data, config)
      .then((res) => {
        console.log(res);
        //this.props.history.push('/admin');
      })
      .catch((err) => console.log(err));

    this.props.history.push("/admin");
  };

  onUploadClick = (e) => {
    e.preventDefault();
    this.props.history.push("/admin/upload");
  };

  onBackClick = (e) => {
    e.preventDefault();
    this.props.history.push("/admin");
  };

  render() {
    const { t, i18n } = this.props;
    const myStyle = {
      backgroundImage: `url(${wallpaper})`,
      height: "100vh",
      marginTop: "0px",
      fontSize: "50px",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };
    const categories = [
      { label: "Templates", value: "Templates" },
      { label: "Checklists", value: "Checklists" },
      { label: "Workflows", value: "Workflows" },
      { label: "Contractor", value: "Contractor" },
      { label: "Training Media", value: "Training Media" },
    ];
    return (
      <div
        className="UploadResources"
        style={{
          backgroundImage: `url(${wallpaper})`,
          height: "100vh",
          marginTop: "0px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col s8 offset-s2">
              <Link to="/admin">
                <h1>
                  <Trans>{t("upldResBtn")}</Trans>
                </h1>
              </Link>
            </div>
            <div className="input-field col s6 m6">
              <Select
                onChange={(e) => {
                  this.state.category = e.value;
                }}
                options={categories}
                id="cat"
                placeholder="Select Category"
                style={{ width: "20%" }}
              />
            </div>
            <div className="input-field col s6 m6">
              <Select
                onChange={(e) => {
                  this.state.client = { id: e.value, name: e.label };
                }}
                options={this.state.clients}
                id="client"
                placeholder="Select Client"
              />
            </div>
            <div className="input-field col s6 m6">
              <input
                className="custom-file-input"
                type="file"
                onChange={this.saveFile}
              />
            </div>
            <div className="col offset-s10">
              <button
                className="btn btn-large waves-effect waves-dark hoverable white black-text accent-3"
                onClick={this.uploadFile}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("translations")(UploadResources);
