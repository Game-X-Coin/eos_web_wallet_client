import React from 'react';
import {inject, observer} from 'mobx-react';
import {Link, withRouter} from 'react-router-dom';
import { Layout } from 'antd';
import JSONPretty from 'react-json-pretty';
import { observable } from 'mobx';

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
    console.log(this.props.transactionsStore);
    const transaction = this.props.transactionsStore.transactions[0] || {};
    return (
      <Layout className="default-top-layout">
        <Content>
          <h2>Transaction</h2>
          <h3>{ transaction.transaction_id } </h3>
          <JSONPretty json={transaction} space={4} />
        </Content>
      </Layout>);
  }
}

export default Transaction;
