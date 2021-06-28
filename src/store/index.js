import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import saga from './sagas';
import rootReducer from './reducers';

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const middlewareEnhancer = applyMiddleware(
  sagaMiddleware,
  initialState,
  middlewareEnhancer
);

const store = createStore(rootReducer);

export default store;
