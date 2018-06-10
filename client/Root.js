import React from 'react'

import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from './history'
import store from './store'


/* Abstracted provider and router out to this
component so testing can be given access to
the store and history
*/
export default ({ children }) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        {children}
      </Router>
    </Provider>)
}
