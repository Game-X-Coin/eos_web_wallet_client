import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';
import { Badge, Button, Col, Icon, Input, Layout, Modal, Row } from 'antd';
import { action, observable } from 'mobx';
import agent from '../../agent';

const { Content } = Layout;

@inject('commonStore', 'walletsStore')
@withRouter
@observer
class ListWallet extends React.Component {
  componentDidMount() {
    this.props.walletsStore.loadWallets();
  }
  @observable createWalletModalShown = false;
  @observable walletName = null;
  @observable walletPassword = null;

  @action showCreateWalletModal() {
    this.createWalletModalShown = true;
  }

  async createWalletAct() {
    const result = await agent.Wallets.createWallet(this.walletName);
    console.log(result);
    this.walletPassword = result.password;
    this.props.walletsStore.loadWallets();

    // this.hideCreateWalletModal();
  }

  @action hideCreateWalletModal() {
    this.walletPassword = null;
    this.createWalletModalShown = false;
  }

  render() {
    const { wallets, isLoading } = this.props.walletsStore;
    return (
      <Layout className="default-top-layout">
        <Modal
          title="Basic Modal"
          visible={this.createWalletModalShown}
          onOk={::this.createWalletAct}
          onCancel={::this.hideCreateWalletModal}
        >
          <Input
            placeholder="wallet name"
            onChange={(e) => { this.walletName = e.target.value; }}
          />
          { this.walletPassword && <div>
            <h3>EOS Wallet has created!</h3>
            <h3>{ `password: ${this.walletPassword}` }</h3>
            <h4>** password are only showed once.</h4>
          </div> }
        </Modal>
        <Content>
          <h2>wallets: </h2>
          <Row
            gutter={16}
          >

            {wallets.map((wallet) => {
              return (
                <Col
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  xxl={6}
                  key={wallet.id}
                  style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-around',
                            }}
                >
                  <p style={{ textAlign: 'center' }}><Badge
                    status="processing"
                  />{wallet.walletName}
                  </p>
                  <Badge
                    count={`balance: ${wallet.balance}`}
                    style={{ backgroundColor: '#52c41a' }}
                  />
                  <Link
                    to={`/send/${wallet.title}`}
                    style={{ textAlign: 'center' }}
                  ><Icon
                    type="retweet"
                  /> transaction
                  </Link>
                </Col>);
            })}
          </Row>
          <Button onClick={this.showCreateWalletModal.bind(this)}>Create
            Wallet
          </Button>
        </Content>
      </Layout>);
  }
}

export default ListWallet;
