import { types, getEnv } from 'mobx-state-tree';
import { ApiCodeshipStore } from './ApiCodeshipStore';

export const ApiStore = types
  .model('ApiStore', {
    apiCodeshipStore: types.optional(ApiCodeshipStore, {
      codeshipBuilds: []
    })
  })
  .views(self => ({
    get fetch() {
      return getEnv(self).fetch;
    },
    get alert() {
      return getEnv(self).alert;
    }
  }))
  .actions(self => ({
    afterCreate() {
      self.apiCodeshipStore.loadCodeshipState();
    }
  }));
