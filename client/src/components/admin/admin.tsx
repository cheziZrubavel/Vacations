import React, { Component } from "react";
import "./admin.css";
import { VacationModel } from "../../models/vacation-model";
import AddVacationModal from "../add_vacation_modal/add-vacation-modal";
import EditVacationModal from "../edit_vacation_modal/edit-vacation-modal";

interface AdminState {
    vacations: VacationModel[];
    showAddModal: any;
    showEditModal: any;
    currentEditableId: number;
}

export class Admin extends Component<any, AdminState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            vacations: [],
            showAddModal: false,
            showEditModal: false,
            currentEditableId: 0
        };
    };
    public componentDidMount(): void {
        fetch("http://localhost:3000/api/vacations/all-vacations")
            .then(response => response.json())
            .then(vacations => this.setState({ vacations: vacations }))
            .catch(err => alert(err.message));
    };
    public addVacation = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            showAddModal: true
        });
    };
    public showAddModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            showAddModal: !this.state.showAddModal
        });
    };
    public EditVacation = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, id: number) => {
        this.setState({
            showEditModal: true,
            currentEditableId: id
        });
    };
    public showEditModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            showEditModal: !this.state.showEditModal
        });
    };
    public addRegister = (formData: FormData) => {
        const options = {
            method: "POST",
            body: formData
        };
        fetch("http://localhost:3000/api/vacations", options)
            .then(() => alert("vacation added!"))
            .catch(err => alert(err.message));
    };
    public editRegister = (formData: FormData) => {
        const options = {
            method: "PUT",
            // headers: {
            //     "Content-Type": "application/json",
            //     "Accept": "application/json"
            // },
            // body: JSON.stringify(editedVacation)
            body: formData
        };
        fetch("http://localhost:3000/api/vacations/" + this.state.currentEditableId, options)
            .then(() => alert("The update was done!"))
            .catch(err => alert(err.message));
    };

    public deleteVacation = (id: number) => {
        const options = {
            method: "DELETE",
        };
        fetch("http://localhost:3000/api/vacations/delete-vacation/" + id, options)
            .then(() => {
                alert("Product has been deleted!");
                this.componentDidMount();
            })
            .catch(err => alert(err.message));
    };
    public reports = () => {
        this.props.history.push('/reports');
    };
    private logout = () => {
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("username");
        this.props.history.push('/login');
    };
    public render(): JSX.Element {
        return (
            <div className="admin">
                <h2>Admin Panel</h2> <hr />
                <button id="logout" onClick={this.logout}>Logout</button>
                <h2>Hello {sessionStorage.getItem('username')}</h2>
                <button className="colorBtn" onClick={(e) => { this.addVacation(e) }}>Add vacation</button> &nbsp;
                <button className="colorBtn" onClick={this.reports}>Go to Graph</button>
                <AddVacationModal onClose={this.showAddModal} showAddModal={this.state.showAddModal} onRegister={this.addRegister}>Add New Vacation</AddVacationModal>
                <div id="container-fluid">
                    {this.state.vacations.map(v =>
                        <div id="vacation" key={v.id}>
                            <img src={require("./images/trash.png")} className="trash" onClick={() => this.deleteVacation(v.id as number)} alt='' /> <br />
                            <img src={require("./images/pencil.png")} className="pencil" onClick={(e) => this.EditVacation(e, v.id as number)} alt='' /> <br />
                            <EditVacationModal onClose={this.showEditModal} showEditModal={this.state.showEditModal} onRegister={this.editRegister}>Edit Vacation</EditVacationModal>
                            {v.description} <br />
                            {v.destination} <br />
                            <img src={`http://localhost:3000/${v.image}`} alt='' width="200" /> <br />
                            {new Date(v.fromDate? v.fromDate : '').toLocaleDateString()} <br />
                            {new Date(v.toDate? v.toDate : '').toLocaleDateString()} <br />
                            {v.price} <br />
                            <span id="followersSpan">{v.followers}</span>  <br />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}