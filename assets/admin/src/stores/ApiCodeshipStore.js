import { types, getParent, process } from 'mobx-state-tree';
import { getCodeshipState } from '../api/Codeship';

export const CodeshipBuild = types.model('CodeshipBuild', {
  id: types.number,
  branch: types.string,
  commit_id: types.string,
  status: types.string,
  finished_at: types.string,
  github_username: types.string,
  started_at: types.string,
  uuid: types.string,
  message: types.string
});

export const ApiCodeshipStore = types
  .model('ApiCodeshipStore', {
    codeshipBuilds: types.array(CodeshipBuild)
  })
  .views(self => ({
    get store() {
      return getParent(self);
    },
    get allCodeshipState() {
      return self.codeshipState;
    }
  }))
  .actions(self => ({
    loadCodeshipState: process(function* loadCodeshipState() {
      self.state = 'pending';
      self.response = {};
      try {
        self.response = yield getCodeshipState();
        self.updateCodeshipState(self.response);
        self.state = 'done';
      } catch (err) {
        console.error('Failed to fetch codeship state', err);
        self.state = 'error';
      }
    }),
    markLoading(loading) {
      self.isLoading = loading;
    },
    updateCodeshipState({ builds }) {
      builds.forEach(build => {
        self.codeshipBuilds.push(build);
      });
    }
  }));
