import React, {
  Component,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { withTranslation, Trans } from "react-i18next";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Grid } from "@material-ui/core";
import { ChonkyIconFA } from "chonky-icon-fontawesome";
import {
  FileArray,
  FileHelper,
  FullFileBrowser,
  FileList,
  FileContextMenu,
  FileToolbar,
  FileActionHandler,
  ChonkyActions,
} from "chonky";

function Templates(props) {
  //global variables
  const [decoded, setDecoded] = useState();
  const [token, setToken] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [clientName, setClientName] = useState();
  const [fileData, setFileData] = useState(null);

  //Gets Token as the page load
  useEffect(() => {
    setToken(getToken());
  }, [token]);

  //Decodes token to get Current User
  function getToken() {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      setAuthToken(token);
      const decoded_token = jwt_decode(token);
      setDecoded(decoded_token.id);
      getCurrentUser(decoded_token.id);
    }
  }

  //Gets user with decoded id
  function getCurrentUser(id) {
    axios.get("/api/users/getUser/" + id).then((res) => {
      setCurrentUser(res.data);
      setClientName(res.data.Client.name);
      const category = "Templates";
      axios
        .get(
          "http://localhost:3512/fileMap/filemap_" +
            category +
            "_" +
            res.data.Client.name +
            ".json"
        )
        .then((res) => {
          setFileData(res.data);
        });
    });
  }
  //console.log(data);
  const f = {
    id: "8",
    name: "512 Digital - UX Services Proposal.pdf",
    location: "Resources/512 Digital - UX Services Proposal.pdf",
    parentId: "1",
  };

  const hardcoded = {
    rootFolderId: "1",
    fileMap: {
      1: {
        id: "1",
        name: "Templates",
        isDir: true,
        childrenIds: ["FCF - Support Services Discussion [DRAFT].pdf"],
      },
      "FCF - Support Services Discussion [DRAFT].pdf": {
        id: "FCF - Support Services Discussion [DRAFT].pdf",
        name: "FCF - Support Services Discussion [DRAFT].pdf",
        location: "Resources/FCF - Support Services Discussion [DRAFT].pdf",
        parentId: "1",
      },
    },
  };

  const test = JSON.stringify(fileData);
  const mapTest = JSON.parse(test);
  //console.log(map)

  function prepareCustomFileMap() {
    const map = {
      rootFolderId: fileData?.rootFolderId,
      fileMap: fileData?.fileMap,
    };
    try {
      const test = map;
      const str = JSON.stringify(test);
      const json = JSON.parse(str);
      console.log(json);
      const baseFileMap = hardcoded.fileMap;
      const rootFolderId = hardcoded.rootFolderId;
      return { baseFileMap, rootFolderId };
    } catch (err) {
      console.log("Error: ", err);
    }
  }
  console.log(
    prepareCustomFileMap().baseFileMap?.[
      "FCF - Support Services Discussion [DRAFT].pdf"
    ]["location"]
  );
  const useCustomFileMap = () => {
    const { baseFileMap, rootFolderId } = useMemo(
      () => prepareCustomFileMap(),
      []
    );
    //const baseFileMap = prepareCustomFileMap().baseFileMap;
    //const rootFolderId = prepareCustomFileMap().rootFolderId;
    // console.log(data?.fileMap[1].name)
    //console.log(fileData?.fileMap["1"]["id"]);
    console.log({ baseFileMap, rootFolderId });
    try {
      console.log(baseFileMap["1"]);
    } catch (err) {
      console.log("error:", err);
    }

    const [fileMap, setFileMap] = useState(baseFileMap);
    const [currentFolderId, setCurrentFolderId] = useState(rootFolderId);

    const currentFolderIdRef = useRef(currentFolderId);
    useEffect(() => {
      currentFolderIdRef.current = currentFolderId;
    }, [currentFolderId]);
    //console.log(currentFolderId)

    const moveFiles = useCallback((files, source, destination) => {
      setFileMap((currentFileMap) => {
        const newFileMap = Object.assign({}, currentFileMap);
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

        return newFileMap;
      });
    }, []);

    const idCounter = useRef(0);
    const createFolder = useCallback((folderName) => {
      setFileMap((currentFileMap) => {
        const newFileMap = Object.assign({}, currentFileMap);
        // Create the new folder
        const newFolderId = `new-folder-${idCounter.current++}`;
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

        return newFileMap;
      });
    });

    return {
      fileMap,
      currentFolderId,
      setCurrentFolderId,
      moveFiles,
      createFolder,
    };
  };

  const useFiles = (fileMap, currentFolderId) => {
    return useMemo(() => {
      const currentFolder = fileMap?.[currentFolderId];
      const childrenIds = currentFolder?.childrenIds;
      console.log(childrenIds);
      const files = childrenIds?.map((fileId) => fileMap[fileId]);
      return files;
    }, [currentFolderId, fileMap]);
  };
  //console.log(useFiles())
  const useFolderChain = (fileMap, currentFolderId) => {
    return useMemo(() => {
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
    }, [currentFolderId, fileMap]);
  };

  const useFileActionHandler = (
    setCurrentFolderId,
    moveFiles,
    createFolder
  ) => {
    return useCallback(
      (data) => {
        console.log(data);
        if (data.id === ChonkyActions.OpenFiles.id) {
          const { targetFile, files } = data.payload;
          const fileToOpen =
            targetFile !== null && targetFile !== void 0
              ? targetFile
              : files[0];
          if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
            setCurrentFolderId(fileToOpen.id);
            console.log(currentFolderId);
            return;
          } else {
            const file = data.payload.targetFile.location;
            //console.log(data.payload.targetFile.location);
            window.open("http://localhost:3512/" + file, "_blank").focus();
          }
        } else if (data.id === ChonkyActions.OpenFiles.id) {
        } else if (data.id === ChonkyActions.MoveFiles.id) {
          moveFiles(
            data.payload.files,
            data.payload.source,
            data.payload.destination
          );
        } else if (data.id === ChonkyActions.CreateFolder.id) {
          const folderName = prompt("Provide the name for your new folder:");
          if (folderName) createFolder(folderName);
        }
      },
      [createFolder, moveFiles, setCurrentFolderId]
    );
  };

  const {
    fileMap,
    currentFolderId,
    setCurrentFolderId,
    moveFiles,
    createFolder,
  } = useCustomFileMap();
  const files = useFiles(fileMap, currentFolderId);
  console.log(setCurrentFolderId);
  const folderChain = useFolderChain(fileMap, currentFolderId);
  const handleFileAction = useFileActionHandler(
    setCurrentFolderId,
    moveFiles,
    createFolder
  );
  const fileActions = useMemo(() => [ChonkyActions.CreateFolder], []);

  //Call to action methods
  function onBackClick() {
    props.history.push("/dashboard");
  }
  function onUploadClick() {
    props.history.push("/user/TemplatesUpload");
  }

  //const component = prepareCustomFileMap().baseFileMap[2].name;
  console.log(useCustomFileMap());
  const { t, i18n } = props;
  return (
    <div className="Templates">
      <header>
        <h1 id="title-pages">
          <Link to="/dashboard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="588.248"
              height="102.073"
              viewBox="0 0 588.248 102.073"
            >
              <text
                id="Fichier_Import"
                data-name="Fichier Import"
                transform="translate(95 79.964)"
                fill="#707070"
                font-size="80"
                font-family="HelveticaNeue, Helvetica Neue"
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
                fill="#575676"
              />
              <path
                id="Path_2"
                data-name="Path 2"
                d="M132.762,0H62.986A4.491,4.491,0,0,0,58.5,4.486V30.162a1.5,1.5,0,1,0,2.99,0V4.486a1.5,1.5,0,0,1,1.5-1.5h69.776a1.5,1.5,0,0,1,1.5,1.5v93.1a1.5,1.5,0,0,1-1.5,1.5H62.986a1.5,1.5,0,0,1-1.5-1.5V36.143a1.5,1.5,0,1,0-2.99,0V97.587a4.491,4.491,0,0,0,4.486,4.486h69.776a4.491,4.491,0,0,0,4.486-4.486V4.486A4.491,4.491,0,0,0,132.762,0Z"
                transform="translate(-58.5)"
                fill="#575676"
              />
              <path
                id="Path_3"
                data-name="Path 3"
                d="M108.167,237.917a1.5,1.5,0,0,0,1.5,1.5h21.7a1.5,1.5,0,0,0,1.5-1.5V221.45a1.5,1.5,0,0,0-1.5-1.5h-21.7a1.5,1.5,0,0,0-1.5,1.5Zm2.995-14.97h18.707V236.42H111.162Z"
                transform="translate(-98.265 -176.051)"
                fill="#575676"
              />
              <path
                id="Path_4"
                data-name="Path 4"
                d="M305.525,219.953H284.16a1.5,1.5,0,1,0,0,2.995h21.365a1.5,1.5,0,1,0,0-2.995Z"
                transform="translate(-237.922 -176.051)"
                fill="#575676"
              />
              <path
                id="Path_5"
                data-name="Path 5"
                d="M305.525,261.191H284.16a1.5,1.5,0,1,0,0,2.995h21.365a1.5,1.5,0,1,0,0-2.995Z"
                transform="translate(-237.922 -209.055)"
                fill="#575676"
              />
              <path
                id="Path_6"
                data-name="Path 6"
                d="M305.525,302.43H284.16a1.5,1.5,0,1,0,0,2.995h21.365a1.5,1.5,0,1,0,0-2.995Z"
                transform="translate(-237.922 -242.061)"
                fill="#575676"
              />
              <path
                id="Path_7"
                data-name="Path 7"
                d="M304.173,366.785h-21.7a1.5,1.5,0,0,0-1.5,1.5v16.467a1.5,1.5,0,0,0,1.5,1.5h21.7a1.5,1.5,0,0,0,1.5-1.5V368.282A1.5,1.5,0,0,0,304.173,366.785Zm-1.5,16.467H283.969V369.78h18.707Z"
                transform="translate(-236.57 -293.567)"
                fill="#575676"
              />
              <path
                id="Path_8"
                data-name="Path 8"
                d="M109.664,369.78h21.365a1.5,1.5,0,1,0,0-2.995H109.664a1.5,1.5,0,1,0,0,2.995Z"
                transform="translate(-98.265 -293.567)"
                fill="#575676"
              />
              <path
                id="Path_9"
                data-name="Path 9"
                d="M109.664,411.018h21.365a1.5,1.5,0,1,0,0-2.995H109.664a1.5,1.5,0,1,0,0,2.995Z"
                transform="translate(-98.265 -326.572)"
                fill="#575676"
              />
              <path
                id="Path_10"
                data-name="Path 10"
                d="M109.664,452.257h21.365a1.5,1.5,0,1,0,0-2.995H109.664a1.5,1.5,0,1,0,0,2.995Z"
                transform="translate(-98.265 -359.577)"
                fill="#575676"
              />
            </svg>
          </Link>
        </h1>
        <div className="container">
          <div className="row">
            <div id="back-btn" className="col offset-s1 offset-m1">
              <button
                onClick={onBackClick}
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
      <div className="container">
        <div className="row">
          <div className="col offset-s7 offset-m7">
            <button
              id="user-btn-upload"
              onClick={onUploadClick}
              style={{
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
      <Box>
        <Grid container justifyContent="center" alignItems="center">
          <Grid items xs={8}>
            <FullFileBrowser
              files={files}
              folderChain={folderChain}
              fileActions={fileActions}
              onFileAction={handleFileAction}
              iconComponent={ChonkyIconFA}
            >
              <FileToolbar />
              <FileList />
              <FileContextMenu />
            </FullFileBrowser>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default withTranslation("translations")(Templates);
