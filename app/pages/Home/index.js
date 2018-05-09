import React from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Divider, Button, Modal } from 'antd';
import LogoBox from '../../components/LogoBox';
import agent from '../../agent';

const { Content } = Layout;

@inject('userStore', 'commonStore')
@withRouter
@observer
class Home extends React.Component {
  @observable showFaucetModal = false;
  @observable transactionId = null;
  @observable faucetQuantity = 0.0;
  componentDidMount() {
    // if(this.props.userStore.currentUser) {
    //     this.props.history.replace('/wallet/list');
    // }
  }

  async requestFaucet() {
    try {
      const { transaction: { quantity, transactionId }} = await agent.EOS.requestFaucet();
      this.showFaucetModal = true;
      this.faucetQuantity = quantity;
      this.transactionId = transactionId;
      this.props.userStore.pullUser();
    } catch (e) {
      console.error(e)
    }
  }
  gotoNewTransaction () {
    this.props.history.replace('/tx/new');
  }

  gotoWallets () {
    this.props.history.replace('/wallets');
  }

  render() {
    const { currentUser } = this.props.userStore;
    return (
      <Layout className="default-top-layout" id="home">
        <Modal
          title="Request Faucet successful."
          visible={this.showFaucetModal}
          onOk={() => this.showFaucetModal = false}
          onCancel={() => this.showFaucetModal = false}
        >
          <h4>Request faucet has been successfully requested.</h4>
          <h4>requested quantity: {this.faucetQuantity} <br/>transaction id: <Link to={`/tx/${this.transactionId}`}>{this.transactionId}</Link></h4>
        </Modal>
        <h1 style={{ textAlign: 'center' }}> My EOS Wallet </h1>
        <LogoBox />
        {currentUser ?
          <Content className="links">
            <h2>Welcome<br /><Link to="/@currentUser.account">{currentUser.account}</Link></h2>
            <div>balance: {currentUser.balance} </div>
            <Link to="/wallets">goto Wallet Management</Link>
            <br />
            <br />

            <Button onClick={::this.requestFaucet}>Request EOS Faucet</Button>
            <Button onClick={::this.gotoNewTransaction}>Make transaction</Button>
            <Button onClick={::this.gotoWallets}>Wallet management</Button>
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
