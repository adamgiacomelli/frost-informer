import { types, getEnv } from 'mobx-state-tree';
import { ApiStore } from './ApiStore';
import { GuiStore } from './GuiStore';

export const RootStore = types
  .model('RootStore', {
    apiStore: types.optional(ApiStore, {}),
    guiStore: types.optional(GuiStore, {})
  })
  .views(self => ({
    get fetch() {
      return getEnv(self).fetch;
    },
    get alert() {
      return getEnv(self).alert;
    }
  }))
  .actions(self => ({}));
