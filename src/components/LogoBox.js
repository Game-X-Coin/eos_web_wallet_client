import React from 'react';
import {Layout} from 'antd';
const {Content} = Layout;
export default class LogoBox extends React.Component {
  render () {
    return <Content className="logo-gif-box">
      <img className="logo" src={'/eos_gif.gif'}/>
    </Content>
  }
}
