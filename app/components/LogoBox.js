import React from 'react';
import { Layout } from 'antd';

import logo from '../assets/images/logo.svg';

export default () => {
  return (
    <Layout.Content className="logo-gif-box">
      <img className="logo" alt="logo" src={logo} />
    </Layout.Content>
  );
};
