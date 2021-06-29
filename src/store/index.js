import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { watchAuth } from './sagas';
import rootReducer from './reducers';

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const middlewareEnhancer = applyMiddleware(sagaMiddleware);
const store = createStore(rootReducer, initialState, middlewareEnhancer);
sagaMiddleware.run(watchAuth);

export default store;
