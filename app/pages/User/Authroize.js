import { Link } from 'react-router-dom';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button, params, Form, Icon, Input, Layout, message } from 'antd';
import LogoBox from '../../components/LogoBox';
import qs from 'query-string';
import { observable } from 'mobx';
import agent from '../../agent';
import { showApiError } from '../../utils';

const { Content } = Layout;
const { API_ROOT } = process.env;

@inject('authStore')
@observer
class Authorize extends React.Component {

  @observable transactionId = '';
  componentWillMount() {
    let params = qs.parse(window.location.search);
    this.redirectUri = params.redirect_uri;
    agent.Oauth.getTransaction(params)
      .then( res => { console.log(res); this.transactionId = res.transactionId});
  }

  onAuthorize = e => {
    agent.Oauth.authorize(this.transactionId)
      .then( () => window.location.href = this.redirectUri)
      .catch( (err) => {
        console.log(err);
        console.error(err);
        // window.location.replace(this.redirectUri);
    });
  }

  render() {
    return (
      <Layout className="default-top-layout">
        <Content className="">
          <h1>Dgame Authorize</h1>
          <LogoBox />
          <input type="text" value={this.transactionId} onChange={(e)=> this.transactionId = e.target.value }/>
          <Button type="primary" onClick={this.onAuthorize}>submit</Button>
          <Button type="primary" htmlType="submit">cancel</Button>
        </Content>
        <form method="post" action="http://localhost:3000/v1/oauth/authorize">
          <input type="hidden" value={this.transactionId} name="transaction_id" />
          <input type="submit" value='submit' />
        </form>
      </Layout>
    );
  }
}

export default Authorize;
