import React, { Component } from "react";
import "./login.css";
import { NavLink } from "react-router-dom";

interface LoginState {
    username?: string,
    password?: string
}

export class Login extends Component<any, LoginState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    };

    private setUsername = (args: React.ChangeEvent<HTMLInputElement>) => {
        const username = args.target.value;
        this.setState({ username: username })
    };
    private setPassword = (args: React.ChangeEvent<HTMLInputElement>) => {
        const password = args.target.value;
        this.setState({ password: password })
    };
    private sendDetails = () => {
        if (this.state.username === '' || this.state.password === '')
            alert("username and password is mandatory");
        else {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(this.state)
            };
            fetch("http://localhost:3000/api/auth/login", options)
                .then(response => {
                    if (response.status === 200) {
                        response.json().then(user => {
                            sessionStorage.setItem("userId", user[0].id || '');
                            sessionStorage.setItem("username", this.state.username || '');
                            (user[0].isAdmin > 0) ? this.props.history.push('/admin') : this.props.history.push('/vacations');
                        })
                    }
                    else if (response.status === 403) {
                        alert("Incorrect username or password");
                        this.setState({
                            username: '',
                            password: ''
                        })
                    }
                })
                .catch((err) => alert(err.message));
        };
    };
    public render(): JSX.Element {
        return (
            <div className="login">
                <h2>Login</h2>
                <form >
                    <br />
                    <div>
                        <label>username:</label>
                        <input type="text" value={this.state.username} onChange={this.setUsername} required /> <br /><br />
                        <label> password:</label>
                        <input type="text" value={this.state.password} onChange={this.setPassword} required />
                    </div>
                    <br />
                    <button type="button" className="loginBtn" onClick={this.sendDetails}>Login</button>
                    <br />
                    <br />
                    <div>
                        <NavLink to="/register" > New user? register </NavLink>
                    </div>
                </form>
            </div>
        );
    }
}
