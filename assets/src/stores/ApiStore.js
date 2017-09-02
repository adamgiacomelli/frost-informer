import { types, getEnv } from 'mobx-state-tree';
import { ApiTemperaturesStore } from './ApiTemperaturesStore';

export const ApiStore = types
  .model('ApiStore', {
    apiTemperaturesStore: types.optional(ApiTemperaturesStore, {
      temperatures: []
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
      self.apiTemperaturesStore.loadTemperatures();
    }
  }));
