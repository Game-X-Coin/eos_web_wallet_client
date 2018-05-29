import React, { Component } from 'react';
import { List, Card, Layout } from 'antd';
import { inject, observer } from 'mobx-react';

import { tokens } from '../../constants';

@inject('userStore')
@observer
class ListBalance extends Component {
  render() {
    const { currentUser } = this.props.userStore;

    const data = {
      GXQ: '10.120',
      BLS: '0.000',
      SPN: '0.000',
      ACA: '0.000',
    };

    const tokenData = Object.keys(data).map(key => ({
      name: key,
      balance: data[key],
      ...tokens[key],
    }));

    return (
      <Layout className="default-top-layout">
        <Layout.Content className="list-balance-page">
          <div className="header">
            <h1 className="title">My GXC</h1>
            <p className="total-balance">
              <span className="highlight">{currentUser.balance}</span>GXC
            </p>
          </div>

          <p className="description">Retention Tokens by Game</p>

          <div className="balances">
            {tokenData.map(token => (
              <div
                className="balance"
                style={{
                  borderBottom: `4px solid ${token.color}`,
                }}
              >
                <h3>{token.balance} {token.name}</h3>
                <img src={token.img} alt={token.name} />
              </div>
            ))}
          </div>
        </Layout.Content>
      </Layout>
    );
  }
}

export default ListBalance;
