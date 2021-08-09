import { observer, Provider } from "mobx-react";
import Dashboard from "../../components/dashboard/Dashboard";
import DashboardStore from "../../components/dashboard/DashboardStore";
import React from 'react';

class DashboardPage extends React.Component {
    state = {
        Store: new DashboardStore(),
    }

    render() {
        return (
            <Provider store={this.state.Store}>
                <Dashboard />
            </Provider>
        );
    }
}

export default observer(DashboardPage);