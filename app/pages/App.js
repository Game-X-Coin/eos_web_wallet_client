import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

// import PrivateRoute from './PrivateRoute';
import Home from './Home';
import Login from './User/Login';
import Profile from './User/Profile';
import Register from './User/Register';
import ListWallet from './Wallet/ListWallet';
import Send from './Wallet/Send';
import Transactions from './Wallet/Transactions';
import CreateWallet from './Wallet/CreateWallet';
import { CustomFooter, CustomHeader } from './CustomLayout';

import Welcome from './Welcome';

@inject('userStore', 'commonStore')
@withRouter
@observer
export default class App extends React.Component {
  componentWillMount() {
    if (!this.props.commonStore.token) {
      this.props.commonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    if (this.props.commonStore.token) {
      this.props.userStore.pullUser()
        .finally(() => this.props.commonStore.setAppLoaded());
    }
  }

  render() {
    if (this.props.commonStore.appLoaded) {
      return (
        <div>
          <CustomHeader />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/send/" component={Send} />
            <Route path="/transactions" component={Transactions} />
            <Route path="/wallets/create" component={CreateWallet} />
            <Route path="/wallets" component={ListWallet} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/@:username" component={Profile} />
            <Route path="/@:username/favorites" component={Profile} />
            <Route path="/" component={Home} />
          </Switch>
          <CustomFooter />
        </div>
      );
    }
    return (
      <CustomHeader />
    );
  }
}
