const getTokenImage = (imgName) => {
  const img = require(`../assets/images/tokens/${imgName}`);
  return img.constructor === Object ? img.default : img;
};

export default {
  GXQ: {
    img: getTokenImage('gxq.png'),
    color: '#FFD111',
    gameUrl: 'http://gxcquest.com',
  },
  BLS: {
    // img: getTokenImage('bls.png'),
    color: '#FF4B34',
  },
  SPN: {
    // img: getTokenImage('spn.png'),
    color: '#0070BE',
  },
  ACA: {
    // img: getTokenImage('aca.png'),
    color: '#33BA20',
  },
};
