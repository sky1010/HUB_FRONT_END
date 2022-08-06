// Styling 
import "../App.css"
// Dependencies
import React, { Component } from "react";
import ReactTable from "react-table";
import axios from "axios";
import { Input } from "reactstrap";
import { getSuggestedQuery } from "@testing-library/dom";


export class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialData: [],
            originalData: [],
            filteredData: []
        };
    }

    getUsers = () => {
        axios.get("https://api.forumconcepts.fr/api/usersList")
        .then(res => {
            if(res.data){
                this.setState({
                    initialData: res.data
                })
            }
        });

        this.setState({
            originalData: this.state.initialData,
            filteredData: this.state.initialData
        });
    }

    componentDidMount() {
        this.getUsers();
        console.log(this.state.initialData)
    }

    handleSelectedClient(client) {
        console.log(client);

        let aux = JSON.parse(JSON.stringify(this.state.originalData));

        if(client !== "") {
            aux = aux.filter(row => row.client === client);
        }

        this.setState({ 
            filteredData: aux
        });
    }

    render() {
        return (
            <div className="Table">
                
                <ReactTable 
                    style={{ marginTop: "10px" }}
                    data={this.state.initialData}
                    columns={
                        [
                            {
                                Header: "Name",
                                accessor: "name"
                            },
                            {
                                Header: "Email",
                                accessor: "email"
                            },
                            {
                                Header: "Client",
                                accessor: "client"
                            },
                            {
                                Header: "Role",
                                accessor: "role"
                            },
                            {
                                Header: "Manage User",
                                accessor: "manage"
                            }
                        ]
                    }
                />
            </div>
        );
    }
}