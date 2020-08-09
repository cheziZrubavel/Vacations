import React, { Component } from "react";
import "./register.css";

interface RegisterState {
    firstName?: string,
    lastName?: string,
    username?: string,
    password?: number
}

export class Register extends Component<any, RegisterState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            password: 0
        };
    };
    private setFirstName = (args: React.ChangeEvent<HTMLInputElement>) => {
        const firstName = args.target.value;
        this.setState({ firstName: firstName })
    };
    private setLastName = (args: React.ChangeEvent<HTMLInputElement>) => {
        const lastName = args.target.value;
        this.setState({ lastName: lastName })
    };
    private setUsername = (args: React.ChangeEvent<HTMLInputElement>) => {
        const username = args.target.value;
        this.setState({ username: username })
    };
    private setPassword = (args: React.ChangeEvent<HTMLInputElement>) => {
        const password = +args.target.value;
        this.setState({ password: password })
    };
    private sendDetails = () => {
        if (this.state.firstName === '' ||
            this.state.lastName === '' ||
            this.state.username === '' ||
            this.state.password === 0)
            alert("all the fields is mandatory");
        else {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(this.state)
            };
            fetch("http://localhost:3000/api/auth/register", options)
                .then((response) => {
                    if (response.status === 403) {
                        alert("user already exist!");
                    }
                    if (response.status === 201) {
                        alert("the registration has been done successfully!");
                    };
                    this.props.history.push('/login');
                })
                .catch((err) => alert(err.message));
        };
    };
    public render(): JSX.Element {
        return (
            <div className="register">
                <h2>Registration</h2>

                <div id="container">
                    <label>First Name:</label>
                    <input type="text" required onChange={this.setFirstName} /> <br /><br />
                    <label>Last Name:</label>
                    <input type="text" required onChange={this.setLastName} /> <br /><br />
                    <label>User Name:</label>
                    <input type="text" required onChange={this.setUsername} /> <br /><br />
                    <label>Password:</label>
                    <input type="number" required onChange={this.setPassword} /> <br /><br />
                </div>

                <button type="button" onClick={this.sendDetails}>Register</button>

                <br />
            </div>
        );
    }
}