import { types, getEnv } from 'mobx-state-tree';

export const GuiStore = types
  .model('GuiStore', {})
  .views(self => ({
    get fetch() {
      return getEnv(self).fetch;
    },
    get alert() {
      return getEnv(self).alert;
    }
  }))
  .actions(self => ({
    afterCreate() {}
  }));
