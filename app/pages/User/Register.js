import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Form, Icon, Input, Layout, message } from 'antd';


import LogoBox from '../../components/LogoBox';
import { showApiError } from '../../utils';

const { Content } = Layout;
const FormItem = Form.Item;

@inject('authStore')
@observer
class Register extends React.Component {
  componentWillUnmount() {
    this.props.authStore.reset();
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (err) return;
      this.props.authStore.setEmail(values.email);
      this.props.authStore.setAccount(values.account);
      this.props.authStore.setPassword(values.password);
      try {
        await this.props.authStore.register();
        this.props.history.replace('/welcome');
      } catch (errors) {
        showApiError(errors);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout className="default-top-layout">
        <Content className="">
          <Form
            onSubmit={this.handleSubmit.bind(this)}
            className="register-form"
          >
            <LogoBox />
            <FormItem>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your username!',
                  }],
              })(<Input
                prefix={<Icon
                  type="mail"
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />}
                placeholder="Email"
              />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('account', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your account name!',
                  }],
              })(<Input
                prefix={<Icon
                  type="wallet"
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />}
                placeholder="Account Name"
              />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your Password!',
                  }],
              })(<Input
                prefix={<Icon
                  type="lock"
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />}
                type="password"
                placeholder="Password"
              />)}
            </FormItem>

            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>

          </Form>
        </Content>
      </Layout>
    );
  }
}

export default Form.create()(Register);
