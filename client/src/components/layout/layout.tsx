import React, { Component } from "react";
import "./layout.css";
import { Admin } from "../admin/admin";
import { Login } from "../login/login";
import { Register } from "../register/register";
import { Reports } from "../reports/reports";
import { Vacations } from "../vacations/vacations";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

export class Layout extends Component {
    public render(): JSX.Element {
        return (
            <div className="layout">
                <BrowserRouter>
                    <main>
                        <Switch>
                            <Route path="/login" component={Login} exact />
                            <Route path="/register" component={Register} exact />
                            <Route path="/admin" component={Admin} exact />
                            <Route path="/vacations" component={Vacations} exact />
                            <Route path="/reports" component={Reports} exact />
                            <Redirect from="/" to="/login" exact />
                        </Switch>
                    </main>
                </BrowserRouter>
            </div>
        );
    }
}