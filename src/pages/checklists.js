//Styling
import "../App.css";
//Dependencies
import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { withTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Grid } from "@material-ui/core";
import {
  FileArray,
  FileHelper,
  FullFileBrowser,
  FileList,
  FileContextMenu,
  FileToolbar,
  FileActionHandler,
  ChonkyActions,
  FileAction,
  FileActionData,
} from "chonky";
import { ChonkyIconFA } from "chonky-icon-fontawesome";
import wallpaper from "../assets/BACKGROUNDS/3.svg";

class fileExplr extends Component {
  constructor(props) {
    super();
    this.state = {};
    this.Ref = React.createRef();
  }

  //Executes functions on page load
  componentDidMount() {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      setAuthToken(token);
      const decoded = jwt_decode(token);
      this.getCurrentUser(decoded.id);
      this.getLng(decoded.id);
    }
  }

  getLng = (id) => {
    let category = "language";
    axios.get("/api/users/getUserOpts/" + id + "/" + category).then((res) => {
      this.props.i18n.changeLanguage(res.data.code);
    });
  };

  getCurrentUser(id) {
    axios
      .get("/api/users/getUser/" + id)
      .then((res) => {
        this.setState({ currentUser: res.data });
        this.setState({ clientName: res.data.Client.name });
        const category = "Checklists";
        const clientName = res.data.Client.name;
        axios
          .get("/fileMap/filemap_" + category + "_" + clientName + ".json")
          .then((res) => {
            this.setState({ fileData: res.data });
            localStorage.setItem("rootFolderId", res.data.rootFolderId);
          });
      })
      .catch((err) => console.log(err));
  }

  prepareCustomFileMap() {
    const baseFileMap = this.state.fileData?.fileMap;
    const rootFolderId = this.state.fileData?.rootFolderId;
    return { baseFileMap, rootFolderId };
  }

  useCustomFileMap() {
    const { baseFileMap, rootFolderId } = this.prepareCustomFileMap();
    const fileMap = baseFileMap;
    var currentFolderId = localStorage?.rootFolderId;

    let currentFolderIdRef = { current: "" };
    currentFolderIdRef.current = currentFolderId;

    const moveFiles = (files, source, destination) => {
      const newFileMap = Object.assign({}, fileMap);
      const moveFileIds = new Set(files.map((f) => f.id));
      const newSourceChildrenIds = source.childrenIds.filter(
        (id) => !moveFileIds.has(id)
      );
      newFileMap[source.id] = Object.assign(Object.assign({}, source), {
        childrenIds: newSourceChildrenIds,
        childrenCount: newSourceChildrenIds.length,
      });
      const newDestinationChildrenIds = [
        ...destination.childrenIds,
        ...files.map((f) => f.id),
      ];
      newFileMap[destination.id] = Object.assign(
        Object.assign({}, destination),
        {
          childrenIds: newDestinationChildrenIds,
          childrenCount: newDestinationChildrenIds.length,
        }
      );

      files.forEach((file) => {
        newFileMap[file.id] = Object.assign(Object.assign({}, file), {
          parentId: destination.id,
        });
      });
      const client = this.state.clientName;
      const category = newFileMap["1"]["name"];
      const data = { newFileMap, client, category };
      console.log(data);
      var config = { headers: { "Content-Type": undefined } };
      axios
        .post("/filemap", data, config)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
      window.location.reload();
      console.log(newFileMap);
      return newFileMap;
    };

    const idCounter = 1;
    const createFolder = (folderName) => {
      const newFileMap = Object.assign({}, fileMap);
      const newFolderId = `new-folder-${folderName}`;
      newFileMap[newFolderId] = {
        id: newFolderId,
        name: folderName,
        isDir: true,
        modDate: new Date(),
        parentId: currentFolderIdRef.current,
        childrenIds: [],
        childrenCount: 0,
      };
      // Update parent folder to reference the new folder.
      const parent = newFileMap[currentFolderIdRef.current];
      newFileMap[currentFolderIdRef.current] = Object.assign(
        Object.assign({}, parent),
        { childrenIds: [...parent.childrenIds, newFolderId] }
      );
      const client = this.state.clientName;
      const name = "filemap_" + client;
      const category = newFileMap["1"]["name"];
      const data = { newFileMap, client, category };
      console.log(data);
      var config = { headers: { "Content-Type": undefined } };
      axios
        .post("/filemap", data, config)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
      window.location.reload();
      console.log(newFileMap);
      return newFileMap;
    };
    return {
      fileMap,
      currentFolderId,
      moveFiles,
      createFolder,
    };
  }

  useFiles(fileMap, currentFolderId) {
    const currentFolder = fileMap?.[currentFolderId];
    const childrenIds = currentFolder?.childrenIds;
    const files = childrenIds?.map((fileId) => fileMap[fileId]);
    return files;
  }

  useFolderChain = (fileMap, currentFolderId) => {
    const currentFolder = fileMap?.[currentFolderId];
    const folderChain = [currentFolder];
    let parentId = currentFolder?.parentId;
    while (parentId) {
      const parentFile = fileMap?.[parentId];
      if (parentFile) {
        folderChain.unshift(parentFile);
        parentId = parentFile?.parentId;
      } else {
        break;
      }
    }
    return folderChain;
  };

  useFileActionHandler = (action: FileAction) => {
    if (action.id === ChonkyActions.OpenFiles.id) {
      console.log(action);
      const { targetFile, files } = action.payload;
      const fileToOpen =
        targetFile !== null && targetFile !== void 0 ? targetFile : files[0];
      if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
        localStorage.setItem("rootFolderId", fileToOpen.id);
        window.location.reload();
        return;
      } else {
        const file = action.payload.targetFile.location;
        //console.log(data.payload.targetFile.location);
        window.open("/" + file, "_blank").focus();
      }
    } else if (action.id === ChonkyActions.CreateFolder.id) {
      console.log(action);
      const folderName = prompt("Provide the name for your new folder:");
      if (folderName) {
        this.useCustomFileMap().createFolder(folderName);
      }
    } else if (action.id === ChonkyActions.MoveFiles.id) {
      console.log(action);
      this.useCustomFileMap().moveFiles(
        action.payload.files,
        action.payload.source,
        action.payload.destination
      );
    }
  };

  //Call to action methods
  onBackClick = (e) => {
    e.preventDefault();
    this.props.history.push("/dashboard");
  };
  onUploadClick = (e) => {
    e.preventDefault();
    this.props.history.push("/user/ChecklistsUpload");
  };

  //renders UI
  render() {
    const frenchI18n: I18nConfig = {
      locale: "fr",
      messages: {
        "chonky.toolbar.searchPlaceholder": "Rechercher",
        [`chonky.actionGroups.Actions`]: "Actions",
        [`chonky.actionGroups.Options`]: "Options",
        [`chonky.actions.${ChonkyActions.CreateFolder.id}.button.name`]:
          "Nouveau Fichier",
        [`chonky.actions.${ChonkyActions.CreateFolder.id}.button.tooltip`]:
          "Nouveau Fichier",
        [`chonky.actions.${ChonkyActions.OpenSelection.id}.button.name`]:
          "Ouvrir",
        [`chonky.actions.${ChonkyActions.SelectAllFiles.id}.button.name`]:
          "Tout Sélectionner",
        [`chonky.actions.${ChonkyActions.ClearSelection.id}.button.name`]:
          "Annuler la sélection",
        [`chonky.actions.${ChonkyActions.EnableListView.id}.button.name`]:
          "Vue en liste",
        [`chonky.actions.${ChonkyActions.EnableGridView.id}.button.name`]:
          "Vue en grid",
        [`chonky.actions.${ChonkyActions.SortFilesByName.id}.button.name`]:
          "Trier par noms",
        [`chonky.actions.${ChonkyActions.SortFilesBySize.id}.button.name`]:
          "Trier par taille",
        [`chonky.actions.${ChonkyActions.SortFilesByDate.id}.button.name`]:
          "Trier par date",
        [`chonky.actions.${ChonkyActions.ToggleHiddenFiles.id}.button.name`]:
          "Afficher les fichiers cachés",
        [`chonky.actions.${ChonkyActions.ToggleShowFoldersFirst.id}.button.name`]:
          "Mettre fichiers en avant",
      },
    };

    const getTrans = () => {
      let testI18n = null;
      if (localStorage.i18nextLng === "fr") {
        testI18n = frenchI18n;
        return testI18n;
      } else return testI18n;
    };
    const myStyle = {
      backgroundImage: `url(${wallpaper})`,
      height: "100vh",
      marginTop: "0px",
      fontSize: "50px",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };
    const { t, i18n } = this.props;
    const { fileMap, currentFolderId, moveFiles, createFolder } =
      this.useCustomFileMap();
    const files = this.useFiles(fileMap, currentFolderId);
    const folderChain = this.useFolderChain(fileMap, currentFolderId);
    //const handleFileAction = this.useFileActionHandler(currentFolderId);
    const fileActions = [ChonkyActions.CreateFolder];
    console.log(this.useCustomFileMap());
    return (
      <div className="fileExplr" style={myStyle}>
        <header>
          <h1 id="title-pages">
            <Link class="res-cat" to="/dashboard">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="550"
                height="160"
                viewBox="0 0 456.748 189.092"
              >
                <text
                  id="Checklists_"
                  data-name="Checklists
"
                  transform="translate(85.748 77.092)"
                  fill="#ffffff"
                  font-size="80"
                  font-family="Test"
                >
                  <tspan x="0" y="0">
                    <Trans>{t("checklistCard")}</Trans>
                  </tspan>
                  <tspan x="0" y="95"></tspan>
                </text>
                <path
                  id="Path_12"
                  data-name="Path 12"
                  d="M351.111,200.545a1.856,1.856,0,1,0,.544,1.313A1.871,1.871,0,0,0,351.111,200.545Z"
                  transform="translate(-291.491 -162.856)"
                  fill="#ffffff"
                />
                <path
                  id="Path_14"
                  data-name="Path 14"
                  d="M258.979,200H247.858a1.857,1.857,0,1,0,0,3.715h11.121a1.857,1.857,0,1,0,0-3.715Z"
                  transform="translate(-208.484 -162.855)"
                  fill="#ffffff"
                />
                <path
                  id="Path_15"
                  data-name="Path 15"
                  d="M274.6,260H247.858a1.857,1.857,0,1,0,0,3.714H274.6a1.857,1.857,0,1,0,0-3.714Z"
                  transform="translate(-208.484 -211.711)"
                  fill="#ffffff"
                />
                <path
                  id="Path_16"
                  data-name="Path 16"
                  d="M351.111,308.545a1.856,1.856,0,1,0,.544,1.313A1.871,1.871,0,0,0,351.111,308.545Z"
                  transform="translate(-291.491 -250.797)"
                  fill="#ffffff"
                />
                <path
                  id="Path_17"
                  data-name="Path 17"
                  d="M258.979,308H247.858a1.857,1.857,0,1,0,0,3.715h11.121a1.857,1.857,0,1,0,0-3.715Z"
                  transform="translate(-208.484 -250.797)"
                  fill="#ffffff"
                />
                <path
                  id="Path_18"
                  data-name="Path 18"
                  d="M274.6,368H247.858a1.857,1.857,0,1,0,0,3.715H274.6a1.857,1.857,0,1,0,0-3.715Z"
                  transform="translate(-208.484 -299.653)"
                  fill="#ffffff"
                />
                <path
                  id="Path_19"
                  data-name="Path 19"
                  d="M351.111,416.545a1.856,1.856,0,1,0,.544,1.313A1.871,1.871,0,0,0,351.111,416.545Z"
                  transform="translate(-291.491 -338.739)"
                  fill="#ffffff"
                />
                <path
                  id="Path_20"
                  data-name="Path 20"
                  d="M258.979,416H247.858a1.857,1.857,0,1,0,0,3.715h11.121a1.857,1.857,0,1,0,0-3.715Z"
                  transform="translate(-208.484 -338.738)"
                  fill="#ffffff"
                />
                <path
                  id="Path_21"
                  data-name="Path 21"
                  d="M113.693,7.243H99.508a11.379,11.379,0,0,0-7.872-3.158H90.009a7.428,7.428,0,0,0-13.268,0H75.11a11.379,11.379,0,0,0-7.872,3.158H53.057A9.066,9.066,0,0,0,44,16.3V86.036a9.066,9.066,0,0,0,9.056,9.056h60.636a9.066,9.066,0,0,0,9.056-9.056V16.3A9.066,9.066,0,0,0,113.693,7.243ZM75.11,7.8H78a1.857,1.857,0,0,0,1.79-1.363,3.715,3.715,0,0,1,7.16,0A1.857,1.857,0,0,0,88.745,7.8h2.891a7.718,7.718,0,0,1,7.68,7.058H67.43A7.718,7.718,0,0,1,75.11,7.8Zm43.924,78.236a5.347,5.347,0,0,1-5.341,5.341H53.057a5.347,5.347,0,0,1-5.341-5.341V16.3a5.347,5.347,0,0,1,5.341-5.341H64.636a11.354,11.354,0,0,0-.948,4.55v1.207a1.857,1.857,0,0,0,1.857,1.857H101.2a1.857,1.857,0,0,0,1.857-1.857V15.508a11.355,11.355,0,0,0-.948-4.55h11.583a5.347,5.347,0,0,1,5.341,5.341Z"
                  transform="translate(-44.001)"
                  fill="#ffffff"
                />
                <path
                  id="Path_22"
                  data-name="Path 22"
                  d="M121.447,147.211a1.857,1.857,0,0,0-2.627,0l-7.942,7.942-2.447-2.447a1.857,1.857,0,0,0-2.627,2.627l3.76,3.76a1.857,1.857,0,0,0,2.627,0l9.255-9.255A1.858,1.858,0,0,0,121.447,147.211Z"
                  transform="translate(-93.884 -119.427)"
                  fill="#ffffff"
                />
                <path
                  id="Path_23"
                  data-name="Path 23"
                  d="M120.773,368h-8.915A1.857,1.857,0,0,0,110,369.857v8.915a1.857,1.857,0,0,0,1.857,1.857h8.915a1.857,1.857,0,0,0,1.857-1.857v-8.915A1.857,1.857,0,0,0,120.773,368Zm-1.857,8.915h-5.2v-5.2h5.2Z"
                  transform="translate(-97.743 -299.653)"
                  fill="#ffffff"
                />
                <path
                  id="Path_24"
                  data-name="Path 24"
                  d="M120.773,260h-8.915A1.857,1.857,0,0,0,110,261.857v8.915a1.857,1.857,0,0,0,1.857,1.857h8.915a1.857,1.857,0,0,0,1.857-1.857v-8.915A1.857,1.857,0,0,0,120.773,260Zm-1.857,8.915h-5.2v-5.2h5.2Z"
                  transform="translate(-97.743 -211.711)"
                  fill="#ffffff"
                />
              </svg>
            </Link>
          </h1>
        </header>
        <div className="container">
          <div className="row">
            <div className="col offset-s7 offset-m7">
              <button
                id="user-btn-upload"
                onClick={this.onUploadClick}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "300px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                className="btn btn-large waves-effect waves-dark hoverable white black-text accent-3"
              >
                <Trans>{t("uploadDocs")}</Trans>
              </button>
            </div>
          </div>
        </div>
        <Box
          sx={{
            display: "flex",
            position: "relative",
            top: "20%",
            boxShadow: 3,
          }}
        >
          <Grid container justifyContent="center" alignItems="center">
            <Grid items xs={9}>
              <div style={{ height: 500 }}>
                <FullFileBrowser
                  i18n={getTrans()}
                  files={files}
                  folderChain={folderChain}
                  fileActions={fileActions}
                  onFileAction={this.useFileActionHandler}
                  iconComponent={ChonkyIconFA}
                >
                  <FileToolbar />
                  <FileList />
                  <FileContextMenu />
                </FullFileBrowser>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

export default withTranslation("translations")(fileExplr);
