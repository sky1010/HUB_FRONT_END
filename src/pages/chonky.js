import { FileArray, FileHelper, FullFileBrowser, FileList, FileContextMenu, FileToolbar, FileActionHandler, ChonkyActions } from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import React, { Component, useCallback, useEffect, useMemo, useRef, useState } from "react";

function Chonky(props) {
    
    const prepareCustomFileMap = () => {
        const baseFileMap = props.fileData?.fileMap;
        const rootFolderId = props.fileData?.rootFolderId;
        return {baseFileMap, rootFolderId};
    }

    const useCustomFileMap = () => {
        const {baseFileMap, rootFolderId} = prepareCustomFileMap();
        const [fileMap, setFileMap] = useState(baseFileMap);
        const [currentFolderId, setCurrentFolderId] = useState(rootFolderId);

        return {
            fileMap,
            currentFolderId,
        }
    }

    console.log(useCustomFileMap())
    return(
        <p>{props.fileData?.fileMap["1"]["name"]}</p>
    )
}

export default (Chonky);