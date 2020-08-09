import React from "react";
import "./edit-vacation-modal.css";

interface EditVacationModalState {
    EditVacationObj: {
        description: string;
        destination: string;
        image: File;
        fromDate: Date;
        toDate: Date;
        price: number;
    };
    showEditModal: any;
}

export default class EditVacationModal extends React.Component<any, EditVacationModalState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            EditVacationObj: {
                description: '',
                destination: '',
                image: new File([], ''),
                fromDate: new Date(),
                toDate: new Date(),
                price: 0,
            },
            showEditModal: false
        };
    };

    public onClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onClose && this.props.onClose(e);
    };
    public setDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        const description = e.target.value;
        const EditVacationObject = { ...this.state.EditVacationObj };
        EditVacationObject.description = description;
        this.setState({ EditVacationObj: EditVacationObject });
    };
    public setDestination = (e: React.ChangeEvent<HTMLInputElement>) => {
        const destination = e.target.value;
        const EditVacationObject = { ...this.state.EditVacationObj };
        EditVacationObject.destination = destination;
        this.setState({ EditVacationObj: EditVacationObject });
    };
    public setImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const image = e.target.files[0];
            const EditVacationObject = { ...this.state.EditVacationObj };
            EditVacationObject.image = image;
            this.setState({ EditVacationObj: EditVacationObject });
        };
    };
    public setFromDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fromDate = new Date(e.target.value);
        const EditVacationObject = { ...this.state.EditVacationObj };
        EditVacationObject.fromDate = fromDate;
        this.setState({ EditVacationObj: EditVacationObject });
    };
    public setToDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const toDate = new Date(e.target.value);
        const EditVacationObject = { ...this.state.EditVacationObj };
        EditVacationObject.toDate = toDate;
        this.setState({ EditVacationObj: EditVacationObject });
    };
    public setPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const price = +e.target.value;
        const EditVacationObject = { ...this.state.EditVacationObj };
        EditVacationObject.price = price;
        this.setState({ EditVacationObj: EditVacationObject });
    };
    public save = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let target = event.target;
        const formData = new FormData(target as HTMLFormElement);
        this.props.onRegister(formData);
    };
    render() {
        if (!this.props.showEditModal) {
            return null;
        }
        return (
            <div className="modal">
                <div>{this.props.children}</div>
                <form onSubmit={this.save} encType="multipart/form-data" >
                    <div className="content">
                    Description: <input type="text" name="description" onChange={this.setDescription} /> <br />
                    Destination: <input type="text" name="destination" onChange={this.setDestination} /> <br />
                    Image: <input type="file" name="uploadImage" accept="image/*" onChange={this.setImage} /> <br />
                    From date: <input type="date" name="fromDate" onChange={this.setFromDate} /> <br />
                    To date: <input type="date" name="toDate" onChange={this.setToDate} /> <br />
                    Price: <input type="text" name="price" onChange={this.setPrice} /> <br />
                    </div>
                    <div className="actions">
                        <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => { this.onClose(e); }}>Close</button> &nbsp;
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        );

    }
}