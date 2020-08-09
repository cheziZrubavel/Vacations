import React, { Component } from "react";
import "./vacations.css";
import { VacationModel } from "../../models/vacation-model";

interface VacationsState {
    vacations?: VacationModel[];
    followersByVacation?:
    [{
        id: number,
        vacationId: number,
        usersCounter: number
    }];
}

export class Vacations extends Component<any, VacationsState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            vacations: [],
            followersByVacation:
                [{
                    id: 0,
                    vacationId: 0,
                    usersCounter: 0
                }]
        };
    };
    public componentDidMount(): void {
        fetch("http://localhost:3000/api/vacations/all-vacations")
            .then(response => response.json())
            .then(vacations => this.setState({ vacations: vacations }))
            .catch(err => alert(err.message));
        fetch("http://localhost:3000/api/vacations/amount-followers-on-vacation")
            .then(response => response.json())
            .then(followersByVacation => this.setState({ followersByVacation: followersByVacation }))
            .catch(err => alert(err.message));
    };

    public addFollowOnVacation = (vacationId: number): void => {
        let userId = sessionStorage.getItem("userId");
        let addFollowObj = { vacationId, userId };
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(addFollowObj)
        };
        fetch("http://localhost:3000/api/vacations/user-follow-on-vacation", options)
            .then(response => {
                if (response.status === 201) {
                    alert("Follow has been added.");
                }
                else if (response.status === 403) {
                    alert("You already follow on this vacation!");
                }
            })
            .catch(err => alert(err.message));
    };
    private logout = () => {
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("username");
        this.props.history.push('/login')
    }

    public render(): JSX.Element {
        return (
            <div className="vacations">
                <h2>Vacations</h2> <hr />
                <button id="logout" onClick={this.logout}>Logout</button>
                <h2>Hello {sessionStorage.getItem('username')}</h2>
                <div id="container-fluid">
                    {this.state.vacations?.map(v =>
                        <div id="vacation" key={v.id}>
                            {v.description} <br />
                            <button id="followButton"
                                onClick={() => this.addFollowOnVacation(v.id ? v.id : 0)}
                            >f</button>
                            {v.destination} <br />
                            <img src={`http://localhost:3000/${v.image}`} alt='' width="200" /> <br />
                            {new Date(v.fromDate? v.fromDate : '').toLocaleDateString()} <br />
                            {new Date(v.toDate? v.toDate : '').toLocaleDateString()} <br />
                            {v.price} <br />
                            <span id="followersSpan">
                                {this.state.followersByVacation?.filter((a) => a.id === v.id)
                                    .map(a => a.usersCounter)}
                            </span>  <br />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}