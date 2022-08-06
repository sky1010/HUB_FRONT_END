import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "src/axios-config";
import { withTranslation, Trans } from "react-i18next";
import MaterialTable from "material-table";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
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
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import wallpaper from "../assets/BACKGROUNDS/3.svg";

class Contractor extends Component {
  constructor() {
    super();
    this.state = {};
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
        const category = "Contractor";
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

  onFormClick = (e) => {
    e.preventDefault();
    this.props.history.push("/contractor-form");
  };

  onBackClick = (e) => {
    e.preventDefault();
    this.props.history.push("/dashboard");
  };

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
    return (
      <div className="Contractor" style={myStyle}>
        <header>
          <h1 id="title-pages">
            <Link class="res-cat" to="/dashboard">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="502"
                height="110.327"
                viewBox="0 0 502 140.327"
              >
                <g
                  id="Group_77"
                  data-name="Group 77"
                  transform="translate(-657 -43.673)"
                >
                  <text
                    id="Prestataire"
                    transform="translate(776 137)"
                    fill="#ffffff"
                    font-size="80"
                    font-family="Test"
                  >
                    <tspan x="0" y="0">
                      <Trans>{t("contractorCard")}</Trans>
                    </tspan>
                  </text>
                  <g
                    id="Group_34"
                    data-name="Group 34"
                    transform="translate(652 41.673)"
                  >
                    <path
                      id="Path_44"
                      data-name="Path 44"
                      d="M34.71,24H31.033a3.678,3.678,0,0,1-7.355,0H20a7.355,7.355,0,0,0,14.71,0Z"
                      transform="translate(12.582 18.453)"
                      fill="#ffffff"
                    />
                    <rect
                      id="Rectangle_14"
                      data-name="Rectangle 14"
                      width="4"
                      height="3"
                      transform="translate(31 35)"
                      fill="#ffffff"
                    />
                    <rect
                      id="Rectangle_15"
                      data-name="Rectangle 15"
                      width="3"
                      height="3"
                      transform="translate(46 35)"
                      fill="#ffffff"
                    />
                    <path
                      id="Path_45"
                      data-name="Path 45"
                      d="M104.092,87.6l-3.678-7.355a1.817,1.817,0,0,0-1.637-1.011H87.745V73.713a1.839,1.839,0,0,0-1.839-1.839H74.524a12.991,12.991,0,0,0-9.1-9.507L49.131,57.623V54.681a18.43,18.43,0,0,0,9.194-15.905V32.928a5.491,5.491,0,0,0-.074-10.389,18.2,18.2,0,0,0-12.8-16.016V5.678A3.689,3.689,0,0,0,41.776,2H38.1a3.689,3.689,0,0,0-3.678,3.678v.846a18.2,18.2,0,0,0-12.8,16.016,5.491,5.491,0,0,0-.074,10.389v5.847a18.43,18.43,0,0,0,9.194,15.905v2.942L14.47,62.367A12.91,12.91,0,0,0,5,74.779v35.709a1.839,1.839,0,0,0,1.839,1.839h95.617a1.839,1.839,0,0,0,1.839-1.839V88.423A1.839,1.839,0,0,0,104.092,87.6ZM84.068,75.551v3.678H69.357V75.551ZM52.808,62.514v2.317a5.724,5.724,0,0,0-3.678,0V61.448ZM45.453,10.422a14.909,14.909,0,0,1,9.065,11.805H45.453ZM38.1,5.678h3.678V22.227H38.1Zm-3.678,4.744V22.227H25.355a14.909,14.909,0,0,1,9.065-11.805ZM21.549,27.743A1.839,1.839,0,0,1,23.388,25.9h33.1a1.839,1.839,0,0,1,0,3.678h-33.1A1.839,1.839,0,0,1,21.549,27.743Zm3.678,11.033V33.259H54.647v5.516a14.71,14.71,0,1,1-29.421,0ZM45.453,56.318V63.6l-5.516,4.137L34.421,63.6V56.318a18.412,18.412,0,0,0,11.033,0Zm-18.388,6.2,3.678-1.067v3.383a5.724,5.724,0,0,0-3.678,0ZM41.978,87.6a1.839,1.839,0,0,0-.2.827V108.65H21.549V81.068H17.871V108.65H8.678V74.779a9.258,9.258,0,0,1,6.8-8.881l7.907-2.3v6.436a1.839,1.839,0,0,0,3.678,0,1.839,1.839,0,1,1,3.678,0,1.839,1.839,0,0,0,3.678,0V68.2l4.413,3.31a1.839,1.839,0,0,0,2.207,0l4.413-3.31v1.839a1.839,1.839,0,0,0,3.678,0,1.839,1.839,0,1,1,3.678,0,1.839,1.839,0,0,0,3.678,0V63.6l7.925,2.3A9.194,9.194,0,0,1,70.7,71.874H67.519a1.839,1.839,0,0,0-1.839,1.839v5.516H47.292a1.817,1.817,0,0,0-1.637,1.011ZM63.841,108.65H45.453V88.864l2.979-5.958h12.43l2.979,5.958Zm36.776,0h-33.1V95.778H78.551a5.516,5.516,0,1,0,11.033,0h11.033ZM82.229,95.778V92.1a1.839,1.839,0,0,1,3.678,0v3.678a1.839,1.839,0,0,1-3.678,0ZM100.617,92.1H89.584a5.516,5.516,0,0,0-11.033,0H67.519V88.423a1.839,1.839,0,0,0-.2-.827l-2.335-4.689H97.638l2.979,5.958Z"
                      transform="translate(0 0)"
                      fill="#ffffff"
                    />
                  </g>
                </g>
              </svg>
            </Link>
          </h1>
        </header>
        <div className="container">
          <div className="row">
            <div className="col offset-s7 offset-m7">
              <button
                id="user-btn-upload"
                onClick={this.onFormClick}
                style={{
                  width: "300px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                className="btn btn-large waves-effect waves-dark hoverable white black-text accent-3"
              >
                Contractor Form
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

export default withTranslation("translations")(Contractor);
