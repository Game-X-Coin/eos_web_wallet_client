import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Layout, Menu, Select } from 'antd';

const Option = Select.Option;
const { Header, Footer } = Layout;
const LoggedOutView = (props) => {
  if (!props.currentUser) {
    return (
      <ul className="nav right-menus">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Sign in
          </Link>
        </li>
      </ul>
    );
  }
  return null;
};

const LoggedInView = (props) => {
  if (props.currentUser) {
    return (
      <ul className="nav right-menus">


        <li className="nav-item">
          <Link
            to={`/@${props.currentUser.account}`}
            className="nav-link"
          >
            <img src={props.currentUser.image} className="user-pic" alt="" />
            Welcome {props.currentUser.account}
          </Link>
        </li>
      </ul>
    );
  }

  return null;
};

@inject('userStore', 'commonStore')
@observer
class CustomHeader extends React.Component {
  handleChangeServer = () => {

  };

  render() {
    return (
      <Header className="header">
        <div className="logo"><Link to="/"><img src={require('./../assets/images/eos-logo.png')} /></Link>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <div className="right-menu">
            <LoggedOutView currentUser={this.props.userStore.currentUser} />
            <LoggedInView currentUser={this.props.userStore.currentUser} />
            <Select
              className="select-server"
              defaultValue="gxc"
              style={{ width: 120 }}
              onChange={this.handleChangeServer}
            >
              <Option value="gxc">GXC Testnet</Option>
              <Option value="public">Public Testnet</Option>
            </Select>
          </div>
        </Menu>
      </Header>
    );
  }
}

class CustomFooter extends React.Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        EOS Web Wallet ©2018 Created by GXC x Decipher
      </Footer>
    );
  }
}

export {
  CustomHeader,
  CustomFooter,
};

