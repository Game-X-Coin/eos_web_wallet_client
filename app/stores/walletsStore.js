import { observable, action, computed } from 'mobx';
import agent from '../agent';

const LIMIT = 10;

export class WalletsStore {
    @observable isLoading = false;
    @observable page = 0;
    @observable totalPagesCount = 0;
    @observable wallets = observable([]);
    @observable predicate = {};

    $req() {
      // if (this.predicate.myFeed) return agent.Articles.feed(this.page, LIMIT);
      // if (this.predicate.favoritedBy) return agent.Articles.favoritedBy(this.predicate.favoritedBy, this.page, LIMIT);
      // if (this.predicate.tag) return agent.Articles.byTag(this.predicate.tag, this.page, LIMIT);
      // if (this.predicate.author) return agent.Articles.byAuthor(this.predicate.author, this.page, LIMIT);
      return agent.Wallets.all(this.page, LIMIT, this.predicate);
    }

    @action loadWallets() {
      this.isLoading = true;
      return this.$req()
        .then(action(({ wallets, walletsCount }) => {
          this.wallets = wallets;
          this.totalPagesCount = Math.ceil(walletsCount / LIMIT);
        }))
        .finally(action(() => {
          this.isLoading = false;
        }));
    }

    @action
    async createWallet() {
      this.isLoading = true;
      await agent.Wallets.createWallet();
    }
}

export default new WalletsStore();
