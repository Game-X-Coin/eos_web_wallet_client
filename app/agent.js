import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import commonStore from './stores/commonStore';
import authStore from './stores/authStore';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:3001/v1';

const encode = encodeURIComponent;

const handleErrors = err => {
  if (err && err.response && err.response.status === 401) {
    authStore.logout();
  }
  return err;
};

const responseBody = res => res.body;

const tokenPlugin = req => {
  if (commonStore.token) {
    req.set('authorization', `Bearer ${commonStore.token}`);
  }
};

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).
      use(tokenPlugin).
      end(handleErrors).
      then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).
      use(tokenPlugin).
      end(handleErrors).
      then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).
      use(tokenPlugin).
      end(handleErrors).
      then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).
      use(tokenPlugin).
      end(handleErrors).
      then(responseBody),
};

const Auth = {
  current: () =>
    requests.get('/users/profile'),
  login: (email, password) =>
    requests.post('/auth/login', {email, password}),
  register: (params) =>
    requests.post('/auth/register', params),
  save: user =>
    requests.put('/user', {user}),
};

// const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
// const omitSlug = article => Object.assign({}, article, {slug: undefined})

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`),
};
const Wallets = {
  all: e =>
    requests.get(`/wallets`),
  createWallet: walletName =>
    requests.post(`/wallets`, {walletName}),
};
export default {
  Auth,
  Profile,
  Wallets,
};
