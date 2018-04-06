import { createStore, combineReducers, applyMiddleware } from 'redux'
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


const middlewareArray = [thunkMiddleware]
if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger')
  middlewareArray.push(createLogger({ collapsed: true }))
}


const middleware = composeWithDevTools(applyMiddleware(...middlewareArray))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './passages'
export * from './passage'
export * from './rehearsals'
