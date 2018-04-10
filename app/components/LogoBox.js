import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;
export default class LogoBox extends React.Component {
  render() {
    return (
      <Content className="logo-gif-box">
        <img className="logo" alt="logo" src={require('./../assets/images/eos-gif.gif')} />
      </Content>);
  }
}
