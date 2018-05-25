// import superagentPromise from 'superagent-promise';
// import _superagent from 'superagent';
import axios from 'axios';
import commonStore from './stores/commonStore';
import authStore from './stores/authStore';

// const superagent = superagentPromise(_superagent.agent(), global.Promise);
// const { API_ROOT } = process.env;
//
//
// // const encode = encodeURIComponent;
//
// const handleErrors = (err) => {
//   if (err && err.response && err.response.status === 401) {
//     authStore.logout();
//   }
//   return err;
// };
//
// const responseBody = res => res.body;
//
// const tokenPlugin = (req) => {
//   if (commonStore.token) {
//     req.set('authorization', `Bearer ${commonStore.token}`);
//   }
// };
//
// const requests = {
//   del: url =>
//     superagent.del(`${API_ROOT}${url}`)
//       .withCredentials()
//       .use(tokenPlugin)
//       .end(handleErrors)
//       .then(responseBody),
//   get: (url, params) =>
//     superagent.get(`${API_ROOT}${url}`)
//       .withCredentials()
//       .query(params)
//       .use(tokenPlugin)
//       .end(handleErrors)
//       .then(responseBody),
//   put: (url, body) =>
//     superagent.put(`${API_ROOT}${url}`, body)
//       .withCredentials()
//       .use(tokenPlugin)
//       .end(handleErrors)
//       .then(responseBody),
//   post: (url, body) =>
//     superagent.post(`${API_ROOT}${url}`, body)
//       .withCredentials()
//       .use(tokenPlugin)
//       .end(handleErrors)
//       .then(responseBody),
// };

const { API_ROOT } = process.env;
const instance = axios.create({
  baseURL: API_ROOT,
  responseType: 'json',
  withCredentials: true,
});

const createHeaders = () => {
  if (!commonStore.token) return {};
  return {authorization: `Bearer ${commonStore.token}`};
}

const requests = {
  del: url =>
    instance.delete(url, {
      headers: createHeaders(),
    }),
  get: (url, params) =>
    instance.get(url, {
      params,
      headers: createHeaders(),
    }).then( res => res.data),
  put: (url, body) =>
    instance.put(url, body, {
      headers: createHeaders(),
    }).then( res => res.data),
  post: (url, body) =>
    instance.post(url, body, {
      headers: createHeaders(),
    }).then( res => res.data),

}

const Auth = {
  current: () =>
    requests.get('/users/profile'),
  login: (email, password) =>
    requests.post('/auth/login', { email, password }),
  register: params =>
    requests.post('/auth/register', params),
  save: user =>
    requests.put('/user', { user }),
};

const Oauth = {
  getTransaction: params =>
    requests.get('/oauth/transaction', params),
  authorize: (transactionId) =>
    requests.post('/oauth/authorize', {transaction_id: transactionId}),
}

// const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
// const omitSlug = article => Object.assign({}, article, {slug: undefined})

const Profile = {
  get: username =>
    requests.get(`/profiles/${username}`),
};
const Wallets = {
  all: () =>
    requests.get('/wallets'),
  createWallet: walletName =>
    requests.post('/wallets', { walletName }),
};

const EOS = {
  requestFaucet: () =>
    requests.post('/eos/request_faucet'),
}

const Transactions = {
  load: (id) =>
    requests.get(`/eos/transaction/${id}`),
  new: (params) =>
    requests.post('/eos/transaction', params),
}
export default {
  Auth,
  Profile,
  Wallets,
  EOS,
  Oauth,
  Transactions,
};
