import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { watchAuth } from './sagas';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);
const store = createStore(
  rootReducer,

  composedEnhancers
);
sagaMiddleware.run(watchAuth);

export default store;
