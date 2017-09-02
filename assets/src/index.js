import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { Provider } from 'mobx-react'
import { RootStore } from './stores/RootStore'

// Containers
import Full from './containers/Full/'

const history = createBrowserHistory()

const fetcher = url => window.fetch(url).then(response => response.json())
const rootStore = RootStore.create(
  {},
  {
    fetch: fetcher,
    alert: m => console.log(m)
  }
)

ReactDOM.render(
  <Provider store={rootStore}>
    <HashRouter history={history}>
      <Switch>
        <Route path='/' name='Home' component={Full} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)
