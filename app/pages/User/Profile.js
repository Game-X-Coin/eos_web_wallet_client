import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Badge, Button, Col, Icon, Layout, Row } from 'antd';

import LoadingSpinner from './../LoadingSpinner';
import RedError from './../RedError';
import LogoBox from '../../components/LogoBox';


@inject('authStore', 'userStore', 'walletsStore')
@withRouter
@observer
export default class Profile extends React.Component {
  componentDidMount() {
    this.props.walletsStore.loadWallets();
  }

  handleClickLogout = () =>
    this.props.authStore.logout().then(() => this.props.history.replace('/'));

  render() {
    const { userStore } = this.props;
    const { currentUser } = userStore;
    const { wallets } = this.props.walletsStore;

    if (!wallets) return <LoadingSpinner />;
    if (!currentUser) return <RedError message="Can't load profile" />;

    return (
      <Layout className="default-top-layout" id="profile">
        <h1>Profile</h1>
        <LogoBox />
        <div className="box">
          <h2>account: {currentUser.account}</h2>
          <h2>Keys</h2>
          <ul>
            <li>owner public key: {currentUser.ownerPublicKey}</li>
            <li>active public key: {currentUser.activePublicKey}</li>
          </ul>
          <div className="wallets">
            <h2>wallets</h2>
            <Button className="go-to-wallets-btn"><Link to="/wallets">Wallet Management</Link></Button>
            <Row
              gutter={16}
              style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            >
              {wallets.map((wallet) => {
                return (
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    xxl={12}
                    key={wallet.id}
                    className="wallet-box"
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
                    <p>{`balance: ${wallet.balance}`}</p>
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
          </div>
          <div className="btns">
            <Button
              type="primary"
              className="logout-btn"
              onClick={this.handleClickLogout}
            >
              Logout
            </Button>
          </div>


        </div>
      </Layout>
    );
  }
}
