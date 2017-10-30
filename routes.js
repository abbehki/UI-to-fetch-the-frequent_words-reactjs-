import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import RootSaga from './root_saga';
import reducers from './root_reducer';
import Auth from 'app/auth/auth';
import About from 'app/about/About';

//import Loadable from 'components/Loadable';
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';


const routes = (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path='/' component={Auth} />
        <Route exact path='/about' component={About} />      
      </Switch>
    </BrowserRouter>
);

export default routes;
