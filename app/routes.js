import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root_saga';
import reducers from './root_reducer';
import About from './about/About';
import Auth from './auth/auth';
import history from './history';

//import Loadable from 'components/Loadable';
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);


//If the user is not logged in and try to go back to private page redirect to login
function isUserLoggedIn(nextState,replace){
  const state = store.getState();
  const appState = state.app;
  const userData = appState.auth && appState.auth.userData;

  if (!userData) {
    replace({ nextPathname: nextState.location.pathname }, '/');
  }
}

const routes = (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={Auth} />
        <Route exact path='/about' component={About} />      
      </Switch>
    </Router>
);

export default routes;
