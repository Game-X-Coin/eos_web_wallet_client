import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Layout } from 'antd';
import LogoBox from '../components/LogoBox';

// const particleVars = {
//   particles: {
//     number: {
//       value: 88,
//       density: {
//         enable: true,
//         value_area: 700,
//       },
//     },
//     color: {
//       value: ['#aa73ff', '#f8c210', '#83d238', '#33b1f8'],
//     },
//     shape: {
//       type: 'circle',
//       stroke: {
//         width: 0,
//         color: '#000000',
//       },
//       polygon: {
//         nb_sides: 15,
//       },
//     },
//     opacity: {
//       value: 0.5,
//       random: false,
//       anim: {
//         enable: false,
//         speed: 1.5,
//         opacity_min: 0.15,
//         sync: false,
//       },
//     },
//     size: {
//       value: 2.5,
//       random: false,
//       anim: {
//         enable: true,
//         speed: 2,
//         size_min: 0.15,
//         sync: false,
//       },
//     },
//     line_linked: {
//       enable: true,
//       distance: 110,
//       color: '#33b1f8',
//       opacity: 0.25,
//       width: 1,
//     },
//     move: {
//       enable: true,
//       speed: 1.6,
//       direction: 'none',
//       random: false,
//       straight: false,
//       out_mode: 'out',
//       bounce: false,
//       attract: {
//         enable: false,
//         rotateX: 600,
//         rotateY: 1200,
//       },
//     },
//   },
//   interactivity: {
//     detect_on: 'canvas',
//     events: {
//       onhover: {
//         enable: false,
//         mode: 'repulse',
//       },
//       onclick: {
//         enable: false,
//         mode: 'push',
//       },
//       resize: true,
//     },
//     modes: {
//       grab: {
//         distance: 400,
//         line_linked: {
//           opacity: 1,
//         },
//       },
//       bubble: {
//         distance: 400,
//         size: 40,
//         duration: 2,
//         opacity: 8,
//         speed: 3,
//       },
//       repulse: {
//         distance: 200,
//         duration: 0.4,
//       },
//       push: {
//         particles_nb: 4,
//       },
//       remove: {
//         particles_nb: 2,
//       },
//     },
//   },
//   retina_detect: true,
// };

const { Content } = Layout;

@inject('authStore', 'userStore')
@withRouter
@observer
class Welcome extends React.Component {
  render() {
    const { userStore, authStore } = this.props;
    const { keys, ownerWalletPassword, activeWalletPassword } = authStore.values;
    console.log(authStore.values);
    console.log(authStore.values.ownerWalletPassword);
    const { currentUser } = userStore;
    return (
      <Layout className="default-top-layout" id="welcome">
        <h1 style={{ textAlign: 'center' }}> My EOS Wallet </h1>
        <LogoBox />
        <Content className="links">
          <h2>Welcome!
            <Link to="/@currentUser.account">
              {currentUser.account}
            </Link>
          </h2>
          <h2>Wallets</h2>
          <ul className="keys">
            <li>active wallet password: {activeWalletPassword}</li>
            <li>owner wallet password: {ownerWalletPassword}</li>
          </ul>
          <h2>Keys</h2>
          <ul className="keys">
            <li>owner public key: {keys.owner.public}</li>
            <li>* owner private key: {keys.owner.private}</li>
            <li>active public key: {keys.active.public}</li>
            <li>* active private key: {keys.active.private}</li>
          </ul>
          <h2>Your account has been generated! Your passwords are not saved in
            server and only shown just once.<br />
            Write down passwords in secure place for future use.
          </h2>
          <Button><Link to="profile">goto profile</Link></Button>
        </Content>
      </Layout>
    );
  }
}

export default Welcome;
