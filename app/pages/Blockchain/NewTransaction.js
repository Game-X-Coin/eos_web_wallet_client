import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import { Layout, Form, Input, Icon, Button, Select, Modal } from 'antd';
import { observable } from 'mobx';
import { showApiError } from '../../utils';
import agent from '../../agent';
import ListBalance from '../Balance/ListBalance';

const { Item: FormItem } = Form;
const { Option } = Select;

const { Content } = Layout;

@inject('commonStore', 'userStore', 'walletsStore', 'balancesStore')
@withRouter
@observer
class NewTransaction extends React.Component {
  @observable showCompleteModal = false;
  @observable transactionQuantity = 0.0;
  @observable transactionId = null;

  componentWillMount() {
    this.transactionId = this.props.match.params.transactionId;
    this.props.walletsStore.loadWallets();
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (err) return;

      try {
        const { transaction: { quantity, transactionId }} = await agent.Transactions.new(values);
        this.transactionQuantity = quantity;
        this.transactionId = transactionId;
        this.showCompleteModal = true;
        this.props.form.resetFields();

      } catch (errors) {
        showApiError(errors);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { wallets } = this.props.walletsStore;
    const { data: balances } = this.props.balancesStore;
    const tokens = Object.keys(balances).map(key => key);
    return (
      <Layout className="default-top-layout">
        <Modal
          title="Request Faucet successful."
          visible={this.showCompleteModal}
          onOk={() => this.showCompleteModal = false}
          onCancel={() => this.showCompleteModal = false}
        >
          <h4>Transaction has been successfully requested.</h4>
          <h4>requested quantity: {this.transactionQuantity} <br/>transaction id: <Link to={`/tx/${this.transactionId}`}>{this.transactionId}</Link></h4>
        </Modal>
        <Content>
          <h2>New Transaction</h2>
          <Form
            onSubmit={this.handleSubmit.bind(this)}
            className="register-form"
          >
            {false &&
            <FormItem>
              {getFieldDecorator('wallet', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your username!',
                  }],
              })(
                <Select style={{ width: 120 }}>
                  { wallets.map( wallet => <Option value={wallet.id}>{wallet.walletName}</Option>)}
                </Select>
              )}
            </FormItem> }
            <FormItem>
              {getFieldDecorator('symbol', {
                rules: [
                  {
                    required: true,
                    message: 'select token symbol',
                  }],
              })(
                <Select style={{ width: 120 }}>
                  { tokens.map( token => <Option key={token} value={token}>{token}</Option>)}
                </Select>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('to', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your username!',
                  }],
              })(<Input
                prefix={<Icon
                  type="user"
                  style={{color: 'rgba(0,0,0,.25)'}}
                />}
                placeholder="To Account"
              />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('quantity', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your account name!',
                  }],
              })(<Input
                prefix={<Icon
                  type="wallet"
                  style={{color: 'rgba(0,0,0,.25)'}}
                />}
                placeholder="amount to send"
              />)}
            </FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Make transaction
            </Button>
          </Form>
          <ListBalance noHeader />
        </Content>
      </Layout>);
  }
}

export default Form.create()(NewTransaction);
