import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';

import Root from './pages/App';
import authStore from './stores/authStore';
import commonStore from './stores/commonStore';
import userStore from './stores/userStore';
import profileStore from './stores/profileStore';
import walletsStore from './stores/walletsStore';
import './assets/scss/antd.less';
import './assets/scss/main.scss';

const stores = {
  authStore,
  commonStore,
  userStore,
  profileStore,
  walletsStore,
};

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider {...stores}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./pages/App', () => {
    render(require('./pages/App'));
  });
}
