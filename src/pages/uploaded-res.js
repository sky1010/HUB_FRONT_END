// Styling
import "../App.css";
// Dependencies
import axios from "axios";
import $ from "jquery";
import React, { Component, useEffect, useState } from "react";
import MaterialTable from "material-table";
import wallpaper from "../assets/BACKGROUNDS/3.svg";
import { withTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";
function Resources(props) {
  const [resources, setResources] = useState();

  useEffect(() => {
    getFiles();
  }, []);

  function getFiles() {
    axios.get("/api/files/getResources").then((res) => {
      setResources(res.data);
    });
  }

  function deleteResources(doc_id, resolve) {
    axios
      .get("/api/files/deleteResource/" + doc_id)
      .then((res) => {
        console.log(res.data);
        resolve();
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  //Call to action methods
  function onBackClick() {
    props.history.push("/admin");
  }

  const { t, i18n } = props;
  console.log(resources);
  const myStyle = {
    backgroundImage: `url(${wallpaper})`,
    height: "100vh",
    marginTop: "0px",
    fontSize: "50px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div
      className="Resources"
      style={{
        backgroundImage: `url(${wallpaper})`,
        height: "100vh",
        marginTop: "0px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <header>
        <Link to="/admin">
          <h1 id="title-pages">
            <Trans>{t("availResBtn")}</Trans>
          </h1>
        </Link>
      </header>
      <div className="container-table">
        <div className="container-table-item">
          <MaterialTable
            title={<Trans>{t("availResBtn")}</Trans>}
            actions={[
              {
                icon: "refresh",
                tooltip: "Refresh Data",
                isFreeAction: true,
                onClick: () => window.location.reload(),
              },
            ]}
            columns={[
              { title: <Trans>{t("name")}</Trans>, field: "file_name" },
              { title: <Trans>{t("category")}</Trans>, field: "category" },
              { title: <Trans>{t("client")}</Trans>, field: "Client.name" },
              // {title: 'file', field:'file'}
            ]}
            data={resources}
            editable={{
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  /// function to delete
                  deleteResources(oldData.id, resolve);
                }),
            }}
            detailPanel={[
              {
                tooltip: <Trans>{t("viewDoc")}</Trans>,
                render: (rowData) => {
                  return (
                    <iframe
                      width="100%"
                      height="600px"
                      src={"/Resources/" + rowData.file_name}
                      frameborder="0"
                      allowfullscreen
                    />
                  );
                },
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default withTranslation("translations")(Resources);
