import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import passages from './passages'
import passage from './passage'
import rehearsals from './rehearsals'

const reducer = combineReducers({
  user,
  passages,
  passage,
  rehearsals
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './passages'
export * from './passage'
export * from './rehearsals'
