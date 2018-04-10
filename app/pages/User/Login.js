import { Link } from 'react-router-dom';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Checkbox, Form, Icon, Input, Layout, message } from 'antd';
import LogoBox from '../../components/LogoBox';

const { Content } = Layout;
const FormItem = Form.Item;

@inject('authStore')
@observer
class Login extends React.Component {
  componentWillUnmount() {
    this.props.authStore.reset();
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (err) return;
      this.props.authStore.setEmail(values.email);
      this.props.authStore.setPassword(values.password);
      try {
        await this.props.authStore.login();
        this.props.history.replace('/balance');
      } catch (errors) {
        const messages = errors.map(x => x.messages.join(' ')).join('\n');
        message.error(messages);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout className="default-top-layout">
        <Content className="">
          <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
            <h1>Login on EOS Wallet</h1>
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
                  type="user"
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />}
                placeholder="Email"
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
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">Forgot password</a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <Link to="/register">Register</Link>
            </FormItem>

          </Form>
        </Content>
      </Layout>
    );
  }
}

export default Form.create()(Login);
