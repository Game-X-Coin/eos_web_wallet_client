import React from 'react';
import {inject, observer} from 'mobx-react';
import {Link, withRouter} from 'react-router-dom';
import {Form, Layout, Divider} from 'antd';
import LogoBox from '../../components/LogoBox';

const {Content} = Layout;
const FormItem = Form.Item;

@inject('userStore', 'commonStore')
@withRouter
@observer
class Home extends React.Component {
  componentDidMount() {
    // if(this.props.userStore.currentUser) {
    //     this.props.history.replace('/wallet/list');
    // }
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {currentUser} = this.props.userStore;
    return <Layout className="default-top-layout" id="home">
      <h1 style={{textAlign: 'center'}}> My EOS Wallet </h1>
      <LogoBox/>
      {currentUser ?
        <Content className="links">
          <h2>Welcome<br/><Link to={"/@currentUser.account"}>{currentUser.account}</Link></h2>
          <Link to={"/wallets"}>goto Wallet Management</Link>
        </Content>
        :
        <Content className="links">
          <Link to="/register">Register</Link>
          <Divider type="vertical" className="divider"/>
          <Link to="/login">Login</Link>
        </Content>
      }

      <Content className="how-it-works">
        <h2>How it Works</h2>
        <img src={"/eos-diagram.png"}/>
      </Content>
    </Layout>;
  }
}

export default Form.create()(Home);
