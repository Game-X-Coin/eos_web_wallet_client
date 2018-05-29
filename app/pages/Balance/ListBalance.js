import React, { Component } from 'react';
import { List, Card, Layout } from 'antd';
import { inject, observer } from 'mobx-react';

import { tokens } from '../../constants';

@inject('balancesStore')
@inject('userStore')
@observer
class ListBalance extends Component {
  componentWillMount() {
    console.log(this.props.balancesStore);
    console.log(this.props.userStore.currentUser);
    this.props.balancesStore.loadBalances(this.props.userStore.currentUser.account);
  }

  render() {
    const { currentUser } = this.props.userStore;
    const { data } = this.props.balancesStore;

    const tokenData = Object.keys(data).map(key => ({
      name: key,
      balance: data[key],
      ...tokens[key],
    }));

    console.log(tokenData);

    return (
      <Layout className="default-top-layout">
        <Layout.Content className="list-balance-page">
          { !this.props.noHeader &&
            <div className="header">
              <h1 className="title">My GXC</h1>
              <p className="total-balance">
                <span className="highlight">{currentUser.balance}</span>GXC
              </p>
            </div>
          }

          <p className="description">Retention Tokens by Game</p>

          <div className="balances">
            {tokenData.map(token => (
              <div
                className="balance"
                key={token.name}
                style={{
                  borderBottom: `5px solid ${token.color}`,
                }}
              >
                <h3>{token.balance} {token.name}</h3>
                { token.img ?

                  <a href={token.gameUrl} target="_blank"><img src={token.img} alt={token.name} /></a>
                  : <h4>Coming Soon!</h4>
                }

              </div>
            ))}
          </div>
        </Layout.Content>
      </Layout>
    );
  }
}

export default ListBalance;
