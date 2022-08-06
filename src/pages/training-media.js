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
        const category = "Training Media";
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
            <Link to="/dashboard">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="392"
                height="110.327"
                viewBox="0 0 392 120.327"
              >
                <text
                  id="Médias"
                  transform="translate(131 93.327)"
                  fill="#ffffff"
                  font-size="80"
                  font-family="Test"
                >
                  <tspan x="0" y="0">
                    <Trans>{t("mediaCard")}</Trans>
                  </tspan>
                </text>
                <g
                  id="media-monitor-screen-Digital_Marketing"
                  data-name="media-monitor-screen-Digital Marketing"
                  transform="translate(-2 -1.999)"
                >
                  <path
                    id="Path_36"
                    data-name="Path 36"
                    d="M106.809,25.9h-3.678V24.066h1.839a5.516,5.516,0,1,0,0-11.033h-1.839V3.84a1.78,1.78,0,0,0-.754-1.471,1.822,1.822,0,0,0-1.618-.294L77.113,9.356h-12.6a1.839,1.839,0,0,0-1.839,1.839v1.839H59a1.839,1.839,0,0,0-1.839,1.839v7.355A1.839,1.839,0,0,0,59,24.066h3.678V25.9H51.646V9.356a1.839,1.839,0,0,0-1.839-1.839H13.033a1.839,1.839,0,0,0-1.839,1.839V25.9H7.516A5.533,5.533,0,0,0,2,31.421v58.84a5.533,5.533,0,0,0,5.516,5.516H49.808v5.516H38.775a1.839,1.839,0,0,0-1.839,1.839v7.355a1.839,1.839,0,0,0,1.839,1.839H75.55a1.839,1.839,0,0,0,1.839-1.839v-7.355a1.839,1.839,0,0,0-1.839-1.839H64.518V95.777h42.291a5.533,5.533,0,0,0,5.516-5.516V31.421a5.533,5.533,0,0,0-5.516-5.516Zm-3.678-9.194h1.839a1.839,1.839,0,1,1,0,3.678h-1.839Zm-23.9-4.156L99.454,6.322V30.777L79.228,24.544Zm-12.871.478H75.55V24.066H66.356Zm5.24,14.71-1.324,9.194H68.2V27.743ZM60.84,20.388V16.711h1.839v3.678ZM14.871,11.195h33.1V36.937h-33.1Zm58.84,93.777v3.678h-33.1v-3.678Zm-20.226-3.678V95.777H60.84v5.516Zm55.163-11.033a1.839,1.839,0,0,1-1.839,1.839H7.516a1.839,1.839,0,0,1-1.839-1.839V88.422h102.97Zm0-5.516H5.678V31.421a1.839,1.839,0,0,1,1.839-1.839h3.678v9.194a1.839,1.839,0,0,0,1.839,1.839H49.808a1.839,1.839,0,0,0,1.839-1.839V29.582H64.518v9.194a1.839,1.839,0,0,0,1.839,1.839h5.516a1.839,1.839,0,0,0,1.82-1.581l1.618-11.29h1.8l23.646,7.281a1.7,1.7,0,0,0,.533.074,1.866,1.866,0,0,0,1.839-1.839V29.582h3.678a1.839,1.839,0,0,1,1.839,1.839Z"
                    transform="translate(0 0)"
                    fill="#ffffff"
                  />
                  <path
                    id="Path_37"
                    data-name="Path 37"
                    d="M7.839,60.1H55.646a1.839,1.839,0,0,0,1.839-1.839V28.839A1.839,1.839,0,0,0,55.646,27H7.839A1.839,1.839,0,0,0,6,28.839v29.42A1.839,1.839,0,0,0,7.839,60.1ZM9.678,56.42V32.128l21.1,12.987a1.839,1.839,0,0,0,1.927,0l21.1-12.987V56.42Zm4.658-25.743H49.15L31.743,41.39Z"
                    transform="translate(3.355 20.97)"
                    fill="#ffffff"
                  />
                  <path
                    id="Path_38"
                    data-name="Path 38"
                    d="M37.839,50.743h3.678v5.516A1.839,1.839,0,0,0,43.355,58.1H74.614a1.839,1.839,0,0,0,1.839-1.839V34.194a1.839,1.839,0,0,0-1.839-1.839H72.775V26.839A1.839,1.839,0,0,0,70.936,25h-33.1A1.839,1.839,0,0,0,36,26.839V48.9A1.839,1.839,0,0,0,37.839,50.743ZM72.775,54.42H45.194V36.033H72.775Zm-33.1-25.743H69.1v3.678H43.355a1.839,1.839,0,0,0-1.839,1.839V47.065H39.678Z"
                    transform="translate(28.518 19.292)"
                    fill="#ffffff"
                  />
                  <path
                    id="Path_39"
                    data-name="Path 39"
                    d="M43,33h3.678v3.678H43Z"
                    transform="translate(34.389 26.002)"
                    fill="#ffffff"
                  />
                  <path
                    id="Path_40"
                    data-name="Path 40"
                    d="M47,33H59.871v3.678H47Z"
                    transform="translate(37.744 26.002)"
                    fill="#ffffff"
                  />
                  <path
                    id="Path_41"
                    data-name="Path 41"
                    d="M43,37h7.355v3.678H43Z"
                    transform="translate(34.389 29.357)"
                    fill="#ffffff"
                  />
                  <path
                    id="Path_42"
                    data-name="Path 42"
                    d="M49,37h9.194v3.678H49Z"
                    transform="translate(39.422 29.357)"
                    fill="#ffffff"
                  />
                  <path
                    id="Path_43"
                    data-name="Path 43"
                    d="M15.872,24.436a1.839,1.839,0,0,0,1.789.081L28.693,19a1.839,1.839,0,0,0,0-3.291L17.661,10.193A1.839,1.839,0,0,0,15,11.839V22.872A1.839,1.839,0,0,0,15.872,24.436Zm2.806-9.622,5.082,2.541L18.678,19.9Z"
                    transform="translate(10.904 6.71)"
                    fill="#ffffff"
                  />
                </g>
              </svg>
            </Link>
          </h1>
        </header>
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
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
