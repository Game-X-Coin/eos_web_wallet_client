import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

// import PrivateRoute from './PrivateRoute';
import Home from './Home';
import Login from './User/Login';
import Authorize from './User/Authroize';
import Profile from './User/Profile';
import Register from './User/Register';
import ListBalance from './Balance/ListBalance';
import ListWallet from './Wallet/ListWallet';
import CreateWallet from './Wallet/CreateWallet';
import { CustomFooter, CustomMain, CustomHeader } from './CustomLayout';

import Welcome from './Welcome';
import Transaction from './Blockchain/Transaction';
import NewTransaction from './Blockchain/NewTransaction';
import PrivateRoute from './PrivateRoute';

import LoadingSpinner from '../components/LoadingSpinner';

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

    const { location, commonStore } = this.props;

    const isPopupWindow = window.opener && window.opener !== window;

    const AuthorizeRoute = () => (
      <div>
        <Route path="/authorize" component={Authorize} />
      </div>
    );

    const Routes = () => (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/balances" component={ListBalance} />
        <Route path="/wallets/create" component={CreateWallet} />
        <Route path="/wallets" component={ListWallet} />
        <Route path="/authorize" component={Authorize} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/@:username" component={Profile} />
        <Route path="/tx/new" component={NewTransaction} />
        <Route path="/tx/:transactionId" component={Transaction} />
        <Route path="/" component={Home} />
      </Switch>
    );

    if (commonStore.appLoaded) {
      return (
        <div>
          {!isPopupWindow
            ? (
              <React.Fragment>
                <CustomHeader />
                <CustomMain>
                  <Routes />
                </CustomMain>
                <CustomFooter />
              </React.Fragment>
            )
            : <Routes />
          }
        </div>
      );
    }
    return (
      <div>
        {!isPopupWindow && <CustomHeader />}
        <LoadingSpinner />
      </div>
    );
  }
}
