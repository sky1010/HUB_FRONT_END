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
        const category = "Workflows";
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
                width="536"
                height="106.327"
                viewBox="0 0 536 130.327"
              >
                <text
                  id="Procédures"
                  transform="translate(127 83)"
                  fill="#ffffff"
                  font-size="80"
                  font-family="Test"
                >
                  <tspan x="0" y="0">
                    <Trans>{t("workflowsCard")}</Trans>
                  </tspan>
                </text>
                <g
                  id="Group_32"
                  data-name="Group 32"
                  transform="translate(-2 -2)"
                >
                  <path
                    id="Path_25"
                    data-name="Path 25"
                    d="M24,6H52.354V9.544H24Z"
                    transform="translate(16.987 3.088)"
                    fill="#ffffff"
                  />
                  <path
                    id="Path_26"
                    data-name="Path 26"
                    d="M24,10H52.354v3.544H24Z"
                    transform="translate(16.987 6.177)"
                    fill="#ffffff"
                  />
                  <path
                    id="Path_27"
                    data-name="Path 27"
                    d="M24,14H52.354v3.544H24Z"
                    transform="translate(16.987 9.265)"
                    fill="#ffffff"
                  />
                  <path
                    id="Path_28"
                    data-name="Path 28"
                    d="M27,27H51.81v3.544H27Z"
                    transform="translate(19.303 19.303)"
                    fill="#ffffff"
                  />
                  <path
                    id="Path_29"
                    data-name="Path 29"
                    d="M25,31H49.81v3.544H25Z"
                    transform="translate(17.759 22.391)"
                    fill="#ffffff"
                  />
                  <path
                    id="Path_30"
                    data-name="Path 30"
                    d="M23,35H47.81v3.544H23Z"
                    transform="translate(16.214 25.48)"
                    fill="#ffffff"
                  />
                  <path
                    id="Path_31"
                    data-name="Path 31"
                    d="M24,48H41.6v3.49H24Z"
                    transform="translate(16.987 35.517)"
                    fill="#ffffff"
                  />
                  <path
                    id="Path_32"
                    data-name="Path 32"
                    d="M24,52H52.354v3.544H24Z"
                    transform="translate(16.987 38.606)"
                    fill="#ffffff"
                  />
                  <path
                    id="Path_33"
                    data-name="Path 33"
                    d="M24,56H52.354v3.544H24Z"
                    transform="translate(16.987 41.694)"
                    fill="#ffffff"
                  />
                  <path
                    id="Path_34"
                    data-name="Path 34"
                    d="M22.379,94.15H33.9v12.4a1.772,1.772,0,0,0,1.772,1.772H74.657a1.772,1.772,0,0,0,1.772-1.772V94.15H80.1a14.177,14.177,0,1,0,0-3.544H76.429V78.2a1.772,1.772,0,0,0-1.772-1.772H35.67A1.772,1.772,0,0,0,33.9,78.2v12.4H22.379a16.835,16.835,0,1,1,0-33.67H33.113L28.694,68.718a1.771,1.771,0,0,0,1.66,2.394H69.341A1.773,1.773,0,0,0,71,69.963l4.885-13.027H87.948a20.379,20.379,0,0,0,0-40.759H76.429V3.772A1.772,1.772,0,0,0,74.657,2H35.67A1.772,1.772,0,0,0,33.9,3.772V32.126A1.772,1.772,0,0,0,35.67,33.9H74.657a1.772,1.772,0,0,0,1.772-1.772v-12.4H87.948a16.835,16.835,0,0,1,0,33.67H77.214l4.419-11.783a1.771,1.771,0,0,0-1.66-2.394H40.987a1.773,1.773,0,0,0-1.66,1.15L34.442,53.391H22.379a20.379,20.379,0,0,0,0,40.759Zm71.771-12.4A10.633,10.633,0,1,1,83.517,92.378,10.644,10.644,0,0,1,94.15,81.745ZM37.442,79.973H72.885v24.81H37.442ZM72.885,30.354H37.442V5.544H72.885Zm-30.669,12.4h35.2l-9.3,24.81h-35.2Z"
                    fill="#ffffff"
                  />
                  <path
                    id="Path_35"
                    data-name="Path 35"
                    d="M55.09,60.407a1.766,1.766,0,0,0,1.253-.519L63.432,52.8l-2.506-2.506L55.09,56.129,52.8,53.837l-2.506,2.506,3.544,3.544a1.766,1.766,0,0,0,1.253.519Z"
                    transform="translate(37.288 37.288)"
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
