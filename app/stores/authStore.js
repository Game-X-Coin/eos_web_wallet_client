import { action, observable } from 'mobx';
import agent from '../agent';
import userStore from './userStore';
import commonStore from './commonStore';

class AuthStore {
  @observable inProgress = false;
  @observable errors = undefined;

  @observable values = {
    account: '',
    email: '',
    password: '',
    keys: {
      owner: { private: null, public: null },
      active: { private: null, public: null },
    },

  };

  @action setAccount(account) {
    this.values.account = account;
  }

  @action setEmail(email) {
    this.values.email = email;
  }

  @action setPassword(password) {
    this.values.password = password;
  }

  @action setKeys(keys) {
    this.values.keys = keys;
  }

  @action reset() {
    this.values.account = '';
    this.values.email = '';
    this.values.password = '';
  }

  @action login() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Auth.login(this.values.email, this.values.password)
      .then(({ token }) => commonStore.setToken(token.accessToken))
      .then(() => userStore.pullUser())
      .catch(action((err) => {
        this.errors = err.response && err.response.body &&
          err.response.body.errors;
        throw (err.response.body);
      }))
      .finally(action(() => {
        this.inProgress = false;
      }));
  }

  @action logout() {
    commonStore.setToken(undefined);
    userStore.forgetUser();
    return Promise.resolve();
  }

  @action register() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Auth.register({ account: this.values.account, email: this.values.email, password: this.values.password }).then(({ token, keys }) => {
      commonStore.setToken(token.accessToken);
      this.setKeys(keys);
    }).then(() => userStore.pullUser()).catch(action((err) => {
      this.errors = err.response && err.response.body &&
        err.response.body.errors;
      throw (err.response.body);
    }))
      .finally(action(() => {
        this.inProgress = false;
      }));
  }
}

export default new AuthStore();
