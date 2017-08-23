import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { Provider } from 'mobx-react';
import { RootStore } from './stores/RootStore';

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss';

// Containers
import Full from './containers/Full/';

const history = createBrowserHistory();

const fetcher = url => window.fetch(url).then(response => response.json());
const rootStore = RootStore.create(
  {},
  {
    fetch: fetcher,
    alert: m => console.log(m)
  }
);

const App = () =>
  <Provider store={rootStore}>
    <HashRouter history={history}>
      <Switch>
        <Route path="/" name="Home" component={Full} />
      </Switch>
    </HashRouter>
  </Provider>;

export default App;
