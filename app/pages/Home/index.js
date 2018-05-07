import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Divider } from 'antd';
import LogoBox from '../../components/LogoBox';

const { Content } = Layout;

@inject('userStore', 'commonStore')
@withRouter
@observer
class Home extends React.Component {
  componentDidMount() {
    // if(this.props.userStore.currentUser) {
    //     this.props.history.replace('/wallet/list');
    // }
  }

  render() {
    const { currentUser } = this.props.userStore;
    return (
      <Layout className="default-top-layout" id="home">
        <h1 style={{ textAlign: 'center' }}> My EOS Wallet </h1>
        <LogoBox />
        {currentUser ?
          <Content className="links">
            <h2>Welcome<br /><Link to="/@currentUser.account">{currentUser.account}</Link></h2>
            <div>balance: {currentUser.balance} </div>
            <Link to="/wallets">goto Wallet Management</Link>
          </Content>
          :
          <Content className="links">
            <Link to="/register">Register</Link>
            <Divider type="vertical" className="divider" />
            <Link to="/login">Login</Link>
          </Content>
        }

        <Content className="how-it-works">
          <h2>How it Works</h2>
        </Content>
      </Layout>);
  }
}

export default Home;
