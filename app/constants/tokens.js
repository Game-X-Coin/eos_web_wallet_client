const getTokenImage = img => require(`../assets/images/tokens/${img}`);

export default {
  GXQ: {
    img: getTokenImage('gxq.png'),
    color: '#FFD111',
  },
  BLS: {
    img: getTokenImage('bls.png').default,
    color: '#FF4B34',
  },
  SPN: {
    img: getTokenImage('spn.png'),
    color: '#0070BE',
  },
  ACA: {
    img: getTokenImage('aca.png').default,
    color: '#33BA20',
  },
};
