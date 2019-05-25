import * as React from "react";
import * as ReactDOM from "react-dom";
import {combineReducers, Dispatch, Reducer, Store, createStore, applyMiddleware} from 'redux';
import { reducer} from './store'
import { Provider } from "react-redux";
import MainComponent from './main-component'

declare var window: any;
import { loginToEMail} from './actions'
window.loginToEMail = loginToEMail

const store = createStore(reducer);

const root = document.getElementById('app');


ReactDOM.render(
  <Provider store={store}>
      <MainComponent />
    </Provider>,
  root
);