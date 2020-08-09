import React, { Component } from "react";
import "./reports.css";
// import * as V from 'victory';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

interface ReportsState {
    followersByVacation?:
    [{
        id: number,
        vacationId: number,
        usersCounter: number
    }],
    style: {
        data: { fill: string }
    }
}

export class Reports extends Component<any, ReportsState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            followersByVacation:
                [{
                    id: 0,
                    vacationId: 0,
                    usersCounter: 0
                }],
            style: {
                data: { fill: "lightpink" }
            }
        };
    };
    public componentDidMount(): void {
        fetch("http://localhost:3000/api/vacations/amount-followers-on-vacation")
            .then(response => response.json())
            .then(followersByVacation => this.setState({ followersByVacation: followersByVacation }))
            .catch(err => alert(err.message));
    };

    private logout = () => {
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("username");
        this.props.history.push('/login');
    };

    public render(): JSX.Element {
        return (
            <div className="reports">
                <h2>Reports</h2> <hr />
                <button className="logoutBtn" onClick={this.logout}>Logout</button>
                <div className="graphDiv">
                <VictoryChart height={200} width={500}
                    theme={VictoryTheme.material}
                    domainPadding={{ x: 10, y: [0, 20] }}
                >
                    <VictoryAxis
                        tickValues={this.state.followersByVacation?.map(fbv => fbv.vacationId)}
                        tickFormat={this.state.followersByVacation?.map(fbv => fbv.vacationId)}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(x) => (`${x / 1}`)}
                    />
                    <VictoryBar
                        style={this.state.style}
                        data={this.state.followersByVacation}
                        x="vacationId"
                        y="usersCounter"
                    />
                </VictoryChart>
                </div>
            </div>
        );
    }
}