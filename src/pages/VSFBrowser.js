import { ChonkyActions, FileHelper, FullFileBrowser, } from 'chonky';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import DemoFsMap from './demo.fs_map.json';
// Helper method to attach our custom TypeScript types to the imported JSON file map.
const prepareCustomFileMap = () => {
    const baseFileMap = DemoFsMap.fileMap;
    const rootFolderId = DemoFsMap.rootFolderId;
    return { baseFileMap, rootFolderId };
};
// Hook that sets up our file map and defines functions used to mutate - `deleteFiles`,
// `moveFiles`, and so on.
const useCustomFileMap = () => {
    const { baseFileMap, rootFolderId } = useMemo(prepareCustomFileMap, []);
    // Setup the React state for our file map and the current folder.
    const [fileMap, setFileMap] = useState(baseFileMap);
    const [currentFolderId, setCurrentFolderId] = useState(rootFolderId);
    // Setup the function used to reset our file map to its initial value. Note that
    // here and below we will always use `useCallback` hook for our functions - this is
    // a crucial React performance optimization, read more about it here:
    // https://reactjs.org/docs/hooks-reference.html#usecallback
    const resetFileMap = useCallback(() => {
        setFileMap(baseFileMap);
        setCurrentFolderId(rootFolderId);
    }, [baseFileMap, rootFolderId]);
    // Setup logic to listen to changes in current folder ID without having to update
    // `useCallback` hooks. Read more about it here:
    // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
    const currentFolderIdRef = useRef(currentFolderId);
    useEffect(() => {
        currentFolderIdRef.current = currentFolderId;
    }, [currentFolderId]);
    // Function that will be called when user deletes files either using the toolbar
    // button or `Delete` key.
    
    // Function that will be called when files are moved from one folder to another
    // using drag & drop.
    const moveFiles = useCallback((files, source, destination) => {
        setFileMap((currentFileMap) => {
            const newFileMap = Object.assign({}, currentFileMap);
            const moveFileIds = new Set(files.map((f) => f.id));
            // Delete files from their source folder.
            const newSourceChildrenIds = source.childrenIds.filter((id) => !moveFileIds.has(id));
            newFileMap[source.id] = Object.assign(Object.assign({}, source), { childrenIds: newSourceChildrenIds, childrenCount: newSourceChildrenIds.length });
            // Add the files to their destination folder.
            const newDestinationChildrenIds = [
                ...destination.childrenIds,
                ...files.map((f) => f.id),
            ];
            newFileMap[destination.id] = Object.assign(Object.assign({}, destination), { childrenIds: newDestinationChildrenIds, childrenCount: newDestinationChildrenIds.length });
            // Finally, update the parent folder ID on the files from source folder
            // ID to the destination folder ID.
            files.forEach((file) => {
                newFileMap[file.id] = Object.assign(Object.assign({}, file), { parentId: destination.id });
            });
            return newFileMap;
        });
    }, []);
    // Function that will be called when user creates a new folder using the toolbar
    // button. That that we use incremental integer IDs for new folder, but this is
    // not a good practice in production! Instead, you should use something like UUIDs
    // or MD5 hashes for file paths.
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
            newFileMap[currentFolderIdRef.current] = Object.assign(Object.assign({}, parent), { childrenIds: [...parent.childrenIds, newFolderId] });
            console.log(newFileMap)
            return newFileMap;
        });
    }, []);
    return {
        fileMap,
        currentFolderId,
        setCurrentFolderId,
        resetFileMap,
        moveFiles,
        createFolder,
    };
};
export const useFiles = (fileMap, currentFolderId) => {
    return useMemo(() => {
        const currentFolder = fileMap[currentFolderId];
        const childrenIds = currentFolder.childrenIds;
        const files = childrenIds.map((fileId) => fileMap[fileId]);
        return files;
    }, [currentFolderId, fileMap]);
};
export const useFolderChain = (fileMap, currentFolderId) => {
    return useMemo(() => {
        const currentFolder = fileMap[currentFolderId];
        const folderChain = [currentFolder];
        let parentId = currentFolder.parentId;
        while (parentId) {
            const parentFile = fileMap[parentId];
            if (parentFile) {
                folderChain.unshift(parentFile);
                parentId = parentFile.parentId;
            }
            else {
                break;
            }
        }
        return folderChain;
    }, [currentFolderId, fileMap]);
};
export const useFileActionHandler = (setCurrentFolderId, moveFiles, createFolder) => {
    return useCallback((data) => {
        if (data.id === ChonkyActions.OpenFiles.id) {
            const { targetFile, files } = data.payload;
            const fileToOpen = targetFile !== null && targetFile !== void 0 ? targetFile : files[0];
            if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
                setCurrentFolderId(fileToOpen.id);
                return;
            }
        }
        else if (data.id === ChonkyActions.MoveFiles.id) {
            moveFiles(data.payload.files, data.payload.source, data.payload.destination);
        }
        else if (data.id === ChonkyActions.CreateFolder.id) {
            const folderName = prompt('Provide the name for your new folder:');
            if (folderName)
                createFolder(folderName);
        }
    }, [createFolder, moveFiles, setCurrentFolderId]);
};
export const VFSBrowser = React.memo((props) => {
    const { fileMap, currentFolderId, setCurrentFolderId, resetFileMap, moveFiles, createFolder, } = useCustomFileMap();
    const files = useFiles(fileMap, currentFolderId);
    const folderChain = useFolderChain(fileMap, currentFolderId);
    const handleFileAction = useFileActionHandler(setCurrentFolderId,  moveFiles, createFolder);
    const fileActions = useMemo(() => [ChonkyActions.CreateFolder], []);
    const thumbnailGenerator = useCallback((file) => file.thumbnailUrl ? `https://chonky.io${file.thumbnailUrl}` : null, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { size: "small", color: "primary", variant: "contained", onClick: resetFileMap, style: { marginBottom: 15 } }, "Reset file map"),
        React.createElement("div", { style: { height: 400 } },
        React.createElement(FullFileBrowser, Object.assign({ files: files, folderChain: folderChain, fileActions: fileActions, onFileAction: handleFileAction, thumbnailGenerator: thumbnailGenerator,  iconComponent: ChonkyIconFA }, props)))));
});