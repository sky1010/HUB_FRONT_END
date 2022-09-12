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
} from "chonky";
import { ChonkyIconFA } from "chonky-icon-fontawesome";

function Templates(props) {
  const [decoded, setDecoded] = useState(null);
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState();
  const [resources, setResources] = useState();
  const [userUploads, setUserUploads] = useState();
  const [testfileMap, setTestFileMap] = useState();
  const [testRootFolderId, setTestRootFolderId] = useState();
  const [tester, setTester] = useState();
  const [data, setData] = useState();
  const [render, setRender] = useState(false);
  //const [fichiers, setFichiers] = useState();
  //Sets token to get current user data
  useEffect(() => {
    setToken(getToken());
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/Resources/filemaptest.json`)
      .then((res) => {
        //console.log(res.data["fileMap"])
        setTester(res.data);
        const obj = JSON.stringify(res.data);
        const parsed = JSON.parse(obj);
        //console.log(parsed);
        //console.log(parsed.fileMap["1"])
      });
    setTimeout(() => {
      setRender(true);
    }, 3000);
  }, [token]);

  //Decode token from Local Storage
  function getToken() {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      setAuthToken(token);
      const decodedId = jwt_decode(token);
      //getMap();
      setDecoded(decodedId.id);
      getLoggedInUser(decoded);
      testData(decoded);
    }
  }

  //console.log(tester["rootFolderId"])
  //GET client's filemap
  function getMap() {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/Resources/filemaptest.json`)
      .then((res) => {
        //console.log(res.data["fileMap"])
        const obj = JSON.stringify(res.data);
        const parsed = JSON.parse(obj);
        //console.log(parsed);
        //console.log(parsed.fileMap["1"])
        setTester(parsed.rootFolderId);
        setTestFileMap(parsed.fileMap);
      });
  }

  const testData = async (id) => {
    try {
      const response = await axios.get("/api/users/getUser/" + id);
      console.log(response);
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  //console.log(data)

  //Gets current user client to fetch files
  function getLoggedInUser(id) {
    if (id) {
      axios
        .get("/api/users/getUser/" + id)
        .then((res) => {
          setCurrentUser(res.data);
          getFiles(res.data.client);
          getUserUploads(res.data.client);
        })
        .catch((err) => console.log(err));
    }
  }
  function getUserUploads(client) {
    if (client) {
      let category = "Templates";
      axios
        .get("/api/uploads/getUserUploads/" + client + "/" + category)
        .then((res) => {
          setUserUploads(res.data);
        })
        .catch((err) => console.log(err));
    }
  }

  //Requests files on current client
  function getFiles(client) {
    if (client) {
      let category = "Templates";
      axios
        .get("/api/files/getResources/" + client + "/" + category)
        .then((res) => {
          //console.log(res.data)
          setResources(res.data);
        })
        .catch((err) => console.log(err));
    }
  }
  const filesForMap: FileArray = [];
  if (resources) {
    filesForMap.push(
      ...resources.map((item): FileData => ({
        id: item.id.toString(),
        name: item.file_name,
        location: item.file_location,
        parentId: "1",
      }))
    );
  }
  if (userUploads) {
    filesForMap.push(
      ...userUploads.map((item): FileData => ({
        id: item.id.toString(),
        name: item.file_name,
        location: item.file_location,
        parentId: "1",
      }))
    );
  }

  //Constructs File Array for FE
  //console.log(filesForMap);

  //console.log(filesForMap[0]);
  //console.log(currentUser);
  //console.log(resources);
  const file0 = filesForMap[0];
  //filesForMap.forEach(file =>console.log(file.name));
  const fileJSON = JSON.stringify(file0);
  const copyfile = [];
  //console.log(file0)
  //console.log(fileJSON)
  for (let i = 0; i < filesForMap.length; i++) {
    copyfile.push(filesForMap[i]);
  }
  //console.log(copyfile)
  //console.log(testMap)

  //console.log(testMapJson)
  const f = {
    id: "8",
    name: "512 Digital - UX Services Proposal.pdf",
    location: "Resources/512 Digital - UX Services Proposal.pdf",
    parentId: "1",
  };

  const map = {
    rootFolderId: "1",
    fileMap: {
      1: {
        id: "1",
        name: "Fichier Import",
        isDir: true,
        childrenIds: ["8", "2"],
      },
      2: {
        id: "2",
        name: "Finance",
        isDir: true,
        childrenIds: [],
        parentId: "1",
      },
      8: f,
    },
  };

  const map2 = {
    rootFolderId: tester,
    filemap: testfileMap,
  };
  //console.log(map2)

  //setTimeout(() => {  console.log(tester.fileMap) }, 3000);
  //console.log(currentUser)
  //console.log(tester);
  console.log(tester?.fileMap);
  //console.log(tester ? tester.fileMap: null)
  const prepareCustomFileMap = () => {
    const baseFileMap = tester ? tester.fileMap : map.fileMap;
    const rootFolderId = tester ? tester.rootFolderId : map.rootFolderId;
    return { baseFileMap, rootFolderId };
  };

  //Custom File Map for Mutable File explorer
  const useCustomFileMap = () => {
    const { baseFileMap, rootFolderId } = useMemo(prepareCustomFileMap, []);
    const [fileMap, setFileMap] = useState(baseFileMap);
    const [currentFolderId, setCurrentFolderId] = useState(rootFolderId);

    const currentFolderIdRef = useRef(currentFolderId);
    useEffect(() => {
      currentFolderIdRef.current = currentFolderId;
    }, [currentFolderId]);

    const moveFiles = useCallback((files, source, destination) => {
      setFileMap((currentFileMap) => {
        const newFileMap = Object.assign({}, currentFileMap);
        //console.log(newFileMap);
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
        // axios.post
        const client = currentUser?.Client?.name;
        const name = "filemap_" + client;
        const data = { [name]: newFileMap };
        var config = { headers: { "Content-Type": undefined } };
        axios
          .post(`${process.env.REACT_APP_API_BASE_URL}/filemap`, data, config)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
        //console.log(newFileMap)
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
        const client = currentUser?.Client?.name;
        const name = "filemap_" + client;
        const data = { [name]: newFileMap };
        console.log(data);
        var config = { headers: { "Content-Type": undefined } };
        axios
          .post(`${process.env.REACT_APP_API_BASE_URL}/filemap`, data, config)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
        //axios.post
        return newFileMap;
      });
    }, []);
    return {
      fileMap,
      currentFolderId,
      setCurrentFolderId,
      moveFiles,
      createFolder,
    };
  };

  //Defines files
  const useFiles = (fileMap, currentFolderId) => {
    return useMemo(() => {
      const currentFolder = fileMap[currentFolderId];
      const childrenIds = currentFolder.childrenIds;
      const files = childrenIds.map((fileId) => fileMap[fileId]);
      console.log(files);
      return files;
    }, [currentFolderId, fileMap]);
  };
  //Defines Folder chain
  const useFolderChain = (fileMap, currentFolderId) => {
    return useMemo(() => {
      const currentFolder = fileMap[currentFolderId];
      const folderChain = [currentFolder];
      let parentId = currentFolder.parentId;
      while (parentId) {
        const parentFile = fileMap[parentId];
        if (parentFile) {
          folderChain.unshift(parentFile);
          parentId = parentFile.parentId;
        } else {
          break;
        }
      }
      return folderChain;
    }, [currentFolderId, fileMap]);
  };

  //Call to actions for file explorer component
  const useFileActionHandler = (
    setCurrentFolderId,
    moveFiles,
    createFolder
  ) => {
    return useCallback(
      (data) => {
        if (data.id === ChonkyActions.OpenFiles.id) {
          const { targetFile, files } = data.payload;
          const fileToOpen =
            targetFile !== null && targetFile !== void 0
              ? targetFile
              : files[0];
          if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
            setCurrentFolderId(fileToOpen.id);
            return;
          } else {
            const file = data.payload.targetFile.location;
            //console.log(data.payload.targetFile.location);
            window.open("/" + file, "_blank").focus();
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

  //Data init for file explorer component

  //Call to action methods
  function onBackClick() {
    props.history.push("/dashboard");
  }
  function onUploadClick() {
    props.history.push("/user/TemplatesUpload");
  }

  const {
    fileMap,
    currentFolderId,
    setCurrentFolderId,
    moveFiles,
    createFolder,
  } = useCustomFileMap();
  const files = useFiles(fileMap, currentFolderId);
  const folderChain = useFolderChain(fileMap, currentFolderId);
  const handleFileAction = useFileActionHandler(
    setCurrentFolderId,
    moveFiles,
    createFolder
  );
  const fileActions = useMemo(() => [ChonkyActions.CreateFolder], []);

  function DelayedMFB() {
    return (
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
    );
  }

  //Localisation feature
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
      {<p>{tester?.fileMap[1]?.name}</p>}
      {currentUser ? <h4>Welcome, {currentUser.Client.name}</h4> : null}
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
            {render === true && DelayedMFB()}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default withTranslation("translations")(Templates);
