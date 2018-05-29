const getTokenImage = img => require(`../assets/images/tokens/${img}`).default;

export default {
  GXQ: {
    img: getTokenImage('gxcquest.png'),
    color: '#FFD111',
  },
  BLS: {
    img: getTokenImage('bless.png'),
    color: '#FF4B34',
  },
  SPN: {
    img: getTokenImage('superplanet.png'),
    color: '#0070BE',
  },
  ACA: {
    img: getTokenImage('arch.png'),
    color: '#33BA20',
  },
};
