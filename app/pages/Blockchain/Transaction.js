import React from 'react';
import {inject, observer} from 'mobx-react';
import {Link, withRouter} from 'react-router-dom';
import { Layout } from 'antd';
import { observable } from 'mobx';
import ReactJson from 'react-json-view';

const { Content } = Layout;

@inject('commonStore', 'transactionsStore')
@withRouter
@observer
class Transaction extends React.Component {
  @observable transactionId = null;
  componentDidMount() {
    this.transactionId = this.props.match.params.transactionId;
    this.props.transactionsStore.load(this.transactionId);
  }

  render() {
    const transaction = this.props.transactionsStore.transactions[0];
    return (
      <Layout className="default-top-layout">
        <Content>
          <h2>Transaction</h2>
          <h3>{ this.transactionId } </h3>
          {transaction ?
            <ReactJson src={transaction} style={{wordBreak: 'break-all'}}/>
            :
            <h3>Transaction is not exists. Please try again</h3>
          }
        </Content>
      </Layout>);
  }
}

export default Transaction;
