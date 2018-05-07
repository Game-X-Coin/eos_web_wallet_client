import { observable, action, computed } from 'mobx';
import agent from '../agent';

const LIMIT = 10;

export class TransactionsStore {
    @observable isLoading = false;
    @observable page = 0;
    @observable totalPagesCount = 0;
    @observable transactions = observable([]);
    @observable predicate = {};

    $req() {
      return agent.Transactions.all(this.page, LIMIT, this.predicate);
    }

    @action loadTransactions() {
      this.isLoading = true;
      return this.$req()
        .then(action(({ transactions, transactionsCount }) => {
          this.transactions = observable(transactions);
          this.totalPagesCount = Math.ceil(transactionsCount / LIMIT);
        }))
        .finally(action(() => {
          this.isLoading = false;
        }));
    }

    @action load(id) {
      agent.Transactions.load(id)
        .then(action(({ transaction }) => {
          this.transactions = [transaction];
          console.log(transction);
          console.log(this.transactions.length);
      }));
    }

    @action
    async createTransaction() {
      this.isLoading = true;
      await agent.Transactions.createTransaction();
    }
}

export default new TransactionsStore();
