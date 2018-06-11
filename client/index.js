import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import App from './app'
import Root from './Root'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById('app')
)
