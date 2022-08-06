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
import { withTranslation, Trans, getI18n } from "react-i18next";
import { Link } from "react-router-dom";
import axios from "src/axios-config";
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
  I18nConfig,
} from "chonky";
import { ChonkyIconFA } from "chonky-icon-fontawesome";
import { actions } from "react-table";
import wallpaper from "../assets/BACKGROUNDS/3.svg";

class fileExplr extends Component {
  constructor() {
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
        const category = "Templates";
        const clientName = res.data.Client.name;
        axios
          .get("/fileMap/filemap_" + category + "_" + clientName + ".json")
          .then((res) => {
            this.setState({ fileData: res.data });
            this.setState({ rootFolderId: res.data.rootFolderId });
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
    //const currentFolderId = this.state.fileData?.fileMap["new-folder-new folder"]["id"];
    var currentFolderId = localStorage?.rootFolderId;
    console.log(currentFolderId);

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
    this.props.history.push("/user/TemplatesUpload");
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
                width="588.248"
                height="102.073"
                viewBox="0 0 588.248 120"
              >
                <text
                  id="Fichier_Import"
                  data-name="Fichier Import"
                  transform="translate(95 79.964)"
                  fill="#ffffff"
                  font-size="80"
                  font-family="Test"
                >
                  <tspan x="0" y="0">
                    <Trans>{t("templatesCard")}</Trans>
                  </tspan>
                </text>
                <path
                  id="Path_1"
                  data-name="Path 1"
                  d="M165.9,43.614l-.074-.011-.067-.008c-.03,0-.06,0-.09,0l-.039,0H109.592l-.039,0c-.03,0-.06,0-.09,0l-.069.008a1.5,1.5,0,0,0-1.29,1.315c0,.018,0,.036,0,.055s0,.065,0,.1c0,.006,0,.011,0,.017.066,26.174-.2,25.831.249,26.507a1.508,1.508,0,0,0,1.249.672h56.051a1.5,1.5,0,0,0,1.481-1.481c0-.005,0-.011,0-.016V45.085c0-.005,0-.011,0-.016a1.5,1.5,0,0,0-1.226-1.456Zm-7.133,2.969-21.157,9.7-21.157-9.7Zm-47.677.836,22.927,10.507L111.09,68.433Zm5.364,21.85,21.157-9.7,21.157,9.7Zm47.678-.836L141.2,57.926l22.927-10.507Z"
                  transform="translate(-98.193 -34.898)"
                  fill="#ffffff"
                />
                <path
                  id="Path_2"
                  data-name="Path 2"
                  d="M132.762,0H62.986A4.491,4.491,0,0,0,58.5,4.486V30.162a1.5,1.5,0,1,0,2.99,0V4.486a1.5,1.5,0,0,1,1.5-1.5h69.776a1.5,1.5,0,0,1,1.5,1.5v93.1a1.5,1.5,0,0,1-1.5,1.5H62.986a1.5,1.5,0,0,1-1.5-1.5V36.143a1.5,1.5,0,1,0-2.99,0V97.587a4.491,4.491,0,0,0,4.486,4.486h69.776a4.491,4.491,0,0,0,4.486-4.486V4.486A4.491,4.491,0,0,0,132.762,0Z"
                  transform="translate(-58.5)"
                  fill="#ffffff"
                />
                <path
                  id="Path_3"
                  data-name="Path 3"
                  d="M108.167,237.917a1.5,1.5,0,0,0,1.5,1.5h21.7a1.5,1.5,0,0,0,1.5-1.5V221.45a1.5,1.5,0,0,0-1.5-1.5h-21.7a1.5,1.5,0,0,0-1.5,1.5Zm2.995-14.97h18.707V236.42H111.162Z"
                  transform="translate(-98.265 -176.051)"
                  fill="#ffffff"
                />
                <path
                  id="Path_4"
                  data-name="Path 4"
                  d="M305.525,219.953H284.16a1.5,1.5,0,1,0,0,2.995h21.365a1.5,1.5,0,1,0,0-2.995Z"
                  transform="translate(-237.922 -176.051)"
                  fill="#ffffff"
                />
                <path
                  id="Path_5"
                  data-name="Path 5"
                  d="M305.525,261.191H284.16a1.5,1.5,0,1,0,0,2.995h21.365a1.5,1.5,0,1,0,0-2.995Z"
                  transform="translate(-237.922 -209.055)"
                  fill="#ffffff"
                />
                <path
                  id="Path_6"
                  data-name="Path 6"
                  d="M305.525,302.43H284.16a1.5,1.5,0,1,0,0,2.995h21.365a1.5,1.5,0,1,0,0-2.995Z"
                  transform="translate(-237.922 -242.061)"
                  fill="#ffffff"
                />
                <path
                  id="Path_7"
                  data-name="Path 7"
                  d="M304.173,366.785h-21.7a1.5,1.5,0,0,0-1.5,1.5v16.467a1.5,1.5,0,0,0,1.5,1.5h21.7a1.5,1.5,0,0,0,1.5-1.5V368.282A1.5,1.5,0,0,0,304.173,366.785Zm-1.5,16.467H283.969V369.78h18.707Z"
                  transform="translate(-236.57 -293.567)"
                  fill="#ffffff"
                />
                <path
                  id="Path_8"
                  data-name="Path 8"
                  d="M109.664,369.78h21.365a1.5,1.5,0,1,0,0-2.995H109.664a1.5,1.5,0,1,0,0,2.995Z"
                  transform="translate(-98.265 -293.567)"
                  fill="#ffffff"
                />
                <path
                  id="Path_9"
                  data-name="Path 9"
                  d="M109.664,411.018h21.365a1.5,1.5,0,1,0,0-2.995H109.664a1.5,1.5,0,1,0,0,2.995Z"
                  transform="translate(-98.265 -326.572)"
                  fill="#ffffff"
                />
                <path
                  id="Path_10"
                  data-name="Path 10"
                  d="M109.664,452.257h21.365a1.5,1.5,0,1,0,0-2.995H109.664a1.5,1.5,0,1,0,0,2.995Z"
                  transform="translate(-98.265 -359.577)"
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
                  id="fileBrwser"
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
