import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './rootReducer'

console.log('DEBUG process.env.NODE_ENV', process.env.NODE_ENV)

const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
let middlewares = [thunkMiddleware]

if (process.env.NODE_ENV !== 'production') {
  middlewares = [(require('redux-immutable-state-invariant').default()), ...middlewares]
}

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)))

export default store
