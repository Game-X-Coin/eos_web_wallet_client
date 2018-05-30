import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

// @inject('userStore', 'commonStore')
// @observer
// export default class PrivateRoute extends React.Component {
//   render() {
//     const { userStore, ...restProps } = this.props;
//     if (userStore.currentUser) return <Route {...restProps} />;
//     return <Redirect to={{
//             pathname: "/login",
//             state: { from: props.location }
//           }} />;
//   }
// }


@inject('userStore', 'commonStore')
@observer
class PrivateRoute extends React.Component {
  render() {
    const { userStore, location, ...restProps } = this.props;
    if (userStore.currentUser) return <Route {...restProps} />;
    return (<Redirect
      to={{
      pathname: '/register',
      state: { from: location },
    }}
      {...restProps}
    />);
  }
}

export default PrivateRoute;
