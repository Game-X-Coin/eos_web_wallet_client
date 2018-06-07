import React from 'react';
import { inject, observer } from 'mobx-react';
import { Alert, Button, Form, Icon, Input, Layout, message } from 'antd';


import LogoBox from '../../components/LogoBox';
import { showApiError } from '../../utils';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const FormItem = Form.Item;

@inject('authStore')
@observer
class Register extends React.Component {
  componentWillUnmount() {
    this.props.authStore.reset();
  }

  async handleSubmit(e) {
    const { authStore } = this.props;
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (err) return;
      this.props.authStore.setEmail(values.email);
      this.props.authStore.setAccount(values.account);
      this.props.authStore.setPassword(values.password);
      try {
        await this.props.authStore.register();
        if (authStore.redirectParams && authStore.redirectParams.to) {
          return this.props.history.push(authStore.redirectParams.to);
        }
        this.props.history.push('/welcome');
      } catch (errors) {
        console.error(errors);
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
            { this.props.authStore.redirectParams &&
              <Alert message="Register gxc wallet to to start gxc dgame." type="info" />
            }
            <FormItem>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your username!',
                  }],
              })(<Input
                type="email"
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
                  },
                  {
                    pattern: /^[a-z1-5]+$/,
                    message: 'AccountName Character must be in a~z,1~5.',
                  },
                  {
                    max: 13,
                    message: 'length should be less than 13',
                  },
                  {
                    min: 2,
                    message: 'length should be greater than 1',
                  },
                ],
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
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Register
              </Button>
              Or <Link to="/login">Login</Link>
            </FormItem>

          </Form>
        </Content>
      </Layout>
    );
  }
}

export default Form.create()(Register);
