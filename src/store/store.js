import {createStore,applyMiddleware} from 'redux';
import reducer from './reducer.js';
import promiseMiddleware from 'redux-promise-middleware';


 let createStoreWithMiddleware = applyMiddleware(
     promiseMiddleware()
     )(createStore);
     
 let store =createStoreWithMiddleware(reducer);
export default store
